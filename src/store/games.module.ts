import GamesService from '../services/games.service';

const initialState = { gamesList: [], categories: [], publishers: []};

export const games = {
    namespaced: true,
    state: initialState,
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
        getCategories({ commit }) {
            return GamesService.getCategories().then(
                categories => {
                    commit('setCategories', categories);
                    return Promise.resolve(categories);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        getPublishers({ commit }) {
            return GamesService.getPublishers().then(
                publishers => {
                    commit('setPublishers', publishers);
                    return Promise.resolve(publishers);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        createGame({ commit }, game) {
            return GamesService.createGame(game).then(
                response => {
                    commit('addGame', response);
                    return Promise.resolve(response);
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
                    response.index = getters.getStateIndexById(response.id);
                    commit('deleteGame', response);
                    return Promise.resolve(response);
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
        setCategories(state, categories) {
            state.categories = categories;
        },
        setPublishers(state, publishers) {
            state.publishers = publishers;
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
            state.gamesList.splice(game.index, 1);
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
