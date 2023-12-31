import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerRank, Gamemode, Role, Agent } from './enums';
import { agentUUIDs, rankLargeIconLinks, gameModeUUIDs, roleDisplayIcons } from './agentUUIDs';
import SearchPlayersPage from './SearchPlayersPage';

import './UserAccountPage.css'; // Import your CSS file
import { Link } from 'react-router-dom';

interface Player {
  id: number;
  playerIdentifier: string;
  rank: PlayerRank;
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
      <h2>{currPlayer?.playerIdentifier}</h2> <button>Edit Profile</button>
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
              <strong>Favorite Agent:</strong> {currPlayer.agent}
            </li>
            <li className="profile-info">
              <strong>Rank:</strong> {currPlayer.rank}
            </li>
            <li className="profile-info">
              <strong>Role:</strong> {currPlayer.role}
            </li>
            <li className="profile-info">
              <strong>Preferred Gamemode:</strong> {currPlayer.gamemode}
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
              alt={currPlayer.rank}
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
          <div className="button-container">
            <div className="want-people-text">
              <h3>Want new people to play with?</h3>
            </div>
            <button className="search-players-button" onClick={() => window.location.href = '/SearchPlayers'}>
              Search for players now!
            </button>
          </div>
        </div>
      ) : (
        <p>No player data available.</p>
      )}
    </div>
  );
};

export default UserAccountPage;

