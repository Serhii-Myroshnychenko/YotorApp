import React, {useEffect ,useState} from "react";
import { Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import axios from "axios";
import  "../../utils/i18next";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

const Header = ({isLoggedIn, setIsLoggedIn}) => {
  const handleLogOut = () => {
    setIsLoggedIn(false);
  };
  const [stat, setStat] = useState("");
  const {t, i18n} = useTranslation();

  const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
  };

  useEffect(() => {
    axios
        .get("https://localhost:44349/api/Login/IsAdmin",{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            }
        })
        .then(
            (respon) => {
                setStat(respon.data)})
  },[]);

  function isAdmin(){
    
    if(localStorage.getItem("isAdminIn")==='true'){
      return (
      
        <NavLink className={`nav`} to="/services" activeClassName={s.active}>
           {t("header.panel")}
        </NavLink>
      )
    }
  }

  function isLandlord(){
    
    if(localStorage.getItem("isLandlordIn")==='true'){
      return (
      
        <NavLink className={`nav`} to="/create" activeClassName={s.active}>
           {t("header.createCar")}
        </NavLink>
      )
    }
  }
  return (

    <header>
      {
        isLoggedIn ?
            <div className="header">
              <Container>
                <Row>
                  <ul>
                    <li className={s.item}>
                      <NavLink className={`nav`} to="/cars" activeClassName={s.active}>
                          {t("header.cars")}
                      </NavLink>
                    </li>
                    <li className={s.item}>
                       {isAdmin()}
                    </li>
                    <li className={s.item}>
                       {isLandlord()}
                    </li>
                    <li className={s.item}>
                      <NavLink className={`nav`} to="/review" activeClassName={s.active}>
                          {t("header.review")}
                      </NavLink>
                    </li>
                    <li className={s.item}>
                      <NavLink className={`logo me-3 nav`} to="/main">
                        Yotor
                      </NavLink>
                    </li>
                    <li className={s.item}>
                      <NavLink className={` ${s.btn_online}`} to="/online" activeClassName={s.active}>
                          {t("header.booking")}
                      </NavLink>
                    </li>
                    <li className={s.item}>
                      <NavLink className={` ${s.btn_join}`} to="/cabinet" activeClassName={s.active}>
                          {t("header.cabinet")}
                      </NavLink>
                    </li>
                      <li className={s.item}>
                          <div className={` ${s.lang}`}>
                              <button onClick={() => changeLanguage("ua")} id="uaCss">UA</button>
                              <button onClick={() => changeLanguage("eng")}>ENG</button>
                          </div>
                      </li>
                  </ul>
                </Row>
              </Container>
            </div>:
            <div className="header">
              <Container>
                <Row>
                  <ul> 
                    <li className={s.item}></li>
                    <li className={s.item} >
                      <NavLink className={`nav`} to="/review" activeClassName={s.active} >
                          {t("header.review")}
                      </NavLink>
                    </li>
                    <li className={s.item}>
                      <NavLink className={`logo me-3 nav`} to="/main">
                        Yotor
                      </NavLink>
                    </li>

                    <li className={s.item}>
                      <NavLink className={` ${s.btn_join}`} to="/login" activeClassName={s.active}>
                          {t("header.enter")}
                      </NavLink>
                    </li>
                  </ul>
                </Row>
              </Container>
            </div>
      }
    </header>
  );
};

export default Header;
