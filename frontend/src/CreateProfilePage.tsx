import React, { useState, ChangeEvent, FormEvent } from 'react';
import './CreateProfilePage.css'; // Import the existing CSS file
import { Agent, PlayerRank, Role, Gamemode } from './enums';
import { useNavigate } from 'react-router-dom';

function CreateProfilePage() {
  const [state, setState] = useState({
    playerIdentifier: '',
    password: '',
    agent: Agent.ASTRA,
    role: Role.DUELIST,
    gamemode: Gamemode.COMPETITIVE,
    rank: PlayerRank.RADIANT,
  });

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { playerIdentifier, password, agent, role, gamemode, rank } = state;

    // new player object for POST
    const newPlayer = {
      playerIdentifier,
      password,
      agent,
      role,
      gamemode,
      rank,
    };

    try {
      // Send POST to backend
      const response = await fetch('http://localhost:8080/api/v1/players/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer), // convert object to JSON
      });

      if (response.ok) {
        console.log('Profile created !! WOO', newPlayer);
        alert("Profile created!");
        // reset fields
        setState({
          playerIdentifier: '',
          password: '',
          agent: Agent.ASTRA,
          role: Role.DUELIST,
          gamemode: Gamemode.COMPETITIVE,
          rank: PlayerRank.RADIANT,
        });
        // go to user page
        const userId = response.text; // Replace with actual location of userID
        navigate('/login');
      } else {
        alert("whoops! Name already exists! :3");
        console.error('Failed to create profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-profile-container">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          playerIdentifier:
          <input
            type="text"
            name="playerIdentifier"
            value={state.playerIdentifier}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </label>
        <div className="select-container">
          <label className="select-label">Agent:</label>
          <div className="custom-select">
            <select
              name="agent"
              value={state.agent}
              onChange={handleInputChange}
            >
              {Object.values(Agent).map((agentOption) => (
                <option key={agentOption} value={agentOption}>
                  {agentOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="select-container">
          <label className="select-label">Role:</label>
          <div className="custom-select">
            <select name="role" value={state.role} onChange={handleInputChange}>
              {Object.values(Role).map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="select-container">
          <label className="select-label">Gamemode:</label>
          <div className="custom-select">
            <select
              name="gamemode"
              value={state.gamemode}
              onChange={handleInputChange}
            >
              {Object.values(Gamemode).map((gamemodeOption) => (
                <option key={gamemodeOption} value={gamemodeOption}>
                  {gamemodeOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="select-container">
          <label className="select-label">Rank:</label>
          <div className="custom-select">
            <select name="rank" value={state.rank} onChange={handleInputChange}>
              {Object.values(PlayerRank).map((rankOption) => (
                <option key={rankOption} value={rankOption}>
                  {rankOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default CreateProfilePage;