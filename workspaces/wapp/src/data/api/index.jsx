import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const route = (...path) => `${API}/${path.join('/')}`;

export const getUsers = (params, callback) => {
  axios.get(route('users'), { params })
    .then(response => {
      if (response.status === 200) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error fetching users: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}; 

export const postUsers = (user, callback) => {
  axios.post(route('users'), user)
    .then(response => {
      if (response.status === 201) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error creating user: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}

export const updateUser = (userId, userData, callback) => {
  axios.put(route('users', userId), userData)
    .then(response => {
      if (response.status === 200) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error updating user: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}