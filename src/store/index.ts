import { createStore } from 'vuex';
import { auth } from './auth.module';
import { user } from './user.module';
import { games } from './games.module';

const store = createStore({
    modules: {
        auth,
        user,
        games,
    },
});

export default store;
