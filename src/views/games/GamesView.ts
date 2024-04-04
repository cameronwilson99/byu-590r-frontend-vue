import { mapState } from 'vuex';
//import { useDisplay } from 'vuetify';
export default {
    name: 'GamesView',
    computed: {
        ...mapState({
            games() {
                return this.$store.state.games.gamesList;
            }
        })
    },
    data: function() {
        return {
            isLoadingGames: true,
            showModal: false,
            selectedGame: null,
            newGame: {
                title: '',
                description: '',
                publisher_id: '',
                price: 0,
                image: ''
            },
            createGameDialog: false,
            editGame: null,
            editGameDialog: false,
            selectedGameToDelete: null,
            deleteGameDialog: false,
            isCreatingGame: false,
            isUpdatingGame: false,
            isDeletingGame: false,
            editImageChangeDialogBtn: false
        }
    },
    created() {
        this.getGames();
    },
    methods: {
        getGames() {
            this.$store.dispatch('games/getGames')
                .then(() => {
                    this.isLoadingGames = false;
                })
                .catch(() => {
                    this.$display.error('Error getting games');
                });
        },
        showGameDetails(game) {
            this.selectedGame = game;
            this.showModal = true;
        },
        closeModal() {
            this.selectedGame = null;
            this.showModal = false;
        },
        addToCart(game) {
            console.log('Added to cart:', game);
        },
        openCreateDialog() {
            this.newGame = {
                title: '',
                description: '',
                price: 0,
                image: ''
            };
            this.createGameDialog = true;
        },
        openEditDialog(game) {
            console.log('Edit game:', game)
            this.editGame = game;
            this.editGameDialog = true;
        },
        openDeleteDialog(game) {
            this.selectedGameToDelete = game;
            this.deleteGameDialog = true;
        },
        closeCreateDialog() {
            this.newGame = {
                title: '',
                description: '',
                price: 0,
                image: ''
            };
            this.createGameDialog = false;
        },
        closeEditDialog() {
            this.editGame = null;
            this.editGameDialog = false;
        },
        closeDeleteDialog() {
            this.selectedGameToDelete = null;
            this.deleteGameDialog = false;
        },
        createGame() {
            this.isCreatingGame = true;
            this.$store.dispatch('games/createGame', this.newGame)
                .then(() => {
                    this.closeCreateDialog();
                    this.isCreatingGame = false;
                })
                .catch(() => {
                    this.$display.error('Error creating game');
                    this.isCreatingGame = false;
                });
        },
        updateGame() {
            this.isUpdatingGame = true;
            this.$store.dispatch('games/updateGame', this.editGame)
                .then(() => {
                    this.editGameDialog = false;
                    this.editImageChangeDialogBtn = false;
                    this.editGame = {};
                    this.isUpdatingGame = false;
                })
                .catch(() => {
                    console.log('Error updating game');
                    this.isUpdatingGame = false;
                });
        },
        deleteGame() {
            this.isDeletingGame = true;
            this.$store.dispatch('games/deleteGame', this.selectedGameToDelete.id)
                .then(() => {
                    console.log(this.deleteGameDialog);
                    this.deleteGameDialog = false;
                    this.isDeletingGame = false;
                    this.selectedGameToDelete = null;
                })
                .catch(() => {
                    this.isDeletingGame = false;
                });
        },
        onNewGameFileChange(e) {
            var image = e.target.files[0] || e.dataTransfer.files[0];

            if (!image.length) {
                return;
            }

            this.newGame.image = image[0];
        },
        onExistingGameFileChange(e) {
            var image = e.target.files[0] || e.dataTransfer.files[0];
            if (!image.length) {
                return;
            }

            this.editGame.file = image[0];
            this.isUpdatingGame = true;
            this.$store.dispatch('games/update_game_image', this.editGame)
                .then(() => {
                    this.isUpdatingGame = false;
                })
                .catch(() => {
                    this.$display.error('Error updating game image');
                    this.isUpdatingGame = false;
                });
        },

    }
}