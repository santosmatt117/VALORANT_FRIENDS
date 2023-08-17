package com.valorant.valorantProject.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.valorant.valorantProject.enums.Gamemode;
import com.valorant.valorantProject.enums.Rank;
import com.valorant.valorantProject.enums.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name="PLAYER")
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name="PLAYER_IDENTIFIER", unique=true)
    private String playerIdentifier;

    @Enumerated(EnumType.STRING)
    @Column(name="RANK")
    private Rank rank;

    @Enumerated(EnumType.STRING)
    @Column(name="GAMEMODE")
    private Gamemode gameMode;

    @Enumerated(EnumType.STRING)
    @Column(name="ROLE")
    private Role role;

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

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public Gamemode getGameMode() {
        return gameMode;
    }

    public void setGameMode(Gamemode gameMode) {
        this.gameMode = gameMode;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}

