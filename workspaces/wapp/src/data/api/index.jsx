import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const API_TOKEN_KEY = import.meta.env.VITE_API_TOKEN_KEY;
const route = (...path) => `${API}/${path.join('/')}`;

// const headers = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_TOKEN_KEY}`
//   }
// }

// axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN_KEY}`;
const operator = axios.create({
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN_KEY}`
    }
});

export const getUsers = (params, callback) => {
  operator.get('/users', { params })
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
  operator.post('/users', user)
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
  operator.put(`/users/${userId}`, userData)
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

export const getTokens = (params, callback) => {
  operator.get('/tokens', { params })
    .then(response => {
      if (response.status === 200) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error fetching usetokensrs: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}; 

export const postTokens = (data, callback) => {
  console.log('api.postTokens()', data);
  operator.post('/tokens', data)
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

export const updateToken = (userId, userData, callback) => {
  operator.put(`/tokens/${userId}`, userData)
    .then(response => {
      if (response.status === 200) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error updating token: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}

export const deleteToken = (tokenId, callback) => {
  operator.delete(`/tokens/${tokenId}`)
    .then(response => {
      if (response.status === 200) {
        callback(null, response.data);
      } else {
        callback(new Error(`Error deleting token: ${response.status}`));
      }
    })
    .catch(error => {
      callback(error);
    });
}