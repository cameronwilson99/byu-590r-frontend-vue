<template>
    <div>
      <h1>Games</h1>
      <v-divider></v-divider>
      <v-container>
        <v-row v-if="isLoadingGames">
          <v-col>
            <p>Loading...</p>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col v-for="game in games" :key="game.id" cols="12" sm="6" md="4">
            <v-card class="game-card" @click="showGameDetails(game)">
              <v-img :src="game.image" alt="Game Image" height="200px"></v-img>
              <v-card-text>
                <h2>{{ game.name }}</h2>
                <p>{{ game.description }}</p>
                <p>Publisher ID: {{ game.publisher_id }}</p>
                <p>Price: ${{ game.price }}</p>
                <p>Stock: {{ game.stock }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Game Details Modal -->
      <v-dialog v-model="showModal" max-width="600px">
        <v-card v-if="selectedGame">
          <v-card-title>
            <span class="headline">{{ selectedGame.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img :src="selectedGame.image" alt="Game Image" height="300px"></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <p>{{ selectedGame.description }}</p>
                  <p>Publisher ID: {{ selectedGame.publisher_id }}</p>
                  <p>Price: ${{ selectedGame.price }}</p>
                  <p>Stock: {{ selectedGame.stock }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addToCart(selectedGame)">Add to Cart</v-btn>
            <v-btn text @click="closeModal">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script src="./GamesView.ts"/>
<style src="./GamesView.scss"/>
```