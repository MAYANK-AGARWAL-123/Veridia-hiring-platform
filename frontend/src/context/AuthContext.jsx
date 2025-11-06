import { createContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, loadUser as loadUserApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const res = await loadUserApi();
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };

    init();
  }, [token]);

  const login = async (email, password, role) => {
    try {
      const res = await loginApi(email, password, role);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setIsAuthenticated(true);
      // Load user details
      const me = await loadUserApi();
      setUser(me.data);
    } catch (err) {
      console.error(err.response.data);
      throw new Error(err.response.data.msg || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await registerApi(name, email, password);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setIsAuthenticated(true);
      const me = await loadUserApi();
      setUser(me.data);
    } catch (err) {
      console.error(err.response.data);
      throw new Error(err.response.data.msg || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await loadUserApi();
      setUser(res.data);
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;