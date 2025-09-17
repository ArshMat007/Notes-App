import { useContext } from 'react';
import Home from './components/Home';
import DataProvider, { DataContext } from './context/DataProvider';
import LoginPage from './components/LoginPage';

function AppContent() {
  const { user } = useContext(DataContext);

  return user ? <Home /> : <LoginPage />;
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;