import { Link } from "react-router-dom";

const HomePage = (props) => {
  return (
    <div>
      <p>Welcome to Photo Caption Contest</p>
      <div>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
