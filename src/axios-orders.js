import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-9c368.firebaseio.com/'
});

export default instance;