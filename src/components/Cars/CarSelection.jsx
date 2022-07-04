import React, { useEffect, useState } from "react";
import './DetailedCar.module.css';
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";


export default function CarSelection(props) {

  const history = useHistory();
  const {t} = useTranslation();
    console.log("d");
    var item = JSON.parse(localStorage.getItem("TheNearestCar"));
    var items = JSON.parse(localStorage.getItem("cars"));
    let result = [];
    for(let i = 0; i < items.length; i++ ){
        if(items[i].carId == item.carId){
            result.push(JSON.parse(localStorage.getItem("cars"))[i]);
        }
    }
    return (
      <div>
        <div className="app">
        {
          result.map(item =>(
            <div className="details" key={item.carId}>
              <div className="big-img">
                <img src={item.photo} alt=""/>
              </div>
              <div className="box">
                <div className="row">
                  <h2>{item.brand} {item.model}</h2>
                </div>
                <p className="p">Year: {item.year}</p>
                <p>Description: {item.description}</p>
                <p>Site: {item.address}</p>
                <p>Price :{item.price}</p>
                <button className="cart"onClick={()=>history.push('./online')}>{t("cabinet.makeBooking")}</button>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    )
}