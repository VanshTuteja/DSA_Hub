import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import { useSessionTimer } from './hooks/useSessionTracker';
import { ThemeProvider } from './components/ThemeProvider';
import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import ResetPassword from './auth/ResetPassword';
import React from 'react';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/home" replace />
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:
      <AuthenticatedUser>
        <HomePage />
      </AuthenticatedUser>
  },
  {
    path: "/home",
    element:
      <ProtectedRoutes>
        <MainPage />
      </ProtectedRoutes>,
  },
  {
    path: "/profile",
    element:
      <ProtectedRoutes>
          <Dashboard />
      </ProtectedRoutes>
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },

]);


function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication])

  useSessionTimer();

  if (isCheckingAuth) return <Loading isVisible={false} />


  return (
    <ThemeProvider defaultTheme="system" storageKey="dsa-hub-theme">
      <RouterProvider router={appRouter}></RouterProvider>
    </ThemeProvider>
  )
}

export default App
