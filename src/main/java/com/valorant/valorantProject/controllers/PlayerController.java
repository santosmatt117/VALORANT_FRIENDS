package com.valorant.valorantProject.controllers;

import java.lang.Iterable;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Objects;
// import java.util.Arrays;
// import java.util.Optional;
// import java.util.List;

import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.repositories.PlayerRepository;

// import com.valorant.valorantProject.enums.Agent;
// import com.valorant.valorantProject.enums.Gamemode;
// import com.valorant.valorantProject.enums.Rank;
// import com.valorant.valorantProject.enums.Role;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.GetMapping; 
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.DeleteMapping;

// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestBody;

// import org.springframework.http.HttpStatus;
// import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/players")  // fix later :))
public class PlayerController {
    private PlayerRepository playerRepo;

    public PlayerController(PlayerRepository playerRepo) {
        this.playerRepo = playerRepo;
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

    @GetMapping()
    public Iterable<Player> getAllPlayers() {
        return this.playerRepo.findAll();
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


    // // POST - create new player profile
    // @PostMapping()
    // public Player addPlayer(@RequestBody Player newPlayer) {
    //     return newPlayer;
    // }


    // // PUT - update existing player
    // @PutMapping()
    // public Player updatePlayer(@RequestBody Player updatedPlayer) {
    //     return updatedPlayer;
    // }

    // // DELETE - delete player profile
    // @DeleteMapping()
    // public void deletePlayer(@RequestBody Player player) {  // should this be by ID?

    // }

}
