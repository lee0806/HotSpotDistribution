import React from "react";
import "../../../styles/components/SelectPage/Select/Select.css";
import { useNavigate } from "react-router-dom";

function Select() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(path);

  return (
    <>
      <div className="select-container">
        <div className="select-title">어떤걸 고민 중이세요?</div>

        <div className="select-card">
          <button
            className="select-card-item"
            onClick={() => goTo("/localRecommendPage")}
          >
            <img src="/src/assets/icons/map.svg" alt="map" className="icon" />
            <div className="card-text">장소를 고민하고 있어요.</div>
          </button>

          <button
            className="select-card-item"
            onClick={() => goTo("/IndustryPage")}
          >
            <img
              src="/src/assets/icons/building.svg"
              alt="building"
              className="icon"
            />
            <div className="card-text">업종을 고민하고 있어요.</div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Select;
