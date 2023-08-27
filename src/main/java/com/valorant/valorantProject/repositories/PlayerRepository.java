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
}
