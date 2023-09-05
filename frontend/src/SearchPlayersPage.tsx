import React, { Component, ChangeEvent } from "react";
import './SearchPlayersPage.css';
import { Agent, Rank, Role, Gamemode } from './enums';

type Page = "Filters" | "Results";

interface SearchPlayersPageState {
  filters: {
    rankFilter: Rank | '';
    roleFilter: Role | '';
    agentFilter: Agent | '';
    gamemodeFilter: Gamemode | '';
  };
  searchResults: any[];
  page: Page;
}

// const ranks = Object.values(Rank);
// const roles = Object.values(Role);
// const agents = Object.values(Agent);
// const gamemodes = Object.values(Gamemode);

export class SearchPlayersPage extends Component<{}, SearchPlayersPageState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      filters: {
        rankFilter: '',
        roleFilter: '',
        agentFilter: '',
        gamemodeFilter: '',
      },
      searchResults: [],
      page: "Filters"
    };
  }

  handleFilterChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;

    let validatedValue: string | Agent | Role | Rank | Gamemode = value;
  
    if (name === "agentFilter") {
      if (Object.values(Agent).includes(value as Agent)) {
        validatedValue = value as Agent;
      }
    }
    if (name === "roleFilter") {
      if (Object.values(Role).includes(value as Role)) {
        validatedValue = value as Role;
      }
    }
    if (name === "rankFilter") {
      if (Object.values(Rank).includes(value as Rank)) {
        validatedValue = value as Rank;
      }
    }
    if (name === "gamemodeFilter") {
      if (Object.values(Gamemode).includes(value as Gamemode)) {
        validatedValue = value as Gamemode;
      }
    }
    if (value === "") {
      validatedValue = '';
    }
    const filters = { ...this.state.filters, [name]: validatedValue };
    this.setState({ filters });
  };

  handleSearch = (): void => {
    const { rankFilter, roleFilter, agentFilter, gamemodeFilter } = this.state.filters;
  
    const queryParams = new URLSearchParams();
    
    if (agentFilter) queryParams.append('agent', agentFilter);
    if (rankFilter) queryParams.append('rank', rankFilter);
    if (gamemodeFilter) queryParams.append('gamemode', gamemodeFilter);
    if (roleFilter) queryParams.append('role', roleFilter);
    if (queryParams.toString() === '') {
      alert('Please select at least one filter.');
      return;
    }
    this.setState({ page: 'Results' });
    const fullUrl = `http://localhost:8080/api/v1/players/search?${queryParams.toString()}`;
    console.log('Fetching from URL:', fullUrl); // log the URL to verify
  
    fetch(fullUrl, { method: 'GET' }) // Removed the headers field
    .then(response => {
      console.log('Received response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received data:', data);
      this.setState({ searchResults: data });
    })
    .catch(error => {
      console.log('Fetch error:', error);
    });
  }

  handleBack = () => {
    this.setState({
      page: 'Filters',
      filters: {
        rankFilter: '',
        roleFilter: '',
        agentFilter: '',
        gamemodeFilter: ''
      }
    });
  }

  render = (): JSX.Element => {
    const { rankFilter, roleFilter, agentFilter, gamemodeFilter } = this.state.filters;
    const { searchResults , page} = this.state;
    if (page === 'Filters') {
      return (
        <div className="search-players-container">
          <h1>Search Players</h1>
          <div className="filters">
          
            {/* Agent Filter */}
            <div className="filter-container">
              <label htmlFor="agent">Agent:</label>
              <select id="agent" name="agentFilter" onChange={this.handleFilterChange}>
                <option value="">All</option> {/*Default value */}
                {['ASTRA', 'BREACH', 'BRIMSTONE', 'CHAMBER', 'CYPHER', 'DEADLOCK', 'FADE', 'GEKKO', 'HARBOR', 'JETT', 'KAYO', 'KILLJOY', 'NEON', 'OMEN', 'PHOENIX', 'RAZE', 'REYNA', 'SAGE', 'SKYE', 'SOVA', 'VIPER', 'YORU'].map(agent => 
                  <option key={agent} value={agent}>{agent}</option>
                )}
              </select>
            </div>
      
            {/* Gamemode Filter */}
            <div className="filter-container">
              <label htmlFor="gamemode">Gamemode:</label>
              <select id="gamemode" name="gamemodeFilter" onChange={this.handleFilterChange}>
                <option value ="">All</option>
                {['UNRATED', 'SPIKERUSH', 'DEATHMATCH', 'COMPETITIVE', 'CUSTOM', 'ESCALATION', 'TEAMDEATHMATCH'].map(mode => 
                  <option key={mode} value={mode}>{mode}</option>
                )}
              </select>
            </div>
      
            {/* Rank Filter */}
            <div className="filter-container">
              <label htmlFor="rank">Rank:</label>
              <select id="rank" name="rankFilter" onChange={this.handleFilterChange}>
                <option value="">All</option>
                {['IRON1', 'IRON2', 'IRON3', 'BRONZE1', 'BRONZE2', 'BRONZE3', 'SILVER1', 'SILVER2', 'SILVER3', 'GOLD1', 'GOLD2', 'GOLD3', 'PLATINUM1', 'PLATINUM2', 'PLATINUM3', 'DIAMOND1', 'DIAMOND2', 'DIAMOND3', 'ASCENDANT1', 'ASCENDANT2', 'ASCENDANT3', 'IMMORTAL1', 'IMMORTAL2', 'IMMORTAL3', 'RADIANT'].map(rank => 
                  <option key={rank} value={rank}>{rank}</option>
                )}
              </select>
            </div>
      
            {/* Role Filter */}
            <div className="filter-container">
              <label htmlFor="role">Role:</label>
              <select id="role" name="roleFilter" onChange={this.handleFilterChange}>
                <option value="">All</option>
                {['INITIATOR', 'CONTROLLER', 'DUELIST', 'SENTINEL'].map(role => 
                  <option key={role} value={role}>{role}</option>
                )}
              </select>
            </div>
      
            {/* Button to perform the search */}
            <button onClick={this.handleSearch}>Search</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="search-players-container">
        <h2>Search Results</h2>
        <ul>
          {searchResults.length > 0 ? searchResults.map((result, index) => 
            <li key={index}>
              {/* Render your Player object */}
              Player Identifier: {result.playerIdentifier},
              Rank: {result.rank},
              Gamemode: {result.gamemode},
              Role: {result.role},
              Agent: {result.agent}
            </li>
          ) : <li>No results found</li>}
        </ul>
        {/* Back button to return to Search! */}
        <button onClick={this.handleBack}>Back to Search</button>
      </div>
      );
    }
  };
}

export default SearchPlayersPage;