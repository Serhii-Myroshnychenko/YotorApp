import React, {useState, Suspense} from "react";
import s from "./Create.module.css";
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

export default function CreateCar({setIsLoggedIn, isLoggedIn}) {

    
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");
    const [transmission, setTransmission] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState("");
    const history = useHistory();
    const {t} = useTranslation();


    async function createCar(e){
        e.preventDefault();
        let res = await fetch("https://localhost:44349/api/Cars/Create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({model:model,brand:brand,year:year, transmission:transmission, address:address, city:city, status:true, type: type, price:price, photo:photo, description:description, number:number}),
        });
        if(res.status==200){
            alert(t("alert.successfully"));
        }
        else{
            alert(t("alert.check"));
        }
    }
    return (
        <div>
            <div className={s.row}>
                <div className={s.col_6}>
                    <li className={s.item}>
                    </li>
                    <form onSubmit={createCar} className={s.formControl}>
                        <h1 className={s.login}>{t("createCar.createCarH1")}</h1>
                        <div className={s.Login}>
                            <div className="mb-3">
                                <input type="text" placeholder={t("createCar.enterModel")} onChange={(e)=>setModel(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterBrand")} onChange={(e)=>setBrand(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterYear")} onChange={(e)=>setYear(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterTransmission")} onChange={(e)=>setTransmission(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterAddress")} onChange={(e)=>setAddress(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterCity")} onChange={(e)=>setCity(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterType")} onChange={(e)=>setType(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterPrice")} onChange={(e)=>setPrice(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterPhoto")} onChange={(e)=>setPhoto(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterDescription")} onChange={(e)=>setDescription(e.target.value)} className="w-75" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder={t("createCar.enterNumber")} onChange={(e)=>setNumber(e.target.value)} className="w-75" />
                            </div>
                            <button type="submit" className={s.btn_login}>{t("createCar.createCar")} </button>
                        </div>
                    </form>
                </div>
                <div className={s.col_6}>
                    <div className={s.img_block}>
                        <img className={s.imagecol} src="rentacar-featured.jpg" alt="image_left"></img></div>
                </div>
            </div>
        </div>
    );
}