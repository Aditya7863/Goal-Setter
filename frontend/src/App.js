import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <>
        <Router>
          <div className='container'>
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
            </Routes>
          </div>
        </Router>
        <ToastContainer />
    </>
  );
}

export default App;
