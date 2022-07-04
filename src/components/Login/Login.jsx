import React, {useEffect, useState} from "react";
import s from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import "../../utils/i18next";
import { resetNotification } from "react-admin";



export default function Login({setIsLoggedIn, isLoggedIn, Email, setEmail}) {
  
    const [Password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [statusCode, setStatusCode] = useState(null);
    const history = useHistory();
    const {t} = useTranslation();
    useEffect(() => {
        if(localStorage.getItem('user-info') && isLoggedIn == true){
            history.push("/cabinet")
        }
    }, [])

    async function login(e) {
        e.preventDefault();
        let result = await fetch("https://localhost:44353/api/Customers/Login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({Email: Email, Password: Password}),
        });
        var stat = result.status === 200;
        var res = await result.json();
        JSON.stringify(res);
        if(stat && res.access_token != undefined){

            setStatusCode(200);
            localStorage.setItem("user-info", res);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem("tok",res.access_token);
            
            setToken(resetNotification);
            setIsLoggedIn(true);
            history.push("/main")
        }
        else{
            alert(t("alert.check"));
        }

    }
    function getUsersRole(){
        isAdminLogin();
        isLanlordLogin();
    }
    async function isAdminLogin(){
        let res = await fetch("https://localhost:44349/api/Login/IsAdmin", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        res = await res.json();
        localStorage.setItem("isAdminIn", JSON.stringify(res));
    }
    async function isLanlordLogin(){
        let res = await fetch("https://localhost:44349/api/Landlords/IsLandlord", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        res = await res.json();
        localStorage.setItem("isLandlordIn", JSON.stringify(res));
    }

    return (
        <form onSubmit={login} className={s.formControl}>
        <div className={s.row}>
            <div className={s.col_6}>
                <h5 className={s.h5welcome}>{t("login.hello")} <span className={s.craftcuts_red}>Yotor</span> </h5>
                <h6 className = "mb-5 ml-5">{t("login.registration")} <NavLink to="/registration">{t("login.here")}</NavLink></h6>
                <h1 className={s.login}>{t("login.enter")}</h1>
                <div className={s.Login}>
                <div className = "form-group">
                    <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} className={'form-control' + ' w-50 ' + ' mb-3 ' +  s.email_input}/>
                    <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} className={'form-control' + ' w-50 ' + s.password_input}/>
                    </div>
                    <button type="submit" onClick={getUsersRole} className={s.btn_login}>Login </button>
                </div>
            </div>
            <div className={s.col_6}>
                <div className={s.img_block}>
                    <img className = {s.imagecol} src="rentacar-featured.jpg" alt="image_left"></img></div>
            </div>
        </div>
        </form>
    );
}