import { Routes, Route } from 'react-router-dom';
import LoginLogout from '../views/Auth';
import StateInflator from './StateInflator';
import Search from '../views/Search';
import Results from '../views/Results';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <LoginLogout /> } />
      <Route path="/search" element={<StateInflator><Search /></StateInflator>} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
};

export default AppRoutes;
