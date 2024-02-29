import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup';
import DashBoard from './pages/DashBoard'
import Error from './components/Error/Error'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddTransaction from './pages/AddTransaction';
import AllTransactions from './pages/AllTransactions';
import Leaderboard from './pages/Leaderboard';
import SendMail from './components/password/SendMail';
import ResetPassword from './components/password/ResetPassword';
import Report from './pages/Report';
import PrivateRoutes from './routes/PrivateRoutes';
import RestrictedRoutes from './routes/RestrictedRoutes';
import Modal from 'react-modal'

function App() {
  
  Modal.setAppElement("#root");

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path='/signup' element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/add-transaction' element={<AddTransaction />} />
      <Route path='/transactions' element={<AllTransactions />} />
      <Route path="/" element={<RestrictedRoutes />}>
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/reports'   element={<Report />}  />
      </Route>
      </Route>
      <Route path='/sendMail'  element={<SendMail />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  );
}

export default App;
