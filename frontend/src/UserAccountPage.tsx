import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserAccountPage: React.FC = () => {
  const { userId } = useParams();
  const [userAccount, setUserAccount] = useState(null);

  useEffect(() => {
    // Fetch user account information based on userId
    // Replace this with your actual API call to fetch user data
    const fetchUserAccount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUserAccount(userData);
        } else {
          console.error('Failed to fetch user account data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserAccount();
  }, [userId]);

  return (
    <div className="user-account-container">
      <h2>User Account</h2>
      {userAccount ? (
        <div>
          <p>User ID: {userId}</p>
          {/* Display user account information here */}
          {/* You can access userAccount properties like userAccount.name, userAccount.email, etc. */}
        </div>
      ) : (
        <p>Loading user account data...</p>
      )}
    </div>
  );
};

export default UserAccountPage;
