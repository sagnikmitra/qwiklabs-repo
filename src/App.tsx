import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EmailCheckPage from './pages/EmailCheckPage';
import UrlCheckPage from './pages/UrlCheckPage';
import BadgeGeneratorPage from './pages/BadgeGeneratorPage';
import AchieversPage from './pages/AchieversPage';
import { UserDataProvider } from './context/UserDataContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <UserDataProvider>
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/email-check" element={<EmailCheckPage />} />
          <Route path="/url-check" element={<UrlCheckPage />} />
          <Route path="/badge-generator" element={<BadgeGeneratorPage />} />
          <Route path="/achievers" element={<AchieversPage />} />
        </Routes>
      </Layout>
    </UserDataProvider>
  );
}

export default App;