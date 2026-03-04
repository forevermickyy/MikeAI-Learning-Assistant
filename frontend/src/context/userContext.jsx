import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true
});

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if(!user) {
            API.get('/profile')
            .then(({data}) => {
                setUser(data);
                setReady(true);
            })
            .catch(() => {
                setUser(null);
                setReady(true);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = async () => {
        try {
            await API.post('/logout'); // Tell backend to clear cookie
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return(
        <UserContext.Provider value={{user, setUser, ready, logout}}>
            {children}
        </UserContext.Provider>
    );
}