package com.valorant.valorantProject.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.PlayerRank;
import com.valorant.valorantProject.enums.Role;
import com.valorant.valorantProject.enums.Agent;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "PLAYER")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "PLAYER_IDENTIFIER", unique = true)
    private String playerIdentifier;

    @Column(name = "PASSWORD") // Add the password column
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "PLAYER_RANK")
    private PlayerRank playerRank;

    @Enumerated(EnumType.STRING)
    @Column(name = "GAMEMODE")
    private Gamemode gamemode;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "AGENT")
    private Agent agent;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlayerIdentifier() {
        return playerIdentifier;
    }

    public void setPlayerIdentifier(String playerIdentifier) {
        this.playerIdentifier = playerIdentifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public PlayerRank getRank() {
        return playerRank;
    }

    public void setRank(PlayerRank newRank) {
        this.playerRank = newRank;
    }

    public Gamemode getGamemode() {
        return gamemode;
    }

    public void setGamemode(Gamemode gamemode) {
        this.gamemode = gamemode;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Agent getAgent() {
        return this.agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }
}