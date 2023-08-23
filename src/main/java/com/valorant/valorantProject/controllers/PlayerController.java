package com.valorant.valorantProject.controllers;

import java.lang.Iterable;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Objects;
// import java.util.Arrays;
// import java.util.Optional;
// import java.util.List;
import java.util.Optional;

import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.Rank;
import com.valorant.valorantProject.enums.Role;
import com.valorant.valorantProject.repositories.PlayerRepository;

// import com.valorant.valorantProject.enums.Agent;
// import com.valorant.valorantProject.enums.Gamemode;
// import com.valorant.valorantProject.enums.Rank;
// import com.valorant.valorantProject.enums.Role;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

// import org.springframework.http.HttpStatus;
// import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/players")  // fix later :))
public class PlayerController {
    private PlayerRepository playerRepository;

    @Autowired
    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    // controller methods:

    /*
     GET METHODS
     Search by: 
        - no filter (all players)
        - agents
        - gamemode
        - rank 
        - role 
    */

    @GetMapping("/")
    public Iterable<Player> getAllPlayers() {
        return this.playerRepository.findAll();
    }

    // @GetMapping("/byAgent/{agent}")
    // public List<Player> getPlayerByAgent(@PathVariable Agent agent) {

    // }

    // @GetMapping("/byGamemode/{gamemode}")
    // public List<Player> getPlayerByGameMode(@PathVariable Gamemode gamemode) {

    // }

    // @GetMapping("/byRank/{rank}")
    // public List<Player> getPlayerByRank(@PathVariable Rank rank) {

    // }

    // @GetMapping("/byRole/{role}")
    // public List<Player> getPlayerByRole(@PathVariable Role role) {

    // }


    // POST - create new player profile
    @PostMapping("/")
    public Player addPlayer(@RequestBody Player newPlayer) {
        return this.playerRepository.save(newPlayer);
    }


    // // PUT - update existing player
    // @PutMapping()
    // public Player updatePlayer(@RequestBody Player updatedPlayer) {
    //     return updatedPlayer;
    // }

    // DELETE - delete player profile
    @DeleteMapping("/{id}")
    public Player deletePlayer(@PathVariable("id") Integer id) {  // should this be by ID?
        Optional<Player> playerToDeleteOptional = this.playerRepository.findById(id);
        if (!playerToDeleteOptional.isPresent()) {
            return null;
        }
        Player playerToDelete = playerToDeleteOptional.get();
        this.playerRepository.delete(playerToDelete);
        return playerToDelete;

    }

    @PutMapping("/{id}/changerank")
    public Player updateRank(@PathVariable("id") Integer id, @RequestParam("rank") Rank newRank) {
        Optional<Player> playerToUpdateOptional = this.playerRepository.findById(id);
        if (!playerToUpdateOptional.isPresent()) {
            return null;
        }
        Player playerToUpdate = playerToUpdateOptional.get();
        playerToUpdate.setRank(newRank);
        this.playerRepository.save(playerToUpdate);
        return playerToUpdate;
    }

    @PutMapping("/{id}/changeIdentifier")
    public Player updateIdentifier(@PathVariable("id") Integer id, @RequestParam("identifier") String newIdentifier) {
        Optional<Player> playerToUpdateOptional = this.playerRepository.findById(id);
        if (!playerToUpdateOptional.isPresent()) {
            return null;
        }
        Player playerToUpdate = playerToUpdateOptional.get();
        playerToUpdate.setPlayerIdentifier(newIdentifier);
        this.playerRepository.save(playerToUpdate);
        return playerToUpdate;
    }

    @PutMapping("/{id}/changeGamemode")
    public Player updateGamemode(@PathVariable("id") Integer id, @RequestParam("gamemode") Gamemode newGamemode) {
        Optional<Player> playerToUpdateOptional = this.playerRepository.findById(id);
        if (!playerToUpdateOptional.isPresent()) {
            return null;
        }
        Player playerToUpdate = playerToUpdateOptional.get();
        playerToUpdate.setGamemode(newGamemode);
        this.playerRepository.save(playerToUpdate);
        return playerToUpdate;
    }

    @PutMapping("/{id}/changeRole")
    public Player updateRole(@PathVariable("id") Integer id, @RequestParam("role") Role newRole) {
        Optional<Player> playerToUpdateOptional = this.playerRepository.findById(id);
        if (!playerToUpdateOptional.isPresent()) {
            return null;
        }
        Player playerToUpdate = playerToUpdateOptional.get();
        playerToUpdate.setRole(newRole);
        this.playerRepository.save(playerToUpdate);
        return playerToUpdate;
    }


}
