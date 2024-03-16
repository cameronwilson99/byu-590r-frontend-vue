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
            selectedGame: null
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
        }
    }
}