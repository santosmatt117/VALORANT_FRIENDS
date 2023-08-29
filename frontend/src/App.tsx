import React, { Component } from 'react';
import './App.css';
import CreateProfilePage from './CreateProfilePage'; // Import your CreateProfilePage component
import SearchPlayersPage from './SearchPlayersPage'; // Import your SearchPlayersPage component

type Page = 'Login' | 'CreateProfile' | 'SearchPlayers';

interface AppState {
  page: Page;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      page: 'Login', // Set the initial page
    };
  }

  navigateToPage = (page: Page) => {
    this.setState({ page });
  };

  renderPage = () => {
    const { page } = this.state;

    if (page === 'CreateProfile') {
      return <CreateProfilePage />;
    } else if (page === 'SearchPlayers') {
      return <SearchPlayersPage />;
    } else if (page === 'Login') {
      return (
        <div className="login-container">
          <h2>Login</h2>
          <form>
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
          <p>Don't have an account? <span onClick={() => this.navigateToPage('CreateProfile')}>Create Account</span></p>
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Valorant Friend Finder</h1>
          <div className="options">
            <button onClick={() => this.navigateToPage('Login')}>Login</button>
            <button onClick={() => this.navigateToPage('CreateProfile')}>Create Profile</button>
            <button onClick={() => this.navigateToPage('SearchPlayers')}>Search for Players</button>
          </div>
        </header>
        <div className="page-content">{this.renderPage()}</div>
      </div>
    );
  }
}

export default App;
