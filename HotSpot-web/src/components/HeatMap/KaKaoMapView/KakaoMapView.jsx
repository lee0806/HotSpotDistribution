import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useQuery } from "@tanstack/react-query";


// 유동인구 데이터 가져오는 hook
import {
  usePopulationData,
  useForecastPopulationData,
  useRentData,
} from "../../../hooks/useMarketData";

function KakaoMapView({
  setMap,
  setSelectedMarker, // 선택된 마커
  setSelectedId, // 선택된 마커 id
  setCurrentPopulation, // 현재 유동인구 값을 설정하는 함수
  populationType, // 현재 유동인구 타입 (과거 또는 예측)
  selectedFilterGender, // 필터에서 선택한 성별
  selectedFilterAgeGroup, // 필터에서 선택한 연령대
  selectedCategoryCode, // 선택된 카테고리
  selectedFilterMonth, // 필터에서 선택한 월
  selectedFilterDay, // 필터에서 선택한 주말과 평일
  selectedFilterMaxRent, // 선택된 최대 보증금
  salesInputTarget, // 매출액 입력값
}) {
  // 테스트 공간
  console.log("보증금 조건: ", selectedFilterMaxRent);
  console.log("선택된 연도: ", populationType);

  // 테스트 공간

  const AGE_GROUP_KEY_MAP = {
    "10대": "age_10",
    "20대": "age_20",
    "30대": "age_30",
    "40대": "age_40",
    "50대": "age_50",
    "60대 이상": "age_60",
  };

  const yearText = populationType;

  // areaId 상태 관리
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const populationTypeRef = useRef(populationType);

  useEffect(() => {
    populationTypeRef.current = populationType;
  }, [populationType]);

  const { data: rentData, isSuccess: rentSuccess } = useRentData();

  // 과거 유동인구 데이터를 받아옴 React Query를 사용
  const {
    data: populationPast,
    isLoading: loadingPast,
    errorPast,
  } = usePopulationData(selectedAreaId);

  // 예측 유동인구 데이터를 받아옴 React Query를 사용
  const {
    data: populationForecast,
    isLoading: loadingForecast,
    error: errorForecast,
  } = useForecastPopulationData(selectedAreaId);

  // 조건에 따라 사용할 데이터만 선택, 현재와 과거 유동인구를 선택하는 로직
  const population =
    populationType === "2024" ? populationPast : populationForecast;
  const populationLoading =
    populationType === "2024" ? loadingPast : loadingForecast;
  const error = populationType === "2024" ? errorPast : errorForecast;

  // 현재 유동인구 값을 설정하는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (population && population.dailyAveragePopulation) {
          setCurrentPopulation(population.dailyAveragePopulation);
          console.log("유동인구 값임: ", population);
        }
      } catch (error) {
        console.error("분석 리포트 유동인구 로딩하다가 에러남 ㅋㅋ", error);
      }
    };
    fetchData();
  }, [population]);

  if (populationLoading) {
    console.log("로딩 중임");
  }

  if (error) {
    console.error("와 이거 오류아님? ㅈ됨 ㅋㅋ", error);
  }

  const mapRef = useRef(null);

  // 상권데이터 불러오기, 좌표값 들어있음 (비동기 처리)
  const fetchCSV = async () => {
    const response = await axios.get("/data/상권데이터.csv");
    return response.data;
  };

  // react-query를 통해 csv 파일 불러옴
  const { data: csvText, isSuccess } = useQuery({
    queryKey: ["dobong-market-csv"],
    queryFn: fetchCSV,
  });

  CSSPageRule;

  // 브라우저 로드 되면 실행, 카카오맵 불러오기
  useEffect(() => {
    if (!isSuccess || !csvText) return;

    // csv 파싱해서 json으로 변환
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const areaIds = data.map((item) => item["상권_코드"]);

        // 유동인구 데이터를 가져오는 함수, 새롭게 요청을 해서 데이터를 받아옴, 유동인구 정보를 받고 각 계산을 거친 뒤 사용함, 월별 유동인구, 성별에 관한 필터, 나이에 관한 필터
        const fetchAllPopulationData = async (areaIds, selectedFilterMonth) => {
          const responses = await Promise.all(
            areaIds.map((areaId) => {
              const selectedYear = populationTypeRef.current;
              const endpoint = selectedYear === "2024" ? "history" : "forecast";
              const url = `https://hotspot-1cp7.onrender.com/areas/${areaId}/population/${endpoint}`;
              return axios
                .get(url)
                .then((res) => {
                  // 2024년 유동인 데이터만 필터링
                  const yearPrefix = populationTypeRef.current.toString();
                  const data = res.data.filter((item) =>
                    item.month.startsWith(yearPrefix)
                  );
                  const monthlyAverages = data.map((monthItem) => {
                    // 각 달의 유동인구 시간별 합계 계산
                    const total = monthItem.hourlyFlow.reduce(
                      (sum, h) => sum + h.value,
                      0
                    );
                    return total; // 각 달의 유동인구 합산
                  });

                  // 2024년 전체 유동인구 평균 계산
                  const overallAverage =
                    monthlyAverages.reduce((sum, val) => sum + val, 0) /
                    monthlyAverages.length;

                  // 2024년 남성 유동인구 전체 계산
                  const maleTotal =
                    data.reduce((sum, monthItem) => {
                      const genderData = monthItem.genderAgeFlow?.male || {};
                      const monthlyMale = Object.values(genderData).reduce(
                        (s, v) => s + Number(v),
                        0
                      );
                      return sum + monthlyMale;
                    }, 0) / data.length;

                  // 2024년 여성 유동인구 전체 계산
                  const femaleTotal =
                    data.reduce((sum, monthItem) => {
                      const genderData = monthItem.genderAgeFlow?.female || {};
                      const monthlyFemale = Object.values(genderData).reduce(
                        (s, v) => s + Number(v),
                        0
                      );
                      return sum + monthlyFemale;
                    }, 0) / data.length;

                  // 나이별 유동인구 평균 계산
                  const ageGroups = [
                    "10대",
                    "20대",
                    "30대",
                    "40대",
                    "50대",
                    "60대 이상",
                  ];
                  const ageGroupKeyMap = AGE_GROUP_KEY_MAP;

                  const ageGroupAverages = {};

                  // 각 나이대별 평균 계산, 모든 달에 해당하는 나이별 데이터를 취합
                  ageGroups.forEach((group) => {
                    const apiKey = ageGroupKeyMap[group];
                    const total = data.reduce((sum, monthItem) => {
                      const ageValue = monthItem.genderAgeFlow?.[apiKey] ?? 0;
                      return sum + Number(ageValue);
                    }, 0);
                    ageGroupAverages[group] = Math.round(total / data.length);
                  });

                  // 해당하는 달만 선택하여 유동인구를 계산
                  let selectedMonthTotal = 0;
                  let selectedMonthWeekendTotal = 0;
                  let selectedMonthWeekendMale = 0;
                  let selectedMonthWeekendFemale = 0;
                  let selectedMonthWeekdayTotal = 0;
                  let selectedMonthWeekdayMale = 0;
                  let selectedMonthWeekdayFemale = 0;
                  if (selectedFilterMonth) {
                    const monthNumber = selectedFilterMonth
                      .replace("월", "")
                      .padStart(2, "0");
                    const monthKey = `${yearPrefix}-${monthNumber}`;

                    const monthEntries = res.data.filter(
                      (item) => item.month === monthKey
                    );

                    monthEntries.forEach((entry) => {
                      const flowSum = entry.hourlyFlow.reduce(
                        (sum, h) => sum + h.value,
                        0
                      );
                      const maleSum = Object.values(
                        entry.genderAgeFlow?.male || {}
                      ).reduce((sum, v) => sum + Number(v), 0);
                      const femaleSum = Object.values(
                        entry.genderAgeFlow?.female || {}
                      ).reduce((sum, v) => sum + Number(v), 0);

                      if (entry.isWeekend === 1) {
                        selectedMonthWeekendTotal += flowSum;
                        selectedMonthWeekendMale += maleSum;
                        selectedMonthWeekendFemale += femaleSum;
                      } else {
                        selectedMonthWeekdayTotal += flowSum;
                        selectedMonthWeekdayMale += maleSum;
                        selectedMonthWeekdayFemale += femaleSum;
                      }
                    });

                    selectedMonthTotal =
                      selectedMonthWeekendTotal + selectedMonthWeekdayTotal;
                  }

                  // 주말과 평일 값
                  let weekendTotal = 0;
                  let weekdayTotal = 0;

                  res.data.forEach((entry) => {
                    const flowSum = entry.hourlyFlow.reduce(
                      (sum, h) => sum + h.value,
                      0
                    );
                    if (entry.isWeekend === 1) {
                      weekendTotal += flowSum;
                    } else {
                      weekdayTotal += flowSum;
                    }
                  });

                  return {
                    id: areaId,
                    total: Math.round(overallAverage),
                    male: Math.round(maleTotal),
                    female: Math.round(femaleTotal),
                    maleRatio:
                      maleTotal + femaleTotal === 0
                        ? 0.5
                        : maleTotal / (maleTotal + femaleTotal),
                    selectedMonthTotal,
                    selectedMonthWeekendTotal,
                    selectedMonthWeekendMale,
                    selectedMonthWeekendFemale,
                    selectedMonthWeekdayTotal,
                    selectedMonthWeekdayMale,
                    selectedMonthWeekdayFemale,
                    weekendTotal: Math.round(weekendTotal),
                    weekdayTotal: Math.round(weekdayTotal),
                    ...ageGroupAverages,
                  };
                })
                .catch(() => ({
                  id: areaId,
                  total: 0,
                  male: 0,
                  female: 0,
                  maleRatio: 0.5,
                  selectedMonthTotal: 0,
                  weekendTotal: 0,
                  weekdayTotal: 0,
                }));
            })
          );

          const map = {};

          let maxMonth = 0;
          if (selectedFilterMonth) {
            Object.values(responses).forEach((entry) => {
              if (entry.selectedMonthTotal > maxMonth) {
                maxMonth = entry.selectedMonthTotal;
              }
            });
          }
          const totalPopulationSum = responses.reduce(
            (sum, entry) => sum + entry.total,
            0
          );
          const averagePopulation = totalPopulationSum / responses.length;

          responses.forEach((entry) => {
            map[entry.id] = {
              ...entry,
              sizeCategory: selectedFilterMonth
                ? entry.selectedMonthTotal > maxMonth * 0.7
                  ? "large"
                  : "small"
                : entry.total > averagePopulation
                ? "large"
                : "small",
              maleRatio: selectedFilterMonth
                ? (() => {
                    return entry.maleRatio;
                  })()
                : entry.maleRatio,
            };
          });

          return map;
        };

        // 카테고리 데이터를 가져옴, 모든 상권를 조회해서  카테고리 코드와 이름을 가져옴
        const fetchAllCategoryData = async (areaIds) => {
          const responses = await Promise.all(
            areaIds.map((areaId) =>
              axios
                .get(`https://hotspot-1cp7.onrender.com/areas/${areaId}/sales`)
                .then((res) => {
                  return {
                    id: areaId,
                    categoryCodes: res.data.map((entry) => entry.categoryCode),
                    categoryNames: res.data.map((entry) => entry.categoryName),
                    quarters: res.data.flatMap((entry) => entry.quarters || []),
                  };
                })
                .catch(() => ({
                  id: areaId,
                  categoryCodes: ["unknown"],
                  categoryNames: ["기타"],
                }))
            )
          );
          const map = {};
          responses.forEach((entry) => {
            map[entry.id] = {
              categoryCodes: entry.categoryCodes || [],
              categoryNames: entry.categoryNames || [],
              quarters: entry.quarters || [],
            };
          });

          return map;
        };

        // 카카오맵 로드,
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(37.669, 127.046), // 도봉구 중심
              level: 4,
            };
            const map = new window.kakao.maps.Map(container, options); // 지도 생성
            mapRef.current = map; // mapRef에 현재 맵 객체 저장
            setMap(map); // 부모 컨포넌트에 map 객체 전달

            let currentOverlay = null;
            let currentOverlayCode = null;

            // 유동인구를 가져와 마커를 표시,, 유동인구 파트
            Promise.all([
              fetchAllPopulationData(
                areaIds,
                selectedFilterMonth,
                selectedFilterDay
              ),
              fetchAllCategoryData(areaIds),
            ]).then(([populationMap, categoryMap]) => {
              // 나이별 유동인구 5개
              let top5Ids = null;

              // 나이 필터에 관한 내용
              if (selectedFilterAgeGroup && selectedFilterAgeGroup.length > 0) {
                console.log("연령대 필터링 시작:", selectedFilterAgeGroup);

                const scoredEntries = Object.entries(populationMap).map(
                  ([id, entry]) => {
                    const score = selectedFilterAgeGroup.reduce(
                      (sum, group) => {
                        const apiKey = AGE_GROUP_KEY_MAP[group];
                        const value = entry[apiKey] ?? 0;
                        return sum + value;
                      },
                      0
                    );
                    return { id, score };
                  }
                );

                const top5 = scoredEntries
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((entry) => entry.id);

                top5Ids = new Set(top5);

                console.log("연령대 top5 상권 ID:", top5);
              }

              // 달 별 유동인구에 관한 내용
              let maxMonth = 0;
              if (selectedFilterMonth) {
                Object.values(populationMap).forEach((entry) => {
                  if (entry.selectedMonthTotal > maxMonth) {
                    maxMonth = entry.selectedMonthTotal;
                  }
                });
              }

              // 최대 보증금 필터링
              if (!rentSuccess || !rentData) return;
              const rentMap = {};
              rentData.forEach((item) => {
                rentMap[item.areaId] = item;
              });

              data.forEach((item) => {
                const code = item["상권_코드"];

                // 연령대 필터 top 5가 있는지 확인
                if (top5Ids && !top5Ids.has(code)) return;

                // 성별 필터가 있는지 확인
                const pop = populationMap[code];
                if (!pop) return;

                // KakaoMapView.jsx에서 보증금 필터링 부분 수정
                const rentInfo = rentMap[code];
                // 보증금 필터링 로직 개선
                const isInitialRentRange =
                  !selectedFilterMaxRent ||
                  !Array.isArray(selectedFilterMaxRent) ||
                  selectedFilterMaxRent.length !== 2 ||
                  (selectedFilterMaxRent[0] === 0 &&
                    selectedFilterMaxRent[1] === 200000);

                if (!isInitialRentRange) {
                  if (rentInfo) {
                    const avgRent = rentInfo.averageRent;
                    const [minRent, maxRent] = selectedFilterMaxRent;
                    if (avgRent < minRent || avgRent > maxRent) {
                      return;
                    }
                  } else {
                    return;
                  }
                }

                // 매출액 필터링 로직 (평균값 사용)
                // 버그 개많음 수정해야됨
                const category = categoryMap[code];
                const salesData = category?.quarters || [];
                const totalSalesArray = salesData
                  .map((q) => Number(q.totalSales))
                  .filter((v) => !isNaN(v));
                const totalSales =
                  totalSalesArray.length > 0
                    ? totalSalesArray.reduce((sum, val) => sum + val, 0) /
                      (totalSalesArray.length * 3)
                    : NaN;

                const parsedSalesTarget = Number(salesInputTarget);
                if (parsedSalesTarget > 0 && !isNaN(totalSales)) {
                  const min = parsedSalesTarget * 0.5;
                  const max = parsedSalesTarget * 1.5;
                  console.log(
                    `[매출 필터 검사] 상권: ${code}, 평균 매출: ${Math.round(
                      totalSales
                    ).toLocaleString()}원, 기준: ${parsedSalesTarget.toLocaleString()}원, 범위: ${min.toLocaleString()} ~ ${max.toLocaleString()}`
                  );
                  if (totalSales < min || totalSales > max) {
                    console.log("❌ 필터 범위 밖으로 제외됨");
                    return;
                  }
                  console.log("✅ 필터 통과");
                } else if (parsedSalesTarget === 0) {
                  console.log(`[매출 필터 검사] 상권: ${code}, 매출 필터 비활성화`);
                } else {
                  console.log("❌ 매출 데이터 없음 또는 숫자 변환 실패");
                  return;
                }

                if (selectedFilterGender === "남성" && pop.male <= pop.female) {
                  // 필터가 남성인데 여성의 유동인구가 더 많은 경우 마커를 표시하지 않음, 즉 리턴
                  return; // 남성 마커만 표시
                }

                // 필터가 여성인데 남성의 유동인구가 더 많은 경우 마커를 표시하지 않음, 즉 리턴
                if (selectedFilterGender === "여성" && pop.female <= pop.male) {
                  return; // 여성 마커만 표시
                }

                // (월별 최대 유동인구 top5 필터 제거: 모든 지역 표시)

                // 카테고리 필터링, 선택된 카테고리 코드가 있는지 확인
                if (
                  selectedCategoryCode &&
                  selectedCategoryCode !== "선택" &&
                  selectedCategoryCode !== "CS100000" &&
                  !category?.categoryCodes?.includes(selectedCategoryCode)
                ) {
                  return;
                }

                // 위경도 좌표를 그림
                const lat = parseFloat(item["위도(WGS84)"]);
                const lng = parseFloat(item["경도(WGS84)"]);

                // 마커 이미지 경로 설정, 남자와 여자 이미지 다르게
                let markerImageSrc = "";
                if (selectedFilterGender === "남성") {
                  markerImageSrc = "/assets/images/marker_man.png";
                } else if (selectedFilterGender === "여성") {
                  markerImageSrc = "/src/assets/images/marker.png";
                } else if (pop) {
                  const male = Number(pop.male);
                  const female = Number(pop.female);

                  if (male > female) {
                    markerImageSrc = "/assets/images/marker_man.png";
                  } else {
                    markerImageSrc = "/assets/images/marker.png";
                  }
                }

                const imageSize =
                  pop.sizeCategory === "large"
                    ? new window.kakao.maps.Size(150, 150)
                    : new window.kakao.maps.Size(100, 100);
                const markerImage = new window.kakao.maps.MarkerImage(
                  markerImageSrc,
                  imageSize
                );

                if (!isNaN(lat) && !isNaN(lng)) {
                  const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                  const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    map: map,
                    title: item["상권_코드_명_x"],
                    image: markerImage,
                  });

                  marker.addListener("click", async () => {
                    const code = item["상권_코드"];

                    if (currentOverlay && currentOverlayCode === code) {
                      currentOverlay.setMap(null);
                      currentOverlay = null;
                      currentOverlayCode = null;
                      return;
                    }

                    if (currentOverlay) {
                      currentOverlay.setMap(null);
                    }

                    try {
                      // 유동인구 정보 표시 텍스트
                      const popData = populationMap[code];
                      let populationText = "";
                      if (selectedFilterMonth && selectedFilterDay === "주말") {
                        populationText = `<div style="margin-top: 6px;">
                          총 유동인구(${selectedFilterMonth} 주말): ${Math.round(
                          popData?.selectedMonthWeekendTotal || 0
                        ).toLocaleString()}명<br/>
                          남성: ${Math.round(
                            popData?.selectedMonthWeekendMale || 0
                          ).toLocaleString()}명<br/>
                          여성: ${Math.round(
                            popData?.selectedMonthWeekendFemale || 0
                          ).toLocaleString()}명
                        </div>`;
                      } else if (
                        selectedFilterMonth &&
                        selectedFilterDay === "평일"
                      ) {
                        populationText = `<div style="margin-top: 6px;">
                          총 유동인구(${selectedFilterMonth} 평일): ${Math.round(
                          popData?.selectedMonthWeekdayTotal || 0
                        ).toLocaleString()}명<br/>
                          남성: ${Math.round(
                            popData?.selectedMonthWeekdayMale || 0
                          ).toLocaleString()}명<br/>
                          여성: ${Math.round(
                            popData?.selectedMonthWeekdayFemale || 0
                          ).toLocaleString()}명
                        </div>`;
                      } else if (selectedFilterMonth) {
                        populationText = `<div style="margin-top: 6px;">
                            총 유동인구(${selectedFilterMonth}): ${Math.round(
                          popData?.selectedMonthTotal || 0
                        ).toLocaleString()}명
                            <br/>
                            남성: ${Math.round(popData?.male || 0).toLocaleString()}명<br/>
                            여성: ${Math.round(popData?.female || 0).toLocaleString()}명
                          </div>`;
                      } else if (selectedFilterDay === "주말") {
                        populationText = `<div style="margin-top: 6px;">
                            총 유동인구(주말): ${Math.round(
                              popData?.weekendTotal || 0
                            ).toLocaleString()}명
                            <br/>
                            남성: ${Math.round(popData?.male || 0).toLocaleString()}명<br/>
                            여성: ${Math.round(popData?.female || 0).toLocaleString()}명
                          </div>`;
                      } else if (selectedFilterDay === "평일") {
                        populationText = `<div style="margin-top: 6px;">
                            총 유동인구(평일): ${Math.round(
                              popData?.weekdayTotal || 0
                            ).toLocaleString()}명
                            <br/>
                            남성: ${Math.round(popData?.male || 0).toLocaleString()}명<br/>
                            여성: ${Math.round(popData?.female || 0).toLocaleString()}명
                          </div>`;
                      } else {
                        populationText = `<div style="margin-top: 6px;">
                            총 유동인구(평균): ${Math.round(
                              popData?.total || 0
                            ).toLocaleString()}명
                            <br/>
                            남성: ${Math.round(popData?.male || 0).toLocaleString()}명<br/>
                            여성: ${Math.round(popData?.female || 0).toLocaleString()}명
                          </div>`;
                      }
                      const content = `<div style="
                        padding: 6px 12px;
                        background: white;
                        border: 1px solid #ccc;
                        border-radius: 6px;
                        font-size: 14px;
                        margin-bottom: 100px;
                        box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                        font-family: 'Pretendard', sans-serif;">
                        <div style="font-weight: 700;">${item["상권_코드_명_x"]}</div>
                        <div style="position: absolute; top: 6px; right: 6px; font-size: 12px; color: gray;">
                          ${yearText}
                        </div>
                        
                        ${populationText.toLocaleString()}
                        
                      </div>`;

                      const newOverlay = new window.kakao.maps.CustomOverlay({
                        content,
                        position: markerPosition,
                        yAnchor: 1,
                      });

                      newOverlay.setMap(map);
                      currentOverlay = newOverlay;
                      currentOverlayCode = code;
                    } catch (error) {
                      console.error("유동인구 데이터 못찾음", error);
                    }

                    // 마커 클릭 시 변동되는 정보 제공,, 공통 부분
                    setSelectedMarker(item["상권_코드_명_x"]);
                    setSelectedAreaId(code);
                    setSelectedId(code);
                  });
                }
              });
            });
          });
        }
      },
    });
  }, [
    csvText,
    isSuccess,
    rentSuccess,
    rentData,
    populationType,
    selectedFilterGender,
    selectedFilterAgeGroup,
    selectedCategoryCode,
    selectedFilterMonth,
    selectedFilterDay,
    selectedFilterMaxRent,
    salesInputTarget,
  ]);

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "calc(100vh - 64px)",
        position: "absolute",
        top: "64px",
        left: 0,
        zIndex: 1,
      }}
    ></div>
  );
}

export default KakaoMapView;
