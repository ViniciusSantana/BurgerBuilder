import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-builder-e257c.firebaseio.com'
})

export default instance;