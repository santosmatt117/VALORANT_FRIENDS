import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
  
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/players/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (response.ok) {
        const user = await response.json();
        navigate(`/user-account/${user.id}`);
      } else if (response.status === 401) {
        alert("SIKE, THAT'S THE WRONG PASSWORD");
      } else if (response.status === 404) {
        alert("Username doesn't exist. Please try again.");
      } else {
        alert("erm... something went wrong, please try again.");
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  };
  

  ////// LOGIN FETCH THING

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
          <input type="text" name="username"/>
        </label>
        <label>
          Password:
          <input type="password" name="password"/>
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
