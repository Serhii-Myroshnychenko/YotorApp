import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import './DetailedCar.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";
import {AppBar, Container, Toolbar, IconButton, Typography, Paper, Box, Grid, Card, CardMedia, CardContent, CardActions} from '@material-ui/core';

export default function DetailedCar(props) {

  const history = useHistory();
  const {t} = useTranslation();
    
    var items = JSON.parse(localStorage.getItem("cars"));
    let result = [];
    for(let i = 0; i < items.length; i++ ){
        if(items[i].carId == localStorage.getItem("carId")){
            result.push(JSON.parse(localStorage.getItem("cars"))[i]);
        }
    }
    var item = JSON.parse(localStorage.getItem("cars"));
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
                
                <p className="p">{t("carD.year")}: {item.year}</p>
                <p>{t("carD.description")}: {item.description}</p>
                <p>{t("carD.site")}: {item.address}</p>
                <p>{t("carD.price")} :{item.price}</p>
                <button className="cart"onClick={()=>history.push('./online')}>{t("cabinet.makeBooking")}</button>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    )
}