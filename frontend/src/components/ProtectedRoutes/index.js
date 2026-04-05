import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'AuthContext';

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Wait for the /auth/me check

  console.log('Verifying user here ', user)
  // If no user is found in context, kick them to login
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;