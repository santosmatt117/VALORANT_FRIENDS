import React, { Component, ChangeEvent } from 'react';
import './SearchPlayersPage.css'; // Import your SearchPlayersPage specific styles
import { Agent, Rank, Role, Gamemode } from './enums';

interface SearchPlayersPageState {
  rankFilter: Rank | '';
  roleFilter: Role | '';
  agentFilter: Agent | '';
  gamemodeFilter: Gamemode | '';
}

const ranks = Object.values(Rank);
const roles = Object.values(Role);
const agents = Object.values(Agent);
const gamemodes = Object.values(Gamemode);

class SearchPlayersPage extends Component<{}, SearchPlayersPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      rankFilter: '',
      roleFilter: '',
      agentFilter: '',
      gamemodeFilter: '',
    };
  }

  handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const field = name as keyof SearchPlayersPageState; // Convert name to a keyof SearchPlayersPageState
    const newState = {
      ...this.state,
      [field]: value
    };
    this.setState(newState);
  };
  
  render() {
    const { rankFilter, roleFilter, agentFilter, gamemodeFilter } = this.state;

    return (
      <div className="search-players-container">
        <h2>Search Players</h2>
        <div className="filters">
          <label>
            Rank:
            <select name="rankFilter" value={rankFilter} onChange={this.handleFilterChange}>
              <option value="">All Ranks</option>
              {ranks.map(rankOption => (
                <option key={rankOption} value={rankOption}>{rankOption}</option>
              ))}
            </select>
          </label>
          <label>
            Role:
            <select name="roleFilter" value={roleFilter} onChange={this.handleFilterChange}>
              <option value="">All Roles</option>
              {roles.map(roleOption => (
                <option key={roleOption} value={roleOption}>{roleOption}</option>
              ))}
            </select>
          </label>
          <label>
            Agent:
            <select name="agentFilter" value={agentFilter} onChange={this.handleFilterChange}>
              <option value="">All Agents</option>
              {agents.map(agentOption => (
                <option key={agentOption} value={agentOption}>{agentOption}</option>
              ))}
            </select>
          </label>
          <label>
            Gamemode:
            <select name="gamemodeFilter" value={gamemodeFilter} onChange={this.handleFilterChange}>
              <option value="">All Gamemodes</option>
              {gamemodes.map(gamemodeOption => (
                <option key={gamemodeOption} value={gamemodeOption}>{gamemodeOption}</option>
              ))}
            </select>
          </label>
        </div>
        {/* Render search results here */}
      </div>
    );
  }
}

export default SearchPlayersPage;
