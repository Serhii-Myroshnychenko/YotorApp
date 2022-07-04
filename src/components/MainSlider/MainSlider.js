import React, { useState } from "react";
import "./slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function MainSlider() {
  const {t} = useTranslation();
  
  return (
    <div>
      <div>
          <h3 className="text-center"> {t("main.platform")}</h3>
      </div>
      <div style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
        
        <img src="mainPhoto.jpg" ></img>
      </div>
    </div>
  );
}
export default MainSlider;

