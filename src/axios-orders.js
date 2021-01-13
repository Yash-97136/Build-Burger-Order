import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-first-burger-project-97d1e-default-rtdb.firebaseio.com/'
})

export default instance;