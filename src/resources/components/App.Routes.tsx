import { Routes, Route } from 'react-router-dom';
import LoginLogout from '../views/Auth';
import Search from '../views/Search';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLogout />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default AppRoutes;
