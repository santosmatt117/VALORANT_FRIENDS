package com.valorant.valorantProject.repositories;

import java.util.List;

import com.valorant.valorantProject.enums.Rank;
import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.Role;
import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.enums.Agent;

import org.springframework.data.repository.CrudRepository;


public interface PlayerRepository extends CrudRepository<Player, Integer> {
    List<Player> findByPlayerIdentifier(String playerIdentifier);
    List<Player> findByAgent(Agent agent);
    List<Player> findByRank(Rank rank);
    List<Player> findByGamemode(Gamemode gamemode);
    List<Player> findByRole(Role role);

    List<Player> findByAgentAndRank(Agent agent, Rank rank);
    List<Player> findByAgentAndGamemode(Agent agent, Gamemode gamemode);
    List<Player> findByAgentAndRole(Agent agent, Role role);
    List<Player> findByRankAndGamemode(Rank rank, Gamemode gamemode);
    List<Player> findByRankAndRole(Rank rank, Role role);
    List<Player> findByGamemodeAndRole(Gamemode gamemode, Role role);
    List<Player> findByAgentAndRankAndGamemode(Agent agent, Rank rank, Gamemode gamemode);
    List<Player> findByAgentAndRankAndRole(Agent agent, Rank rank, Role role);
    List<Player> findByAgentAndGamemodeAndRole(Agent agent, Gamemode gamemode, Role role);
    List<Player> findByRankAndGamemodeAndRole(Rank rank, Gamemode gamemode, Role role);
    List<Player> findByAgentAndRankAndGamemodeAndRole(Agent agent, Rank rank, Gamemode gamemode, Role role);
}