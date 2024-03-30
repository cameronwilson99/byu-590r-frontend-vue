import GamesService from '../services/games.service';

const initialState = { gamesList: [] };

export const games = {
    namespaced: true,
    state: initialState,
    data: function() {
        return {
            newGame: {
                title: '',
                description: '',
                price: 0,
                image: ''
            },
            createGameDialog: false,
            editBook: null,
            editBookDialog: false,
            deleteBook: null,
            deleteBookDialog: false
        }
    },
    actions: {
        getGames({ commit }) {
            return GamesService.getGames().then(
                games => {
                    commit('setGames', games);
                    return Promise.resolve(games);
                },
                error => {
                    commit('setGamesFailure');
                    return Promise.reject(error);
                }
            );
        },
        createGame({ commit }, game) {
            return GamesService.createGame(game).then(
                response => {
                    commit('addGame', response.game);
                    return Promise.resolve(response.game);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        updateGame({ commit, getters }, game) {
            return GamesService.updateGame(game).then(
                response => {
                    response.game.index = getters.getStateIndexById(response.game.id);
                    commit('updateGame', response.game);
                    return Promise.resolve(response.game);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        deleteGame({ commit, getters }, game) {
            return GamesService.deleteGame(game).then(
                response => {
                    response.game.index = getters.getStateIndexById(response.game.id);
                    commit('deleteGame', response.game);
                    return Promise.resolve(response.game);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setGames(state, games) {
            state.gamesList = games.map(game => {
                game.price = game.price.toFixed(2);
                return game;
            });
        },
        getGamesFailure(state) {
            state.gamesList = [];
        },
        addGame(state, game) {
            state.gamesList.push(game);
        },
        updateGame(state, game) {
            state.gamesList[game.index] = game;
        },
        deleteGame(state, game) {
            state.gamesList.splice(game.index + 1, 1);
        },
        updateGameImage(state, game) {
            state.gamesList[game.index].image = game.image;
        }
    },
    getters: {
        getStateIndexById: (state) => (id) => {
            return state.gamesList.findIndex(game => game.id === id);
        }
    }
}
