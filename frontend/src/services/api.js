import axios from 'axios';

//esta constante "api" com o "baseURL" deixarão como padrão
//o caminho onde todas as páginas comumente percorrer, neste caso
//http://localhost:3333
const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;