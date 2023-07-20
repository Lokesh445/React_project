import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login'
import Signup from './components/signup';
import Navbar from './components/navbar';
import Welcome from './components/welcome';

function App() {
  return (
    <Router>
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-grow overflow-hidden'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/welcome" element={<Welcome/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
