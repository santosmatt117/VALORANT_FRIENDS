import React, { Component, ChangeEvent, FormEvent } from 'react';
import './CreateProfilePage.css';
import { Agent, Rank, Role, Gamemode } from './enums';

interface CreateProfilePageState {
  playerIdentifier: string;
  password: string;
  agent: Agent;
  role: Role;
  gamemode: Gamemode;
  rank: Rank;
}

class CreateProfilePage extends Component<{}, CreateProfilePageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      playerIdentifier: '',
      password: '',
      agent: Agent.ASTRA,
      role: Role.DUELIST,
      gamemode: Gamemode.COMPETITIVE,
      rank: Rank.RADIANT,
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as unknown as Pick<CreateProfilePageState, keyof CreateProfilePageState>);
  };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { playerIdentifier, password, agent, role, gamemode, rank } = this.state;

    // new player object for POSt 
    const newPlayer = {
      playerIdentifier,
      password,
      agent,
      role,
      gamemode,
      rank,
    };

    try {  // Send POST to backend
      const response = await fetch('http://localhost:8080/api/v1/players/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlayer),  // convert object to JSON
      });

      if (response.ok) {
        console.log('Profile created !! WOO', newPlayer);
        //reset fields
        this.setState({
          playerIdentifier: '',
          password: '',
          agent: Agent.ASTRA,
          role: Role.DUELIST,
          gamemode: Gamemode.COMPETITIVE,
          rank: Rank.RADIANT,
        });
        //this.props.navigateToPage(UserAccount);
      } else {
        console.error('Failed to create profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { playerIdentifier, password, agent, role, gamemode, rank } = this.state;
  
    return (
      <div className="create-profile-container">
        <h2>Create Profile</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              playerIdentifier:
              <input type="text" name="playerIdentifier" value={playerIdentifier} onChange={this.handleInputChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={password} onChange={this.handleInputChange} />
            </label>
            <label>
              Agent:
              <select name="agent" value={agent} onChange={this.handleInputChange}>
                {Object.values(Agent).map(agentOption => (
                  <option key={agentOption} value={agentOption}>
                    {agentOption}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Role:
              <select name="role" value={role} onChange={this.handleInputChange}>
                {Object.values(Role).map(roleOption => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Gamemode:
              <select name="gamemode" value={gamemode} onChange={this.handleInputChange}>
                {Object.values(Gamemode).map(gamemodeOption => (
                  <option key={gamemodeOption} value={gamemodeOption}>
                    {gamemodeOption}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Rank:
              <select name="rank" value={rank} onChange={this.handleInputChange}>
                {Object.values(Rank).map(rankOption => (
                  <option key={rankOption} value={rankOption}>
                    {rankOption}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Create Profile</button>
          </form>
      </div>
    );
  }
  
}

export default CreateProfilePage;
