import React, {useState, Suspense} from "react";
import Header from "./components/Header_Footer/Header";
import "./App.css";
import Footer from "./components/Header_Footer/Footer";
import MainSlider from "./components/MainSlider/MainSlider";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Cabinet from "./components/UserCabinet/Cabinet";
import Login from "./components/Login/Login";
import Booking from "./components/OnlineBooking/Booking";
import Services from "./components/Services/Services.js";
import Review from "./components/Review/Review";
import Registration from "./components/Registration/Registration";
import Cars from "./components/Cars/Cars";
import CreateCar from "./components/CreateCar/CreateCar";
import DetailedCar from "./components/Cars/DetailedCar";
import CarSelection from "./components/Cars/CarSelection";

const App = (props) => {
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
const [Email, setEmail] = useState("");
  return (
    <Suspense fallback={<Registration/>}>
    <BrowserRouter>
      <div className="app-wrapper">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Route path="/main" render={() => <MainSlider />} />   
        <Route path="/review" render={() => <Review />} />
        <Route path="/cars" render={() => <Cars />} />
        <Route path="/carSelection" render={() => <CarSelection />} />
        <Route path="/services" render={() => <Services />} />
        <Route path="/create" render={() => <CreateCar />} />
        <Route path="/detailedCar" render={() => <DetailedCar />} />
        <Route path="/login" render={() => <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} Email={Email} setEmail={setEmail}/>} />
        <Route path = "/registration" render={() => <Registration />} /> 
        <Route path="/cabinet" render={() => <Cabinet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/online" render={() => <Booking Email={Email}/>} />
        <Footer />
      </div>
    </BrowserRouter>
    </Suspense>
  );
};
export default App;
