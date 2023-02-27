import axios from 'axios';
import { authorizationInterceptor, errorRequestInterceptor, successResponseInterceptor, errorResponseInterceptor } from './middlewares';

const RequestService = axios.create({
    baseURL: 'http://localhost:5000/',
});

RequestService.interceptors.request.use(authorizationInterceptor, errorRequestInterceptor)
RequestService.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor)

export default RequestService;      