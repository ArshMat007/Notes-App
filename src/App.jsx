import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import DataProvider, { DataContext } from './context/DataProvider';
import LoginPage from './components/LoginPage';
import TailwindDemo from "./components/tailwindDemo/TailwindDemo";


function AppContent() {
  const { user } = useContext(DataContext);

  

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <LoginPage />} />
      <Route path="/tailwind-demo" element={<TailwindDemo />} />
    </Routes>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;