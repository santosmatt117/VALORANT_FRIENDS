import React, { Component, ChangeEvent, FormEvent } from 'react';
import './CreateProfilePage.css'; // Import your CreateProfilePage specific styles

interface CreateProfilePageState {
  username: string;
  password: string;
  agent: string;
  role: string;
  gamemode: string;
  rank: string;
}

class CreateProfilePage extends Component<{}, CreateProfilePageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      username: '',
      password: '',
      agent: '',
      role: '',
      gamemode: '',
      rank: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<CreateProfilePageState, keyof CreateProfilePageState>);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { username, password, agent, role, gamemode, rank } = this.state;
    // Here you can submit the form data to your backend or perform any other necessary actions
    console.log('Form submitted:', { username, password, agent, role, gamemode, rank });
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
            <input type="text" name="agent" value={agent} onChange={this.handleInputChange} />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={role} onChange={this.handleInputChange} />
          </label>
          <label>
            Gamemode:
            <input type="text" name="gamemode" value={gamemode} onChange={this.handleInputChange} />
          </label>
          <label>
            Rank:
            <input type="text" name="rank" value={rank} onChange={this.handleInputChange} />
          </label>
          <button type="submit">Create Profile</button>
        </form>
      </div>
    );
  }
}

export default CreateProfilePage;
