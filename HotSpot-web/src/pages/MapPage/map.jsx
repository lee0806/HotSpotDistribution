import "/src/styles/MapPage/map.css";
import Filter from "/src/components/HeatMap/Filter/Filter";
import Analysis from "../../components/HeatMap/Analysis/Analysis";
import KakaoMapView from "../../components/HeatMap/KaKaoMapView/KakaoMapView";
import SelectCity from "../../components/HeatMap/Filter/SelectCity";
import { useEffect, useState } from "react";

function Map() {
  const [map, setMap] = useState(null);
  // 마커 이름 정보
  const [selectedMarker, setSelectedMarker] = useState("");

  // 마커 아이디 정보
  const [selectedId, setSelectedId] = useState("");

  // 유동인구의 상태 값(Filter에서 토글 버튼으로 현재 유동인구와 과거 유동인구를 구분)
  const [populationType, setPopulationType] = useState("2024");


  // 월별 유동인구 상태 값
  const [selectedFilterMonth, setSelectedFilterMonth] = useState("");

  // 성별 선택의 상태 값
  const [selectedFilterGender, setSelectedFilterGender] = useState("");

  // 연령대별 선택의 상태 값
  const [selectedFilterAgeGroup, setSelectedFilterAgeGroup] = useState("");

  // 현재 상권 코드에 대한 상태 값
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");

  // 보증금 선택에 대한 상태 값
  const [selectedFilterRent, setSelectedFilterRent] = useState("");

  // 주말과 평일에 대한 상태 값
  const [selectedFilterDay, setSelectedFilterDay] = useState("");

  // 보증금 가격 슬라이드에 대한 상태값
  const [selectedFilterMaxRent, setSelectedFilterMaxRent] = useState([0, 200000]);

  // 매출액 산정 상태 값
  const [salesInputTarget, setSalesInputTarget] = useState(null);

  return (
    <>
      <KakaoMapView
        setMap={setMap}
        setSelectedMarker={setSelectedMarker}
        setSelectedId={setSelectedId}
        populationType={populationType} // 현재 과거 유동인구 타입 
        selectedFilterGender={selectedFilterGender}
        selectedFilterAgeGroup={selectedFilterAgeGroup}
        selectedCategoryCode={selectedCategoryCode}
        selectedFilterMonth={selectedFilterMonth}
        selectedFilterRent={selectedFilterRent}
        selectedFilterDay={selectedFilterDay}
        selectedFilterMaxRent={selectedFilterMaxRent}
        salesInputTarget={salesInputTarget}
      />

      <div className="content-wrapper">
        <Filter
          setPopulation
          setPopulationType={setPopulationType} // 현재 과거 유동인구 타입
          setSelectedFilterGender={setSelectedFilterGender}
          setSelectedFilterAgeGroup={setSelectedFilterAgeGroup}
          setSelectedCategoryCode={setSelectedCategoryCode}
          setSelectedFilterMonth={setSelectedFilterMonth}
          setSelectedFilterRent={setSelectedFilterRent}
          setSelectedFilterDay={setSelectedFilterDay}
          setSelectedFilterMaxRent={setSelectedFilterMaxRent}
          setSalesInputTarget={setSalesInputTarget}
        />
        <SelectCity map={map} />
        <Analysis selectedMarker={selectedMarker} selectedId={selectedId} />
      </div>
    </>
  );
}

export default Map;
