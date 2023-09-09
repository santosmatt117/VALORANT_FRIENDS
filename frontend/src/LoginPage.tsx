import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Your login logic
    const userId = 'TEMP';
    navigate('/user-account/${userId}');
  };

  const navigateToCreateProfile = () => {
    // Use the navigate function to go to the CreateProfilePage
    navigate('/CreateProfile');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={navigateToCreateProfile}>Create Account</span>
      </p>
    </div>
  );
};

export default LoginPage;
