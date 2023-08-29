import React, { Component, ChangeEvent, FormEvent } from 'react';
import './CreateProfilePage.css';
import { Agent, Rank, Role, Gamemode } from './enums';

interface CreateProfilePageState {
  username: string;
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
      username: '',
      password: '',
      agent: Agent.ASTRA,
      role: Role.DUELIST,
      gamemode: Gamemode.COMPETITIVE,
      rank: Rank.RADIANT,
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<CreateProfilePageState, keyof CreateProfilePageState>);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { username, password, agent, role, gamemode, rank } = this.state;
    console.log('Form submitted:', { username, password, agent, role, gamemode, rank });
    // Here you can submit the form data to your backend or perform any other necessary actions
  };

  render() {
    const { username, password, agent, role, gamemode, rank } = this.state;

    return (
      <div className="create-profile-container">
        <h2>Create Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={this.handleInputChange} />
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
