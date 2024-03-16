import axios from 'axios';
import authHeader from './auth-header';
import API_URL from './env';

class GamesService {
    getGames() {
        return axios.get(API_URL + 'games', { headers: authHeader() })
            .then(response => {
                return response.data.results;
            });
    }

    getGame(id) {
        return axios.get(API_URL + `games/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data.results;
            });
    }

    createGame(data) {
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock)
        return axios.post(API_URL + 'games', data, { headers: authHeader() })
            .then(response => {
                return response.data.results;
            });
    }

    // updateGame(id, data) {
    //     return axios.put(API_URL + `games/${id}`, data, { headers: authHeader() });
    // }

    // deleteGame(id) {
    //     return axios.delete(API_URL + `games/${id}`, { headers: authHeader() });
    // }
}

export default new GamesService();