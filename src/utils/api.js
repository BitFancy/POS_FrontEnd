import axios from 'axios';

// Create an instance of axios
<<<<<<< HEAD
export const api = axios.create({
  // baseURL: 'https://restaurant-pos-service.onrender.com/api',
  baseURL: 'http://localhost:5000/api',
=======
const api = axios.create({
  baseURL: 'https://restaurant-pos-service.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
>>>>>>> 53a7d9608cf618f51e2f45e5b4ee0a0114dff458
  headers: {
    'Content-Type': 'application/json',
    // 'x-auth-token': localStorage.getItem('token'),
  },
});

export const setAuthToken = (token) => {
  if (token) {
    console.log(localStorage.token, 'thisis setauthtoken before');
    // console.log(token, 'thisis setauthtoken');
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log(localStorage.token, 'thisis setauthtoken after');
    // } else {
    //   delete api.defaults.headers.common['x-auth-token'];
    //   localStorage.removeItem('token');
  }
};
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       window.localStorage.clear();
//     }
//     return Promise.reject(err);
//   }
// );
