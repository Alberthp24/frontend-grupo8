import { createContext, useContext, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('user') || 'null'));

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    if (data.token) sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };
  const logout = () => { sessionStorage.clear(); setUser(null); };
  const tieneRol = (modulo, rol) => !!user?.roles?.some((r) => r.modulo === modulo && r.rol === rol);

  return <AuthContext.Provider value={{ user, login, logout, tieneRol }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
