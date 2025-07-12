import axios from "axios";

export default axios.create({
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});
