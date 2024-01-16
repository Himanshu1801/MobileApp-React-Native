import React from 'react';
import AppNav from './navigator/AppNav';
import { AuthProvider } from './context/AuthContext';




function App() {
  return (
    <>
      <AuthProvider>
        <AppNav/>
      </AuthProvider>
    </>
  );
}

export default App;