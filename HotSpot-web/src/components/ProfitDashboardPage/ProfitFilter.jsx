import React, { useContext, useEffect, useState } from "react";
import { regionData } from "../../constants/regionData";
import { industryData } from "../../constants/industryData";
import { SelectedRegionContext } from "../../hooks/useSelectedRegion";
import { getSalesWithoutCategory } from "../../api/profitAPI";
import "../../styles/components/ProfitDashBoard/ProfitFilter.css";

const ProfitFilter = () => {
  const {
    selectedCity,
    setSelectedCity,
    selectedGu,
    setSelectedGu,
    selectedDong,
    setSelectedDong,
    selectedDetail,
    setSelectedDetail,
    selectedIndustry,
    setSelectedIndustry,
  } = useContext(SelectedRegionContext);

  const [validIndustries, setValidIndustries] = useState([]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedGu("");
    setSelectedDong("");
    setSelectedDetail("");
  };

  const handleGuChange = (e) => {
    setSelectedGu(e.target.value);
    setSelectedDong("");
    setSelectedDetail("");
  };

  const handleDongChange = (e) => {
    setSelectedDong(e.target.value);
    setSelectedDetail("");
  };

  const handleDetailChange = (e) => {
    setSelectedDetail(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  const cities = regionData["시"];
  const gus = selectedCity ? regionData["구"][selectedCity] || [] : [];
  const dongs =
    selectedCity && selectedGu
      ? Object.keys(regionData["동"]?.[selectedCity]?.[selectedGu] || {})
      : [];
  const details =
    selectedCity && selectedGu && selectedDong
      ? (
          regionData["동"]?.[selectedCity]?.[selectedGu]?.[selectedDong] || []
        ).map((name) => ({
          areaId: name.areaId,
          areaName: name.areaName,
        }))
      : [];

  useEffect(() => {
    const fetchValidIndustries = async () => {
      if (!selectedDetail) return;
      console.log("🔥 areaId:", selectedDetail); // 여기에 현재 선택된 상권 ID 찍힘

      try {
        const data = await getSalesWithoutCategory(selectedDetail);
        console.log("📦 응답 데이터:", data); // 실제 백엔드 응답 확인

        const availableCodes = data.map((item) => item.categoryCode);
        const filtered = industryData.filter((industry) =>
          availableCodes.includes(industry.code)
        );
        console.log("✅ 최종 필터링 업종:", filtered); // 드롭다운에 보여줄 업종

        setValidIndustries(filtered);
      } catch (err) {
        console.error("❌ 업종 불러오기 실패", err);
        setValidIndustries([]);
      }
    };

    fetchValidIndustries();
  }, [selectedDetail]);

  return (
    <div className="profit-filter">
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">시 선택</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        value={selectedGu}
        onChange={handleGuChange}
        disabled={!selectedCity}
      >
        <option value="">구 선택</option>
        {gus.map((gu) => (
          <option key={gu} value={gu}>
            {gu}
          </option>
        ))}
      </select>

      <select
        value={selectedDong}
        onChange={handleDongChange}
        disabled={!selectedGu}
      >
        <option value="">동 선택</option>
        {dongs.map((dong) => (
          <option key={dong} value={dong}>
            {dong}
          </option>
        ))}
      </select>

      <select
        value={selectedDetail}
        onChange={handleDetailChange}
        disabled={!selectedDong}
      >
        <option value="">상세 상권 선택</option>
        {details.map((detail, index) => (
          <option key={`${detail.areaId}-${index}`} value={detail.areaId}>
            {detail.areaName}
          </option>
        ))}
      </select>

      <select
        value={selectedIndustry}
        onChange={handleIndustryChange}
        disabled={!validIndustries.length}
      >
        <option value="">업종 선택</option>
        {validIndustries.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfitFilter;
