import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the app starts, check the cookie once
    fetch('http://localhost:4000/verify', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        console.log('AuthProv working ',data)
        
        if (data) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const logout = async () => {
    try {
      // Optional: Tell your Node.js BFF to clear the cookie
      var sigout = await fetch('http://localhost:4000/logout', { credentials: 'include', method: 'POST' });

      console.log('AuthProv working ',sigout)
    } finally {
      setUser(null); // Clear local state regardless of server success
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);