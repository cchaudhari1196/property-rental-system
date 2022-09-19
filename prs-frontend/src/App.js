import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login.js';
import Footer from './components/Footer.js';
import Search from './components/Search.js';
import Ownerlogin from './components/Ownerlogin.js';
import OwnerHome from './components/OwnerHome.js';
import Adminlogin from './components/AdminLogin.js';
import OwnerHeader from './components/OwnerHeader.js';
import AdminHeader from './components/AdminHeader.js';
import OwnerRegister from './components/OwnerRegister.js';
import AddProperty from './components/AddProperty.js';
import Register from './components/Register.js';
import ViewProperties from './components/ViewProperties.js';
import ViewCustomer from './components/ViewCustomer.js';
import ViewOwner from './components/ViewOwner.js';
import ViewOrders from './components/ViewOrders.js';
import ViewOrderbyuid from './components/ViewOrderbyuid.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewOutofStock from './components/ViewOutofStock.js';
import MyOrderplaced from './components/MyOrderplaced.js';
import AboutUs from './components/AboutUs.js';
import { ToastContainer } from 'react-toastify';
import CityWiseProperties from './components/CityWiseProperties';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/register" element={<> <Register /></>} />
          <Route path="/owneregister" element={<> <OwnerRegister /></>} />
          <Route path="/ownerlogin" element={<><Ownerlogin /></>} />
          <Route path="/adminlogin" element={<><Adminlogin /></>} />
          <Route path="/search" element={<><Header /><Search /></>} />
          <Route path="/owner" element={<><OwnerHeader /> <OwnerHome /></>} />
          <Route path="/viewproperties" element={<><AdminHeader />
            <ViewProperties /></>} />
          <Route path="/viewcustomer" element={<><AdminHeader />
            <ViewCustomer /></>} />
          <Route path="/viewowners" element={<><AdminHeader />
            <ViewOwner /></>} />
          <Route path="/vieworders" element={<><AdminHeader />
            <ViewOrders /></>} />
          <Route path="/addproperty" element={<><OwnerHeader />
            <AddProperty /></>} />
          <Route path="/viewproductoutofstock" element={<><OwnerHeader />
            <ViewOutofStock /></>} />
          <Route path="/order" element={<><Header />
            <ViewOrderbyuid />
            <Footer /></>} />
          <Route path="/placed" element={<><MyOrderplaced /></>} />
          <Route path="/property/:city" element={<><Header />
            <CityWiseProperties /></>} />
          <Route path="/about-us" element={<><Header />
            <AboutUs /></>} />
            
          <Route path="/profile" element={<><Header />
            <MyProfile></MyProfile></>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
