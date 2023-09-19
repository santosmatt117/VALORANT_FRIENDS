package com.valorant.valorantProject.repositories;

import java.util.List;
import java.util.Optional;

import com.valorant.valorantProject.enums.PlayerRank;
import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.Role;
import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.enums.Agent;

import org.springframework.data.repository.CrudRepository;


public interface PlayerRepository extends CrudRepository<Player, Integer> {
    Optional<Player> findByPlayerIdentifier(String playerIdentifier);
    List<Player> findByAgent(Agent agent);
    List<Player> findByPlayerRank(PlayerRank rank);
    List<Player> findByGamemode(Gamemode gamemode);
    List<Player> findByRole(Role role);

    List<Player> findByAgentAndPlayerRank(Agent agent, PlayerRank rank);
    List<Player> findByAgentAndGamemode(Agent agent, Gamemode gamemode);
    List<Player> findByAgentAndRole(Agent agent, Role role);
    List<Player> findByPlayerRankAndGamemode(PlayerRank rank, Gamemode gamemode);
    List<Player> findByPlayerRankAndRole(PlayerRank playerRank, Role role);
    List<Player> findByGamemodeAndRole(Gamemode gamemode, Role role);
    List<Player> findByAgentAndPlayerRankAndGamemode(Agent agent, PlayerRank playerRank, Gamemode gamemode);
    List<Player> findByAgentAndPlayerRankAndRole(Agent agent, PlayerRank rank, Role role);
    List<Player> findByAgentAndGamemodeAndRole(Agent agent, Gamemode gamemode, Role role);
    List<Player> findByPlayerRankAndGamemodeAndRole(PlayerRank rank, Gamemode gamemode, Role role);
    List<Player> findByAgentAndPlayerRankAndGamemodeAndRole(Agent agent, PlayerRank rank, Gamemode gamemode, Role role);
}