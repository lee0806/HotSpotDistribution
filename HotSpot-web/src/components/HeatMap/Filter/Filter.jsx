import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "../../../styles/components/HeatMap/Filter/Filter.css";

function Filter({
  setPopulationType,
  setSelectedFilterGender,
  setSelectedFilterAgeGroup,
  setSelectedCategoryCode,
  setSelectedFilterMonth,
  setSelectedFilterDay,
  setSelectedFilterMaxRent,
  setSalesInputTarget,
}) {
  // 매출액 필터 상태
  // const [salesTarget, setSalesTarget] = useState(null); // State is now lifted to parent
  // 상권 선택을 위한 옵션
  const [businessSubOptions] = useState({
    선택: [{ categoryCode: "CS100000", categoryName: "선택" }],
    음식점: [
      { categoryCode: "CS100001", categoryName: "한식음식점" },
      { categoryCode: "CS100002", categoryName: "중식음식점" },
      { categoryCode: "CS100003", categoryName: "양식음식점" },
      { categoryCode: "CS100004", categoryName: "제과점" },
      { categoryCode: "CS100005", categoryName: "패스트푸드점" },
      { categoryCode: "CS100006", categoryName: "치킨전문점" },
      { categoryCode: "CS100007", categoryName: "분식전문점" },
      { categoryCode: "CS100008", categoryName: "호프-간이주점" },
      { categoryCode: "CS100009", categoryName: "커피-음료" },
    ],
    오락: [{ categoryCode: "CS200019", categoryName: "PC방" }],
    과일점: [{ categoryCode: "CS300009", categoryName: "청과상" }],
    반찬가게: [{ categoryCode: "CS300010", categoryName: "반찬가게" }],
  });

  const navigate = useNavigate();

  // 조건 삭제 핸들러
  const handleClearFilters = () => {
    setSelectedFilterGender(null);
    setSelectedFilterAgeGroup([]);
    setSelectedCategoryCode(null);
    setSelectedFilterMonth(null);
    setSelectedFilterDay(null);
    setSelectedFilterMaxRent([0, 200000]);
    setSalesInputTarget(null);

    setSelectBusinessMain("선택");
    setSelectBusinessSub({
      categoryCode: "CS100000",
      categoryName: "선택",
    });
    setSelectedYear("2024");
    setSelectedMonth(null);
    setSelectedDay(null);
    setSelectedGender(null);
    setSelectedAgeGroups([]);
    setRangeValue(0);
    setInputSales("");
    setDepositRangeValue([0, 200000]);

    setPopulationType("2024");
    navigate("/map");
  };

  // 상권 선택을 위한 상태 변수
  const [selectBusinessMain, setSelectBusinessMain] = useState("선택");

  // 세부 상권 선택을 위한 상태 변수
  const [selectBusinessSub, setSelectBusinessSub] = useState({
    categoryCode: "CS100000",
    categoryName: "선택",
  });

  // 드롭다운 메뉴의 표시 여부를 관리하는 상태 변수
  const [showDropdown, setShowDropdown] = useState(null);

  // 필터의 표시 여부를 관리하는 상태 변수
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // 연도 선택 드롭다운 상태
  const [selectedYear, setSelectedYear] = useState("2024");

  // 달 선택을 위한 상태 변수
  const [selectedMonth, setSelectedMonth] = useState(null);

  // 주말과 평일 선택을 위한 상태 변수
  const [selectedDay, setSelectedDay] = useState(null);

  // 분기 선택을 위한 상태 변수
  const [selectedGender, setSelectedGender] = useState(null);

  // 연령대 다중 선택
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);

  // 슬라이더의 현재 값을 저장하는 상태 변수
  const [rangeValue, setRangeValue] = useState(0);

  // 매출액 입력을 위한 상태 변수
  const [inputSales, setInputSales] = useState("");

  // 보증금 범위 설정을 위한 상태 변수
  const [depositRangeValue, setDepositRangeValue] = useState([0, 200000]);

  useEffect(() => {
    setSelectedFilterMaxRent([0, 200000]);
  }, [setSelectedFilterMaxRent]);

  // 연도 변경 핸들러
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setPopulationType(year);
    console.log(`유동인구 연도 변경: ${year}`);
  };

  useEffect(() => {
    // 슬라이더의 현재 값을 업데이트
    const slider = document.querySelector(".styled-range");
    if (slider) {
      const max = Number(slider.max);
      const percent = (rangeValue / max) * 100;
      slider.style.setProperty("--progress", `${percent}%`);
    }
  }, [rangeValue]);

  return (
    <>
      {/* filter의 전체적인 컨테이너 */}

      <div className={`Filter-container${isFilterVisible ? "" : " hidden"}`}>
        {/* filter의 제목과 연도 선택 드롭다운 */}
        <div className="Title-container">
          <div className="Filter-title">필터</div>
          <div className="Year-selector-wrapper">
            <label
              className="Year-selector-label"
              htmlFor="year-select"
              style={{ fontWeight: "bold" }}
            >
              연도 선택:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 시간 설정에 관한 내용 */}
        <div className="Filter-timeset-section">
          <div className="Filter-options-title">주말과 평일</div>

          {/* 달별 유동인구를 선택 */}
          <ul className="Filter-Month-list">
            {[
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ].map((Month) => (
              <li key={Month}>
                <button
                  className={selectedMonth === Month ? "selected" : ""}
                  onClick={() => {
                    setSelectedMonth(Month);
                    setSelectedFilterMonth(Month);
                  }}
                >
                  {Month}
                </button>
              </li>
            ))}
          </ul>

          {/* 주말과 평일 중 선택 */}
          <ul className="Filter-Day-list">
            {["평일", "주말"].map((Day) => (
              <li key={Day}>
                <button
                  className={selectedDay === Day ? "selected" : ""}
                  onClick={() => {
                    setSelectedDay(Day);
                    setSelectedFilterDay(Day);
                  }}
                >
                  {Day}
                </button>
              </li>
            ))}
          </ul>

          <div className="Filter-line" />
        </div>

        {/* 성별에 관한 내용 */}
        <div className="Filter-gender-section">
          <div className="Filter-options-title">성별</div>
          <div className="Filter-gender-list">
            {["남성", "여성"].map((gender) => (
              <li key={gender}>
                <button
                  className={selectedGender === gender ? "selected" : ""}
                  onClick={() => {
                    setSelectedGender(gender);
                    setSelectedFilterGender(gender);
                  }}
                >
                  {gender}
                </button>
              </li>
            ))}
          </div>
          <div className="Filter-line" />
        </div>

        {/* 연령대에 관한 내용 */}
        <div className="Filter-age-section">
          <div className="Filter-options-title">연령대</div>
          <div className="Filter-age-options">
            {["10대", "20대", "30대", "40대", "50대", "60대 이상"].map(
              (age, index) => (
                <React.Fragment key={age}>
                  <input
                    type="radio"
                    name="age-group"
                    id={`age-${index}`}
                    checked={selectedAgeGroups[0] === age}
                    onChange={() => {
                      setSelectedAgeGroups([age]);
                      setSelectedFilterAgeGroup([age]); // send to parent
                    }}
                  />
                  <label htmlFor={`age-${index}`} style={{ fontWeight: "700" }}>
                    {age}
                  </label>
                </React.Fragment>
              )
            )}
          </div>
          <div className="Filter-line" />
        </div>

        {/* 보증금에 관한 내용 */}
        <div className="Filter-deposit-section">
          <div className="Filter-options-title">보증금 (1평당)</div>

          {/* Slider 라이브러리를 이용해 최소, 최대를 설정 */}
          <div className="Filter-deposit-range-wrapper">
            <Slider
              range
              min={0}
              max={200000}
              defaultValue={[0, 200000]}
              onChange={(value) => {
                setDepositRangeValue(value);
                setSelectedFilterMaxRent(value); // 부모 컴포넌트로 값 전달
              }}
            ></Slider>

            {/* Slder의 요소, 움직였을때 가변적으로 값이 변화하도록 설정 */}
            <div className="Filter-deposit-elements">
              <div className="Filter-deposit-elements-left">
                <div
                  style={{
                    width: "2px",
                    height: "6px",
                    backgroundColor: "black",
                    margin: "0 auto",
                    borderRadius: "20px",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#d5d5d5",
                    textAlign: "center",
                  }}
                >
                  최소
                </span>
              </div>

              <div className="Filter-deposit-elements-center">
                {`${depositRangeValue[0].toLocaleString()} ~ ${depositRangeValue[1].toLocaleString()}`}
              </div>

              <div className="Filter-deposit-elements-right">
                <div
                  style={{
                    width: "2px",
                    height: "6px",
                    backgroundColor: "black",
                    margin: "0 auto",
                    borderRadius: "20px",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#d5d5d5",
                    textAlign: "center",
                  }}
                >
                  최대
                </span>
              </div>
            </div>
          </div>

          <div className="Filter-line" />
        </div>

        {/* 상권 선택에 관한 내용 */}
        <div className="Filter-business-district-section">
          <div className="Filter-options-title">업종 선택</div>
          <div className="Filter-business-district-options">
            <div
              className="business-district-items"
              onClick={() =>
                setShowDropdown((prev) => (prev === "main" ? null : "main"))
              }
            >
              <span>{selectBusinessMain}</span>
              <img
                src="/assets/icons/arrow.svg"
                alt="화살표"
                className="arrow-img"
              />
              {showDropdown === "main" && (
                <ul className="business-submenu">
                  {Object.keys(businessSubOptions).map((main) => (
                    <li
                      key={main}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectBusinessMain(main);
                        setSelectBusinessSub(businessSubOptions[main][0]); // 첫 번째 서브 자동 선택
                        setShowDropdown(null);
                      }}
                    >
                      {main}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div
              className="business-district-items"
              onClick={() =>
                setShowDropdown((prev) => (prev === "sub" ? null : "sub"))
              }
            >
              <span>{selectBusinessSub?.categoryName || ""}</span>
              <img
                src="/assets/icons/arrow.svg"
                alt="화살표"
                className="arrow-img"
              />
              {showDropdown === "sub" && (
                <ul className="business-submenu">
                  {businessSubOptions[selectBusinessMain].map((sub) => (
                    <li
                      key={sub.categoryCode}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectBusinessSub(sub);
                        if (sub.categoryName === "선택") {
                          setSelectedCategoryCode(null);
                        } else {
                          setSelectedCategoryCode(sub.categoryCode);
                        }
                        setShowDropdown(null);
                      }}
                    >
                      <span>{sub.categoryName}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="Filter-line" />
        </div>

        {/* 매출액에 관한 내용, input을 통해 금액을 산정 */}
        <div className="Filter-sales-section">
          <div className="Filter-options-title">매출액 산정</div>
          <div className="sales-input-wrapper">
            {/*
              Separate input state for sales input.
            */}
            {(() => {
              return (
                <>
                  <input
                    className="sales-input"
                    type="number"
                    placeholder="원하는 매출액을 입력하세요."
                    value={inputSales}
                    onChange={(e) => setInputSales(e.target.value)}
                  />
                  <button
                    className="sales-button"
                    onClick={() => {
                      const value = Number(inputSales);
                      if (!isNaN(value)) {
                        setSalesInputTarget(value);
                        console.log("매출액 필터 값: ", value);
                      }
                    }}
                  >
                    <img
                      src="/assets/icons/arrow.svg"
                      alt="화살표"
                      className="sales-button-icon"
                    />
                  </button>
                </>
              );
            })()}
          </div>
        </div>

        {/* button을 통해 조건을 삭제 */}
        <button
          type="button"
          className="Filter-delete-button"
          onClick={() => handleClearFilters()}
        >
          조건 삭제
        </button>
      </div>
      <button
        className={`Filter-toggle-button ${
          isFilterVisible ? " visible" : " hidden"
        }`}
        onClick={() => {
          setIsFilterVisible((prev) => !prev);
        }}
      >
        {isFilterVisible ? "❮" : "❯"}
      </button>
    </>
  );
}

export default Filter;
