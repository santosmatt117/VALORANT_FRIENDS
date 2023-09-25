import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import './App.css';
import CreateProfilePage from './CreateProfilePage';
import SearchPlayersPage from './SearchPlayersPage';
import UserAccountPage from './UserAccountPage';
import LoginPage from './LoginPage'; // Import the LoginPage component

type Page = 'Login' | 'CreateProfile' | 'SearchPlayers' | 'UserAccount';

interface AppState {
  page: Page;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      page: 'Login', // Set the initial page to 'Login'
    };
  }

  navigateToPage = (page: Page) => {
    this.setState({ page });
  };

  renderPage = () => {
    const { page } = this.state;

    if (page === 'CreateProfile') {
      return <CreateProfilePage />;
    // } else if (page === 'SearchPlayers') {
    //   return <SearchPlayersPage />;
    } else if (page === 'Login') {
      return <LoginPage />; // Render the LoginPage component
    } else if (page === 'UserAccount') {
      return <UserAccountPage />;
    }

    return null;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>VALSync</h1>
            <h3> FIND YOUR NEW POCKET SAGE  </h3>
            <div className="options">
              {/* Use Link to navigate */}
              <Link to="/">Login</Link>
              <Link to="/CreateProfile">Create Profile</Link>
              {/* <Link to="/SearchPlayers">Search for Players</Link> */}
            </div>
          </header>
          <div className="page-content">
            <Routes>
              <Route
                path="/"
                element={this.renderPage()}
              />
              <Route path="/CreateProfile" element={<CreateProfilePage />} />
              <Route path="/SearchPlayers" element={<SearchPlayersPage />} />
              <Route path="/user-account/:userId" element={<UserAccountPage />} />
              <Route path="/Login" element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;