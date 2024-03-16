import GamesService from '../services/games.service';

const initialState = { gamesList: [] };

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
    },
}
