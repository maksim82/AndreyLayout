import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/autherization/Login';
import Registration from './components/autherization/Registration';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Statistics from './components/statistics/Statistics';
import Accounting from './components/accounting/Accounting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/statistic" element={<Statistics />} />
          <Route path="/accounting" element={<Accounting />} />
        </Route>  
      </Routes>
    </Router>
  );
}

export default App;
