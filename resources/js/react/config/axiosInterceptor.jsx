import {Tokens, errorMessage} from '../constants';
import {environment} from './environment'
import Cookies from 'js-cookie';

export default {
    setupInterceptors: (axios, isToken = false, isFormData = false) => {
        axios.interceptors.request.use((config) => {

                if (config._method == 'PATCH' && config.data) {
                    config.data._method = 'PATCH';
                }

                
                if (isToken) {
                    return config;
                } 
              
                let Token = Cookies.get('authToken');
                if (Token) {
                    config.headers['Authorization'] = `Bearer ${Token}`;
                }

                if (!Token) {
                    if (!window.location.href.includes('login') && !window.location.href.includes('reset-password') && !window.location.href.includes('forgot-password')) {
                        alert('i am redirecting ');
                        window.location.href = environment.URL + '#/' + 'login';
                    }
                }

                if (isFormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error)
        );
        const errorHandler = (error) => {

            if (error.response?.status === 401 && error.response?.data?.message === errorMessage.UNAUTHENTIiCATED) {
                localStorage.removeItem(Tokens.ADMIN);
                localStorage.removeItem(Tokens.USER);
                localStorage.removeItem(Tokens.GET_PERMISSIONS);
                Cookies.remove("authToken");
                window.location.href = environment.URL + '#' + '/login';
            }else if(error.response.status === 403 || error.response.status === 404) {
                window.location.href = environment.URL + '#' + '/app/dashboard';
            }else {
                return Promise.reject({...error})
            } 
          
           
        };
        const successHandler = (response) => {
            return response;
        };
    }
};
