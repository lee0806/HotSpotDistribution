import React from "react";
import "./Banner.css";
import { useNavigate, useLocation } from "react-router-dom";

function Banner() {

  const navigate = useNavigate();
  const location = useLocation();
  const goTo = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;
  

  return (
    <div className="Banner-container">
      <div className="navigater">
        <img className="logo" src="/assets/logo.png" alt="logo" onClick={() => goTo("/")} />
        <div className="navi-items">
          <div className={`navi-item ${isActive("/map") ? "active" : ""}`} onClick={() => goTo("/map")}>
            지도
          </div>
          <div className={`navi-item ${isActive("/select") ? "active" : ""}`} onClick={() => goTo("/select")}>
            추천 페이지
          </div>
          <div className={`navi-item ${isActive("/profit") ? "active" : ""}`} onClick={() => goTo("/profit")}>
            손익 분기점
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
