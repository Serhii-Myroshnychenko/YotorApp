import React, {useEffect, useState} from "react";
import s from "./Booking.module.css";
import axios from "axios";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

export default function Booking() {
    
    const {t} = useTranslation();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startAddress, setStartAddress] = useState("");
    const [endAddress, setEndAddress] = useState("");
    const [carName, setCarName] = useState("");
    const[cars, setCars] = useState([]);
    
    useEffect(() => {

        axios
            .get("https://localhost:44349/api/Cars",{
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("tok"),
                }
            })
            .then(
                (respon) => {
                    console.log(respon);
                    console.log(respon.data);
                    setCars(respon.data)})
    },[]);

    async function createBooking(e){
         e.preventDefault();
        
        let res = await fetch("https://localhost:44349/api/Bookings", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({startDate:startDate,endDate:endDate,startAddress:startAddress, endAddress:endAddress, carName:carName, fullPrice:100}),
        });
        if(res.status==200){
            alert(t("alert.sucessfully"));
        }
        else{
            alert(t("alert.taken"));
        }
    }
    return (
        <div className={s.booking}>
            <div className={s.container}>
                <h1 className={s.h1Online}>{t("booking.onlineBookingH1")}</h1>
                <h3 className={s.h3Choose}>{t("booking.chooseVar")}</h3>
                <div className={s.container_choose}>
                    <form onSubmit={createBooking} className={s.formControl}>
                    <h4 className={s.h4choose}>{t("booking.chooseStartDate")}</h4>
                        <div className="mb-4">
                            <input onChange = {(e) => {const selectedStartDate= e.target.value;
                                setStartDate(selectedStartDate);}}type="datetime-local" placeholder="password" />
                        </div>
                        <h4 className={s.h4choose}>{t("booking.chooseEndDate")}</h4>
                        <div className="mb-4">
                            <input onChange = {(e) => {const selectedEndDate= e.target.value;
                                setEndDate(selectedEndDate);}}type="datetime-local" placeholder="password" />
                        </div>  
                        <h4 className={s.h4choose}>{t("booking.chooseStartAddress")}</h4>
                        <div>
                            <form>
                                <input type = "text" placeholder = "Начальный адрес" onChange={(e)=>setStartAddress(e.target.value)}  className = {s.input_promo1}></input>
                            </form>
                        </div>
                        <h4 className={s.h4choose}>{t("booking.chooseEndAddress")}</h4>
                        <div>
                            <form>
                                <input type = "text" placeholder = "Конечный адрес" onChange={(e)=>setEndAddress(e.target.value)}  className = {s.input_promo1}></input>
                            </form>
                        </div>
                        <h4 className={s.h4choose}>{t("booking.chooseCarName")}</h4>
                        <select onChange = {(e) => {const selectedCar = e.target.value;
                            setCarName(selectedCar);}} key ={cars.car_id}>
                            {cars.map(cars =>
                                <option key = {cars.model}>{cars.model}</option>
                            )}
                        </select>  
                        <div> 
                            <button type="submit" className={s.btn_login}>{t("booking.letBooking")} </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}