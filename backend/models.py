from sympy import true
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key = True, unique = True, default = get_uuid)
    email = db.Column(db.String(345), unique = True)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.Text, nullable=False)
    grade = db.Column(db.Text, nullable=False)
    school = db.Column(db.Text, nullable=False)
    team_members = db.Column(db.Text, nullable=True)
    case_submission = db.Column(db.LargeBinary, nullable=True)