import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rank, Gamemode, Role, Agent } from './enums';
import { agentUUIDs, rankLargeIconLinks, gameModeUUIDs, roleDisplayIcons } from './agentUUIDs';

import './UserAccountPage.css'; // Import your CSS file

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/players/search/${userId}`);
        if (response.ok) {
          const playerData: Player = await response.json();
          setCurrPlayer(playerData);
        } else {
          setError('Failed to fetch player data');
        }
      } catch (error) {
        setError('Error fetching player data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [userId]);

  return (
    <div className="user-account-container">
      <h2>{currPlayer?.playerIdentifier}</h2>
      {loading ? (
        <p>Loading player data...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : currPlayer ? (
        <div>
          <ul>
            {/* <li className="profile-info">
              <strong>Player Identifier:</strong> {currPlayer.playerIdentifier}
            </li> */}
            <li className="profile-info">
              <strong>Rank:</strong> {currPlayer.rank}
            </li>
            <li className="profile-info">
              <strong>Preferred Gamemode:</strong> {currPlayer.gamemode}
            </li>
            <li className="profile-info">
              <strong>Role:</strong> {currPlayer.role}
            </li>
            <li className="profile-info">
              <strong>Favorite Agent:</strong> {currPlayer.agent}
            </li>
          </ul>
          <div className="image-box">
            <img
              src={`https://media.valorant-api.com/agents/${agentUUIDs[currPlayer.agent]}/displayicon.png`}
              alt={currPlayer.agent}
              className="profile-image"
            />
            <img
              src={rankLargeIconLinks[currPlayer.rank]}
              alt={currPlayer.agent}
              className="profile-image"
            />
            <img
              src={roleDisplayIcons[currPlayer.role]}
              alt={currPlayer.role}
              className="profile-image"
            />
            <img
              src={`https://media.valorant-api.com/gamemodes/${gameModeUUIDs[currPlayer.gamemode]}/displayicon.png`}
              className="profile-image"
              alt={currPlayer.gamemode}
            />
          </div>
        </div>
      ) : (
        <p>No player data available.</p>
      )}
    </div>
  );
};

export default UserAccountPage;
