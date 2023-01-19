import { Link } from "react-router-dom";

const HomePage = (props) => {
  return (
    <main id="home-page">
      <p>Welcome to Photo Caption Contest</p>
      <div>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default HomePage;
