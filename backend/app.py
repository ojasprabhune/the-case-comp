from types import MethodDescriptorType
from flask import Flask, request, abort, jsonify, session, send_file
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from config import ApplicationConfig
from models import db, User
import io

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True, origins=[
    "http://localhost:3000",
    "http://thecasecomp.com"
])

server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "User unauthorized."}), 401

    user = User.query.filter_by(id = user_id).first()
    
    if user is None:
        return jsonify({"error": "User not found."}), 404

    return jsonify({
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone_number": user.phone_number,
        "grade": user.grade,
        "school": user.school,
        "team_members": user.team_members
    })
    
@app.route("/registration", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    phone_number = request.json["phone"]
    grade = request.json["grade"]
    school = request.json["school"]

    user_exists = User.query.filter_by(email = email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists."}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email = email, password = hashed_password, first_name = first_name, last_name = last_name, phone_number = phone_number, grade = grade, school = school, team_members = "", case_submission = 0)
    db.session.add(new_user)
    
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "phone_number": new_user.phone_number,
        "grade": new_user.grade,
        "school": new_user.school
    })

@app.route("/remove-user", methods=["POST"])
def remove_user():
    user_id = request.json["user_id"]

    if not user_id:
        return jsonify({"error": "User ID not found."}), 404

    user = User.query.filter_by(id=user_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User removed successfully."}), 200

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify({"error": "User unauthorized."}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "User unauthorized."}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/team", methods=["POST"])
def update_profile():
    team_members = request.json["team_members"]

    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.team_members = team_members
    db.session.commit()

    return jsonify({
        "team_members": user.team_members
    })

@app.route("/case-submission", methods=["POST", "GET"])
def case_submission():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "POST":
        if "case" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        case = request.files["case"]
        user.case_submission = case.read()  # store as BLOB
        db.session.commit()
        return jsonify({"message": "File uploaded successfully."}), 200

    # GET: return the file if it exists
    if user.case_submission:
        return send_file(
            io.BytesIO(user.case_submission),
            mimetype="application/pdf",
            as_attachment=False,
            download_name="case_submission.pdf"
        )
    else:
        return jsonify({"error": "No submission found."}), 404

if __name__ == "__main__":
    app.run(debug = True)