import React, {useEffect, useState} from "react";
import s from "./Cabinet.module.css";
import {NavLink, useHistory} from "react-router-dom";
import Header from "../Header_Footer/Header";
import axios from "axios";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";


const Cabinet = ({setIsLoggedIn, isLoggedIn}) => {

    const {t} = useTranslation();
    const [user, setUser]=useState([]);
    const [bookings,setBookings]=useState([]);
    const history = useHistory();
    function logout(){
        setIsLoggedIn(false);
    }

    const handleLogOut = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {

      axios
          .get("https://localhost:44349/api/Login/Info",{
              headers:{
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": "Bearer "+ localStorage.getItem("tok"),
              }
          })
          .then(
              (respon) => {
                  console.log(respon.status);
                  
                  setUser(respon.data)})
  },[]);

  useEffect(() => {

    axios
        .get("https://localhost:44349/api/Bookings/User",{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            }
        })
        .then(
            (respon) => {
                console.log(respon.status);
                
                setBookings(respon.data)})
  },[]);

  <Header />;
  return (
    <div className={s.cabinet_wrapper}>
      <div className={s.wrapper}>
        <h2 className={s.h2text}>{t("cabinet.userCabinet")}</h2>
        <div className={s.infouser_block}>
          <div className={s.row}>
            <h3 className={s.username}>{t("cabinet.helloUser")} {user.fullName}</h3>
            <div className={s.btn_change}>
              <NavLink onClick={handleLogOut}
                       className={`me-3 ${s.change}`}
                      to="/login"
                      activeClassName={s.active}>
                  {t("cabinet.logOff")}
              </NavLink>
            </div>
          </div>

        
          <div className = {s.row}>
              <div className = {s.receptions_block}>
                   <div className = {s.row}>
                <h5 className = {s.h5_resept}>{t("cabinet.userRecordings")}</h5>
            </div>
            <div className = {s.near}><span>{t("cabinet.dates")} </span></div>
            <div className = "coming"><span></span></div>
            <div className={s.row}>
              {
                bookings.map((item,idx)=>{
                  return <tr key={idx}>
                              <td>{item.startDate}</td>
                              <td>---</td>
                              <td>{item.endDate}</td>
                          </tr>
              })
              }
            </div>
            <div className = {s.near}><span>{t("cabinet.price")}</span></div>
            {
               bookings.map((item,idx)=>{
                return <tr key={idx}>
                            <td>{item.fullPrice}</td>
                        </tr>
            })}
            <div className={`${s.row} ${s.row1}`}>
            </div>
            <NavLink
                  className={` ${s.btn_online}`}
                  to="/online"
                  activeClassName={s.active}
                >
                {t("cabinet.makeBooking")}
            </NavLink>
                 </div>
              </div>
           </div>
        </div>
      </div>
  );
};
export default Cabinet;
