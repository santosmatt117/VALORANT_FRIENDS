package com.valorant.valorantProject.controllers;

import java.lang.Iterable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
// import java.util.Objects;
// import java.util.Arrays;

import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.enums.Agent;
import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.PlayerRank;
import com.valorant.valorantProject.enums.Role;
import com.valorant.valorantProject.repositories.PlayerRepository;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/v1/players")  // fix later :))
public class PlayerController {
    private PlayerRepository playerRepository;

    @Autowired
    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    @PostMapping("/login")
    public ResponseEntity<Player> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
    
        Optional<Player> foundPlayer = this.playerRepository.findByPlayerIdentifier(username);
        if (foundPlayer.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);  // Username not found, status 404
        } 
        Player player = foundPlayer.get();
        if (!player.getPassword().equals(password)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);  // Password mismatch, status 401
        }
        return new ResponseEntity<>(player, HttpStatus.OK);  // Successful login, status 200
    }
    

    // make separate function for findByPlayerIdentifier


    @GetMapping("/")
    public Iterable<Player> getAllPlayers() {
        return this.playerRepository.findAll();
    }

    // search methods // tested :) //
    @GetMapping("/search/{id}")
    public Optional<Player> getPlayerById(@PathVariable("id") Integer id) {
        return this.playerRepository.findById(id);
    }
    
    @GetMapping("/search")
    public List<Player> searchPlayers(@RequestParam(name="agent", required=false) Agent agent,
                                      @RequestParam(name="rank", required=false) PlayerRank playerRank,
                                      @RequestParam(name="gamemode", required=false) Gamemode gamemode, 
                                      @RequestParam(name="role", required=false) Role role) {
        if (agent != null) {
            if (playerRank != null) {
                if (gamemode != null) {
                    if (role != null) {
                        return this.playerRepository.findByAgentAndPlayerRankAndGamemodeAndRole(agent, playerRank, gamemode, role);
                    } else {
                        return this.playerRepository.findByAgentAndPlayerRankAndGamemode(agent, playerRank, gamemode);
                    }
                } else if (role != null) {
                    return this.playerRepository.findByAgentAndPlayerRankAndRole(agent, playerRank, role);
                } else {
                    return this.playerRepository.findByAgentAndPlayerRank(agent, playerRank);
                }
            } else if (gamemode != null) {
                if (role != null) {
                    return this.playerRepository.findByAgentAndGamemodeAndRole(agent, gamemode, role);
                } else {
                    return this.playerRepository.findByAgentAndGamemode(agent, gamemode);
                }
            } else if (role != null) {
                return this.playerRepository.findByAgentAndRole(agent, role);
            } else {
                return this.playerRepository.findByAgent(agent);
            }
        } else if (playerRank != null) {
            if (gamemode != null) {
                if (role != null) {
                    return this.playerRepository.findByPlayerRankAndGamemodeAndRole(playerRank, gamemode, role);
                } else {
                    return this.playerRepository.findByPlayerRankAndGamemode(playerRank, gamemode);
                }
            } else if (role != null) {
                return this.playerRepository.findByPlayerRankAndRole(playerRank, role);
            } else {
                return this.playerRepository.findByPlayerRank(playerRank);
            }
        } else if (gamemode != null) {
            if (role != null) {
                return this.playerRepository.findByGamemodeAndRole(gamemode, role);
            } else {
                return this.playerRepository.findByGamemode(gamemode);
            }
        } else if (role != null) {
            return this.playerRepository.findByRole(role);
        } else {
            return new ArrayList<>();
        }
    }


    // POST - create new player profile
    @PostMapping("/add")  // changed end point , it was same as search so idk
    public Player addPlayer(@RequestBody Player newPlayer) {
        return this.playerRepository.save(newPlayer);
    }


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
    public Player updateRank(@PathVariable("id") Integer id, @RequestParam("rank") PlayerRank newRank) {
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


    // Update any attribute // not tested // 
    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable("id") Integer id, @RequestBody Player p) {
        Optional<Player> playerToUpdateOptional = this.playerRepository.findById(id);
        if(!playerToUpdateOptional.isPresent()) {
            return null;
        }

        Player playerToUpdate = playerToUpdateOptional.get();

        if (p.getAgent() != null) {
            playerToUpdate.setAgent(p.getAgent());
        }

        if(p.getGamemode() != null) {
            playerToUpdate.setGamemode(p.getGamemode());
        }

        if(p.getId() != null) {
            playerToUpdate.setId(p.getId());
        }

        if(p.getPlayerIdentifier() != null) {
            playerToUpdate.setPlayerIdentifier(p.getPlayerIdentifier());
        }

        if(p.getRank() != null) {
            playerToUpdate.setRank(p.getRank());
        }

        if(p.getRole() != null) {
            playerToUpdate.setRole(p.getRole());
        }

        Player updatedPlayer = this.playerRepository.save(playerToUpdate);
        return updatedPlayer;
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() { 
            return this.username; 
        }

        public String getPassword() { 
            return this.password; 
        }

    }

}