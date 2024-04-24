<template>
    <div>
      <h1>Games</h1>
      <v-divider></v-divider>
      <br>
      <v-btn color="#17BEBB" style="color: white;" @click="openCreateDialog">Add a New Game</v-btn>

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
                <template v-if="game.publisher">
                  <p>Publisher: {{ game.publisher.name }}</p>
                </template>
                <template v-if="game.categories && game.categories.length > 0">
                  <p v-for="category in game.categories" :key="category">
                    <v-chip>{{ category.name }}</v-chip>
                  </p>
                </template>
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
                  
                  <p>Publisher: {{ selectedGame.publisher.name }}</p>
                  <p v-for="category in selectedGame.categories" :key="category">
                    <v-chip>{{ category.name }}</v-chip>
                  </p>
                  <p>Price: ${{ selectedGame.price }}</p>
                  <p>Stock: {{ selectedGame.stock }}</p>
                  <br>
                  <p style="font-weight: bold;">Reviews</p>
                  <p v-for="review in selectedGame.reviews" :key="review">
                    <v-divider></v-divider>
                    <p>{{ review.comment }}</p>
                    <p>Rating: {{ review.rating }}</p>
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" @click="addToCart(selectedGame)">Add to Cart</v-btn>
            <v-btn color="info" @click="openEditDialog(selectedGame)">Update</v-btn>
            <v-btn color="red" @click="openDeleteDialog(selectedGame)">Delete</v-btn>
            <v-btn text @click="closeModal">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="createGameDialog" width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add a New Game</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createGame">
              <v-alert v-if=hasErrors type="warning" dismissible>
                Please make sure all fields are filled out correctly. Each field is required.
              </v-alert>
              <br>
              <v-text-field v-model="newGame.name" label="Name" required></v-text-field>
              <v-text-field v-model="newGame.description" label="Description" required></v-text-field>
              <v-select v-model="newGame.publisher_id" :items="publishers" item-title="name" item-value="id" label="Publisher" required></v-select>
              <v-text-field v-model="newGame.price" label="Price" required type="number"></v-text-field>
              <v-text-field v-model="newGame.stock" label="Stock" required type="number"></v-text-field>
              <v-select v-model="newGame.categories" :items="categories" item-title="name" item-value="id" multiple chips label="Categories" required></v-select>
              <v-file-input accept="image/*" @change="onNewGameFileChange($event)" v-model="newGame.image" label="Image"></v-file-input>
              <v-btn type="submit" color="primary" :loading="isCreatingGame" :disabled="isCreatingGame || hasErrors==1">Create</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editGameDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Update Game</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="editGame.name" label="Name" required></v-text-field>
              <v-text-field v-model="editGame.description" label="Description" required></v-text-field>
              <v-select v-model="editGame.publisher_id" :items="publishers" item-title="name" item-value="id" label="Publisher"></v-select>
              <v-text-field v-model="editGame.price" label="Price" required></v-text-field>
              <v-text-field v-model="editGame.stock" label="Stock"></v-text-field>
              <v-select v-model="editGame.category_ids" :items="categories" item-title="name" item-value="id" multiple chips label="Categories"></v-select>
              <v-file-input accept="image/*" @change="onExistingGameFileChange()" label="Image"></v-file-input>
              <v-btn type="submit" color="primary" @click="updateGame" :loading="isUpdatingGame" :disabled="isUpdatingGame">Update</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteGameDialog" width="auto">
        <v-card>
          <v-card-title>
            <span class="headline">Delete Game</span>
          </v-card-title>
          <v-card-text>
            <p>Are you sure you want to delete this game?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="deleteGame" :loading="isDeletingGame" :disabled="isDeletingGame">Yes</v-btn>
            <v-btn text @click="deleteGameDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script src="./GamesView.ts"/>
<style src="./GamesView.scss"/>