// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const UserAccountPage: React.FC = () => {
//   const { userId } = useParams();
//   const [userAccount, setUserAccount] = useState(null);

//   useEffect(() => {
//     // Fetch user account information based on userId
//     // Replace this with your actual API call to fetch user data
//     const fetchUserAccount = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/v1/users/${userId}`);
//         if (response.ok) {
//           const userData = await response.json();
//           setUserAccount(userData);
//         } else {
//           console.error('Failed to fetch user account data');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchUserAccount();
//   }, [userId]);

//   return (
//     <div className="user-account-container">
//       <h2>User Account</h2>
//       {userAccount ? (
//         <div>
//           <p>Username: {userAccount.playerIdentifier}</p>

//           {/* Display user account information here */}
//           {/* You can access userAccount properties like userAccount.name, userAccount.email, etc. */}
//         </div>
//       ) : (
//         <p>Loading user account data...</p>
//       )}
//     </div>
//   );
// };

// export default UserAccountPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rank, Gamemode, Role, Agent } from './enums';  // Adjust the path accordingly

interface Player {
  id: number;
  playerIdentifier: string;
  rank: Rank;
  gamemode: Gamemode;
  role: Role;
  agent: Agent;
}

const UserAccountPage: React.FC = () => {
  const { userId } = useParams();
  const [currPlayer, setCurrPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${userId}`);
        if (response.ok) {
          const playerData: Player = await response.json();
          setCurrPlayer(playerData);
        } else {
          console.error('Failed to fetch player data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPlayerData();
  }, [userId]);

  return (
    <div className="user-account-container">
      <h2>Player Profile</h2>
      {currPlayer ? (
        <div>
          <p>Player Identifier: {currPlayer.playerIdentifier}</p>
          <p>Rank: {currPlayer.rank}</p>
          <p>Preferred Gamemode: {currPlayer.gamemode}</p>
          <p>Role: {currPlayer.role}</p>
          <p>Favorite Agent: {currPlayer.agent}</p>
          {/* Render other currPlayer properties as needed */}
        </div>
      ) : (
        <p>Loading player data...</p>
      )}
    </div>
  );
};

export default UserAccountPage;

