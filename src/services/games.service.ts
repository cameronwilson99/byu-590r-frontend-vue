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
        formData.append('publisher_id', data.publisher_id);
        formData.append('price', data.price);
        formData.append('stock', data.stock)
        formData.append('image', data.image[0]);
        console.log(data.image)
        return axios.post(API_URL + 'games', formData, { headers: authHeader('multipart') })
            .then(response => {
                console.log(response.data.results.game)
                return response.data.results.game;
            });
    }

    updateGame(data) {
        return axios.put(API_URL + `games/${data.id}`, data, { headers: authHeader() })
            .then(response => {
                console.log('response:', response);
                return response.data.results;
            });
    }

    deleteGame(id) {
        console.log('id:', id)
        return axios.delete(API_URL + `games/${id}`, { headers: authHeader() })
            .then(response => {
                console.log('response:', response.data.results);
                return response.data.results;
            });
    }

}

export default new GamesService();