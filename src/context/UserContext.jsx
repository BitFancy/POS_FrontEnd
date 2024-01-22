import React, { createContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { setAuthToken } from '../utils/api';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  if (localStorage.token) {
    // if there is a token set axios headers for all requests
    setAuthToken(localStorage.token);
    console.log(
      'user context token adfadfadfadddddddddddddddd----------',
      localStorage.token
    );
  }

  useEffect(() => {
    // const token = localStorage.token;
    const token = localStorage.getItem('token');
    console.log('token in user context', token);
    if (token) {
      (async () => {
        try {
          const res = await api.get('/users/me', {
            headers: { 'x-auth-token': token },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Error fetching user: ', err.message);
          throw new Error('No token, Unauthorized');
        }
      })();
    } else {
      setUser(null);
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
