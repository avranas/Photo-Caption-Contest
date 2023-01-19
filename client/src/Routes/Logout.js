import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Logout = (props) => {
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get("/server-logout");
      } catch (err) {
        console.log(err);
      }
    };
    logout();
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
