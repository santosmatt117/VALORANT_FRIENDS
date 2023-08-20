package com.valorant.valorantProject;

import com.valorant.valorantProject.controllers.PlayerController;
import com.valorant.valorantProject.entities.Player;
import com.valorant.valorantProject.repositories.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ValorantProjectApplicationTests {

    @Autowired
    private PlayerController playerController;

    @MockBean
    private PlayerRepository playerRepository;

    @BeforeEach
    public void setup() {
        Player player1 = new Player(); // Set player properties
        Player player2 = new Player(); // Set player properties
        List<Player> players = Arrays.asList(player1, player2);

        when(playerRepository.findAll()).thenReturn(players);
    }

    @Test
    void contextLoads() {
        // This test ensures the Spring context loads without errors
    }

	@Test
	void testGetAllPlayers() {
    	Iterable<Player> players = playerController.getAllPlayers();
    	long count = StreamSupport.stream(players.spliterator(), false).count();
    	assertEquals(2, count);
	}

}

