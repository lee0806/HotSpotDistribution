import React, { useState, useEffect } from "react";
import "../../../styles/components/HeatMap/Filter/SelectCity.css";

function SelectCity({ map }) {
  const [selectDong, setSelectDong] = useState("도봉 1동");
  const [dongDropdown, setdongDropdown] = useState(false);

  const dobongCity = [
    "도봉 1동",
    "도봉 2동",
    "방학 1동",
    "방학 2동",
    "방학 3동",
    "쌍문 1동",
    "쌍문 2동",
    "쌍문 3동",
    "쌍문 4동",
    "창 1동",
    "창 2동",
    "창 3동",
    "창 4동",
    "창 5동",
  ];

  const dongCoordinates = {
    "도봉 1동": { lat: 37.68532, lng: 127.0268 },
    "도봉 2동": { lat: 37.68125, lng: 127.0477 },
    "방학 1동": { lat: 37.66504, lng: 127.0435 },
    "방학 2동": { lat: 37.66919, lng: 127.0327 },
    "방학 3동": { lat: 37.66319, lng: 127.0236 },
    "쌍문 1동": { lat: 37.65307, lng: 127.0195 },
    "쌍문 2동": { lat: 37.65711, lng: 127.0369 },
    "쌍문 3동": { lat: 37.64766, lng: 127.0306 },
    "쌍문 4동": { lat: 37.65543, lng: 127.0304 },
    "창 1동": { lat: 37.64709, lng: 127.0435 },
    "창 2동": { lat: 37.64251, lng: 127.0368 },
    "창 3동": { lat: 37.63729, lng: 127.0417 },
    "창 4동": { lat: 37.65271, lng: 127.0509 },
    "창 5동": { lat: 37.65537, lng: 127.0428 },
  };

  useEffect(() => {
    //if (!map || !selectDong) return;

    if (!map) {
      console.log("map 없음");
      return;
    }

    if (!selectDong) {
      console.log("동 아무것도 안나옴");
      return;
    }

    const coords = dongCoordinates[selectDong];
    if (coords) {
      const moveLatLng = new window.kakao.maps.LatLng(coords.lat, coords.lng);
      map.setCenter(moveLatLng);
    }
  }, [selectDong, map]);

  return (
    <>
      <div className="map-rapper">
        <div className="map-state">
          서울 특별시
          <img
            src="/assets/icons/arrow.svg"
            alt="화살표"
            className="arrow-img"
          />
        </div>
        <div className="map-county">
          도봉구
          <img
            src="/assets/icons/arrow.svg"
            alt="화살표"
            className="arrow-img"
          />
        </div>
        <div
          className="map-city"
          onClick={() => setdongDropdown(!dongDropdown)}
        >
          {selectDong}
          <img
            src="/assets/icons/arrow.svg"
            alt="화살표"
            className="arrow-img"
          />
          {dongDropdown && (
            <ul className="dong-submenu">
              {dobongCity.map((dong) => (
                <li
                  key={dong}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectDong(dong);
                    setdongDropdown(false);
                  }}
                >
                  {dong}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SelectCity;
