import Axios from 'axios'

export async function authorizationInterceptor(config: any) {
  const { headers } = config
  headers['Authorization'] = "Bearer " + sessionStorage.getItem('@App:token') || "";
  config.headers = headers;
  return config
}

export function errorRequestInterceptor(error: any) {
  return Promise.reject(error)
}

export function successResponseInterceptor(response: any) {
  return response
}

export function errorResponseInterceptor(error: any) {
  if (error.response.status === 401){
    sessionStorage.removeItem('@App:token');
    window.location.href = "/"
  }
  return Promise.reject(error)
}