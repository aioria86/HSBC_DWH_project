import React, { useState, useEffect } from 'react';
import VentasTable from './components/VentasTable';
import Login from './components/Login';
import { Button } from 'react-bootstrap';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-danger fw-bold">HSBC - Ventas</h1>
      {isAuthenticated ? (
        <>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="outline-danger" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
          <VentasTable />
        </>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
