import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {
  useOpenCloseData,
  useCategoryData,
  usePopulationData,
  useForecastPopulationData,
  useSalesCategoryData,
  useSalesByTimeData,
  useSalesByDayData,
  useAgeSalesData,
  useGenderSalesData,
  useTotalSalesData,
  useRentData,
} from "../../../hooks/useMarketData";

import "../../../styles/components/HeatMap/Analysis/Analysis.css";

function Analysis({ selectedMarker, selectedId }) {
  // 분석 리포트 보이기/숨기기
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(true);

  // 일평균 과거 유동인구 값
  const [currentPopulation, setCurrentPopulation] = useState(null);

  // 일 평균 미래 유동인구 값
  const [forecastPopulation, setForecastPopulation] = useState(null);

  // 월별 과거 유동인구 값
  const [currentMonthFlow, setCurrentMonthFlow] = useState([]);

  // 월별 미래 유동인구 값
  const [forecastMonthFlow, setForecastMonthFlow] = useState([]);

  // 업종별 매출 순위 데이터
  const [salesRankChartData, setSalesRankChartData] = useState(null);

  // 시간대별 매출 데이터
  const [salesByTimeData, setSalesByTimeData] = useState(null);

  // 요일별 매출 데이터
  const [salesByDayData, setSalesByDayData] = useState(null);

  // 연령별 매출 데이터
  const [ageSalesData, setAgeSalesData] = useState(null);

  // 성별 매출 데이터
  const [genderSalesData, setGenderSalesData] = useState(null);

  // 평균 임대료 데이터
  const [rentData, setRentData] = useState(null);

  // 전체 평균 매출 데이터
  const [totalSalesData, setTotalSalesData] = useState(null);

  // 현재 마커에 개폐업률 데이터를 받아옴 React Query를 사용
  const {
    data: openCloseData,
    isLoading: openCloseLoading,
    error: openCloseError,
  } = useOpenCloseData(selectedId);

  // 로딩 중과 에러 처리
  if (openCloseLoading) {
    console.log("분석 리포트 개폐업률 데이터 로딩 중");
  }

  if (openCloseError) {
    console.error("분석 리포트 개폐업률 데이터 오류임: ", openCloseError);
  }

  // 과거 유동인구 데이터를 받아옴 React Query를 사용
  const {
    data: population,
    isLoading: populationLoading,
    error,
  } = usePopulationData(selectedId);

  // 로딩 중과 에러 처리
  if (populationLoading) {
    console.log("분석 리포트 유동인구 값 로딩 중");
  }

  if (error) {
    console.error("분석 리포트 유동인구 값 오류임: ", error);
  }

  // 미래 유동인구 데이터를 받아옴 React Query를 사용
  const {
    data: populationForecast,
    isLoading: populationForecastLoading,
    errorForecast,
  } = useForecastPopulationData(selectedId);

  // 로딩 중과 에러 처리
  if (populationForecastLoading) {
    console.log("분석 리포트 예측 유동인구 값 로딩 중");
  }
  if (errorForecast) {
    console.error("분석 리포트 예측 유동인구 값 오류임: ", errorForecast);
  }

  // 업종별 매출 데이터를 받아옴 React Query를 사용
  const {
    data: salesDataRaw,
    isLoading: salesDataLoading,
    error: errorSales,
  } = useSalesCategoryData(selectedId);

  // 로딩 중과 에러 처리
  if (salesDataLoading) {
    console.log("분석 리포트 업종별 매출 순위 값 로딩 중");
  }

  if (errorSales) {
    console.error("분석 리포트 업종별 매출 순위 값 오류임: ", errorSales);
  }

  // 시간대별 매출 데이터를 받아옴 React Query를 사용
  const {
    data: timeSalesDataRaw,
    isLoading: timeSalesDataLoading,
    error: errorTimeSales,
  } = useSalesByTimeData(selectedId);

  // 로딩 중과 에러 처리
  if (timeSalesDataLoading) {
    console.log("분석 리포트 시간대별 매출 데이터 로딩 중");
  }

  if (errorTimeSales) {
    console.error("분석 리포트 시간대별 매출 데이터 오류임: ", errorTimeSales);
  }

  // 요일별 매출 데이터를 받아옴 React Query를 사용
  const {
    data: salesByDayDataRaw,
    isLoading: salesByDayDataLoading,
    error: errorSalesByDay,
  } = useSalesByDayData(selectedId);

  if (salesByDayDataLoading) {
    console.log("분석 리포트 요일별 매출 데이터 로딩 중");
  }
  if (errorSalesByDay) {
    console.error("분석 리포트 요일별 매출 데이터 오류임: ", errorSalesByDay);
  }

  // 연령별 매출 데이터를 받아옴 React Query를 사용
  const {
    data: ageSalesDataRaw,
    isLoading: ageSalesDataLoading,
    error: errorAgeSales,
  } = useAgeSalesData(selectedId);

  if (ageSalesDataLoading) {
    console.log("분석 리포트 연령별 매출 데이터 로딩 중");
  }
  if (errorAgeSales) {
    console.error("분석 리포트 연령별 매출 데이터 오류임: ", errorAgeSales);
  }

  // 성별 매출 데이터를 받아옴 React Query를 사용
  const {
    data: genderSalesDataRaw,
    isLoading: genderSalesDataLoading,
    error: errorGenderSales,
  } = useGenderSalesData(selectedId);

  if (genderSalesDataLoading) {
    console.log("분석 리포트 성별 매출 데이터 로딩 중");
  }

  if (errorGenderSales) {
    console.error("분석 리포트 성별 매출 데이터 오류임: ", errorGenderSales);
  }

  // 평균 임대료 데이터를 받아옴 React Query를 사용
  const {
    data: rentDataRaw,
    isLoading: rentDataLoading,
    error: errorRentData,
  } = useRentData(selectedId);

  if (rentDataLoading) {
    console.log("분석 리포트 평균 임대료 데이터 로딩 중");
  }

  if (errorRentData) {
    console.error("분석 리포트 평균 임대료 데이터 오류임: ", errorRentData);
  }

  // 전체 평균 매출 데이터를 받아옴 React Query를 사용
  const {
    data: totalSalesDataRaw,
    isLoading: totalSalesDataLoading,
    error: errorTotalSales,
  } = useTotalSalesData(selectedId);

  if (totalSalesDataLoading) {
    console.log("분석 리포트 전체 평균 매출 데이터 로딩 중");
  }

  if (errorTotalSales) {
    console.error(
      "분석 리포트 전체 평균 매출 데이터 오류임: ",
      errorTotalSales
    );
  }

  // 현재 유동인구 값을 설정하는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (population && population.dailyAveragePopulation) {
          setCurrentPopulation(population.dailyAveragePopulation);
        }
      } catch (error) {
        console.error("분석 리포트 유동인구 로딩하다가 에러남 ㅋㅋ", error);
      }
    };
    fetchData();
  }, [population]);

  // 업종별 분포 데이터 가공
  const industryData = useMemo(() => {
    if (!openCloseData) return [];
    return openCloseData.map((item) => ({
      name: item.categoryName,
      value: item.totalStores,
    }));
  }, [openCloseData]);

  // 업종별 분포 데이터에서 가장 많은 업종 찾기
  const topIndustry = industryData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    { name: "", value: 0 }
  );

  // 미래 유동인구 값을 설정하는 useEffect
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        if (populationForecast && populationForecast.dailyAveragePopulation) {
          setForecastPopulation(populationForecast.dailyAveragePopulation);
        }
      } catch (error) {
        console.error(
          "분석 리포트 예측 유동인구 로딩하다가 에러남 ㅋㅋ",
          error
        );
      }
    };
    fetchForecastData();
  }, [populationForecast]);

  // 시간대별 매출 데이터 가공
  useEffect(() => {
    if (timeSalesDataRaw) {
      const combinedHourly = [0, 0, 0, 0, 0, 0]; // 시간대별 매출 합산용
      let totalQuarterCount = 0;

      timeSalesDataRaw.forEach((category) => {
        category.quarters.forEach((quarter) => {
          totalQuarterCount += 1;
          const sales = quarter.salesByTime || {};
          const indexMap = {
            "00_06": 0,
            "06_11": 1,
            "11_14": 2,
            "14_17": 3,
            "17_21": 4,
            "21_24": 5,
          };
          Object.entries(sales).forEach(([key, value]) => {
            const index = indexMap[key];
            if (index !== undefined) {
              combinedHourly[index] += value;
            }
          });
        });
      });

      const categoryCount = timeSalesDataRaw.length;
      const avgHourly = combinedHourly.map((v) =>
        totalQuarterCount > 0 && categoryCount > 0
          ? Math.round(v / totalQuarterCount / categoryCount)
          : 0
      );

      setSalesByTimeData(avgHourly);
    }
  }, [timeSalesDataRaw]);

  // 요일별 매출 데이터 가공
  useEffect(() => {
    if (salesByDayDataRaw) {
      const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      const totalByDay = {
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0,
      };
      let count = 0;

      salesByDayDataRaw.forEach((category) => {
        category.quarters.forEach((quarter) => {
          if (quarter.salesByDay) {
            dayKeys.forEach((key) => {
              totalByDay[key] += quarter.salesByDay[key] || 0;
            });
            count++;
          }
        });
      });

      const averageByDay = dayKeys.map((key) =>
        count > 0 ? Math.round(totalByDay[key] / count) : 0
      );
      setSalesByDayData(averageByDay);
    }
  }, [salesByDayDataRaw]);

  // 연령별 매출 데이터 가공
  useEffect(() => {
    if (ageSalesDataRaw) {
      const ageGroups = [
        "age_10",
        "age_20",
        "age_30",
        "age_40",
        "age_50",
        "age_60",
      ];
      const totalByAge = {
        age_10: 0,
        age_20: 0,
        age_30: 0,
        age_40: 0,
        age_50: 0,
        age_60: 0,
      };
      let count = 0;

      ageSalesDataRaw.forEach((category) => {
        category.quarters.forEach((quarter) => {
          if (quarter.ageSales) {
            ageGroups.forEach((key) => {
              totalByAge[key] += quarter.ageSales[key] || 0;
            });
            count++;
          }
        });
      });
      const averageByAge = ageGroups.map((key) =>
        count > 0 ? Math.round(totalByAge[key] / count) : 0
      );
      setAgeSalesData(averageByAge);
    }
  }, [ageSalesDataRaw]);

  // 성별 매출 데이터 가공
  useEffect(() => {
    if (genderSalesDataRaw && Array.isArray(genderSalesDataRaw)) {
      let totalMale = 0;
      let totalFemale = 0;

      genderSalesDataRaw.forEach((category) => {
        category.quarters?.forEach((quarter) => {
          const gender = quarter.genderSales || {};
          totalMale += gender.male || 0;
          totalFemale += gender.female || 0;
        });
      });

      setGenderSalesData([
        { name: "남성", value: totalMale },
        { name: "여성", value: totalFemale },
      ]);
    }
  }, [genderSalesDataRaw]);

  // 평균 임대료 데이터 가공 (선택된 지역만 집계)
  useEffect(() => {
    if (rentDataRaw && Array.isArray(rentDataRaw)) {
      const target = rentDataRaw.find((area) => area.areaId === selectedId);
      if (!target || !target.monthlyRents) {
        setRentData([]);
        return;
      }

      const rentByQuarter = Object.entries(target.monthlyRents).map(
        ([quarter, value]) => ({
          name: quarter,
          value: Math.round(value),
        })
      );

      rentByQuarter.sort((a, b) => a.name.localeCompare(b.name));
      setRentData(rentByQuarter);
    }
  }, [rentDataRaw, selectedId]);

  // 전체 평균 매출 데이터 가공: 모든 분기 매출을 합산하여 월평균 매출 (정확하게 분기별, 업종별로 합산)
  useEffect(() => {
    if (totalSalesDataRaw && Array.isArray(totalSalesDataRaw)) {
      let monthlySum = 0;
      let monthlyCount = 0;

      totalSalesDataRaw.forEach((category) => {
        category.quarters?.forEach((quarter) => {
          if (typeof quarter.totalSales === "number") {
            monthlySum += quarter.totalSales;
            monthlyCount += 3; // each quarter is 3 months
          }
        });
      });

      const monthlyAvg =
        monthlyCount > 0 ? Math.round(monthlySum / monthlyCount / 10000) : 0;
      setTotalSalesData(monthlyAvg);
    }
  }, [totalSalesDataRaw]);

  // 그래프를 그리기 위한 useEffect
  // 과거 유동인구 월별 데이터
  useEffect(() => {
    if (population?.monthlyData) {
      const values = population.monthlyData.map((month) =>
        Math.round(month.hourlyFlow.reduce((sum, h) => sum + h.value, 0) / 24)
      );
      setCurrentMonthFlow(values);
    }
  }, [population]);

  // 그래프를 그리기 위한 useEffect
  // 미래 유동인구 월별 데이터
  useEffect(() => {
    if (populationForecast?.monthlyData) {
      const values = populationForecast.monthlyData.map((month) =>
        Math.round(month.hourlyFlow.reduce((sum, h) => sum + h.value, 0) / 24)
      );
      setForecastMonthFlow(values);
    }
  }, [populationForecast]);

  // 업종별 매출 순위 데이터 가공
  const salesRankData = useMemo(() => {
    if (!salesDataRaw) return [];
    return salesDataRaw
      .map((item) => ({
        name: item.categoryName,
        value: item.quarters.reduce((sum, q) => sum + q.totalSales, 0),
      }))
      .sort((a, b) => b.value - a.value);
  }, [salesDataRaw]);

  // 성별 비율 데이터
  const genderData = population
    ? [
        { name: "남성", value: population.male },
        { name: "여성", value: population.female },
      ]
    : [
        { name: "남성", value: 0 },
        { name: "여성", value: 0 },
      ];

  // 시간대별 매출 데이터
  // 시간대별 매출 데이터 (실제 데이터 반영)
  const hourlyData = useMemo(() => {
    const labels = ["00~06", "06~11", "11~14", "14~17", "17~21", "21~24"];
    if (!salesByTimeData)
      return labels.map((label) => ({ name: label, value: 0 }));
    return labels.map((label, i) => ({
      name: label,
      value: salesByTimeData[i],
    }));
  }, [salesByTimeData]);

  // 요일별 매출 데이터
  const dayData = useMemo(() => {
    const labels = [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ];
    if (!salesByDayData)
      return labels.map((label) => ({ name: label, value: 0 }));
    return labels.map((label, i) => ({
      name: label,
      value: salesByDayData[i] || 0,
    }));
  }, [salesByDayData]);

  //연령대별 매출 데이터
  const ageData = useMemo(() => {
    const labels = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
    if (!ageSalesData)
      return labels.map((label) => ({ name: label, value: 0 }));
    return labels.map((label, i) => ({
      name: label,
      value: ageSalesData[i] || 0,
    }));
  }, [ageSalesData]);

  // 매출 데이터 (분기별 평균 매출 및 월별 환산)
  const salesData = useMemo(() => {
    if (!totalSalesDataRaw) return [];

    const salesByQuarter = {};

    totalSalesDataRaw.forEach((category) => {
      category.quarters?.forEach((quarter) => {
        const q = quarter.quarter;
        if (!salesByQuarter[q]) {
          salesByQuarter[q] = 0;
        }
        salesByQuarter[q] += quarter.totalSales || 0;
      });
    });

    const categoryCount = totalSalesDataRaw.length;
    const salesData = Object.entries(salesByQuarter).map(([quarter, value]) => {
      const avgQuarterSales =
        categoryCount > 0 ? Math.round(value / categoryCount) : 0;
      return {
        name: quarter,
        value: avgQuarterSales, // 분기 매출 / 3개월 = 월평균
      };
    });

    return salesData.sort((a, b) => a.name.localeCompare(b.name)); // 순서 정렬
  }, [totalSalesDataRaw]);

  // 업종별 분포 차트 데이터
  const industryPieData = {
    labels: industryData.map((item) => item.name),
    datasets: [
      {
        label: "업종별 분포",
        data: industryData.map((item) => item.value),
      },
    ],
  };

  // 유동인구 차트 데이터: X축 5개, 현재/예측 유동인구 비교
  const populationLineData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "현재 유동인구 (2024)",
        data: currentMonthFlow,
        borderColor: "#007bff",
        backgroundColor: "#007bff",
        tension: 0.4,
      },
      {
        label: "예측 유동인구 (2025)",
        data: forecastMonthFlow,
        borderColor: "#fdaba2",
        backgroundColor: "#fdaba2",
        tension: 0.4,
      },
    ],
  };
  // 성별 비율 차트 데이터
  const genderPieData = {
    labels: genderData.map((item) => item.name),
    datasets: [
      {
        label: "이용 성별 유동인구",
        data: genderData.map((item) => item.value),
        backgroundColor: ["#007bff", "#fdaba2"],
      },
    ],
  };

  // 업종별 매출 순위 차트 데이터
  useEffect(() => {
    if (salesRankData.length > 0) {
      const salesRankChartData = {
        labels: salesRankData.map((item) => item.name),
        datasets: [
          {
            label: "업종별 매출",
            data: salesRankData.map((item) => item.value),
            backgroundColor: salesRankData.map((_, idx) =>
              idx === 0 ? "#fdaba2" : "#007bff"
            ),
          },
        ],
      };
      setSalesRankChartData(salesRankChartData);
    }
  }, [salesRankData]);

  const maxHourly = Math.max(...(salesByTimeData || []));
  const hourlyLabels = ["00~06", "06~11", "11~14", "14~17", "17~21", "21~24"];
  // 시간대별 매출 차트 데이터
  const hourlyBarData = {
    labels: hourlyData.map((item) => item.name),
    datasets: [
      {
        label: "시간대별 매출",
        data: hourlyData.map((item) => item.value),
        backgroundColor: hourlyData.map((item) =>
          item.value === maxHourly ? "#fdaba2" : "#007bff"
        ),
      },
    ],
  };

  const maxDay = Math.max(...(salesByDayData || []));
  const dayLabels = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];
  // 요일별 매출 차트 데이터
  const dayBarData = {
    labels: dayData.map((item) => item.name),
    datasets: [
      {
        label: "요일별 매출",
        data: dayData.map((item) => item.value),
        backgroundColor: dayData.map((item) =>
          item.value === maxDay ? "#fdaba2" : "#007bff"
        ),
      },
    ],
  };

  const maxAge = Math.max(...(ageSalesData || []));
  const ageLabels = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
  // 연령별 매출 차트 데이터
  const ageBarData = {
    labels: ageData.map((item) => item.name),
    datasets: [
      {
        label: "연령별 매출",
        data: ageData.map((item) => item.value),
        backgroundColor: ageData.map((item) =>
          item.value === maxAge ? "#fdaba2" : "#007bff"
        ),
      },
    ],
  };

  // 성별 비율 차트 데이터
  const maxGender = Math.max(
    ...(Array.isArray(genderSalesData)
      ? genderSalesData.map((item) => item.value)
      : [])
  );

  // 성별 비율 차트 데이터
  const genderSalesPieData = {
    labels: Array.isArray(genderSalesData)
      ? genderSalesData.map((item) => item.name)
      : [],
    datasets: [
      {
        label: "이용 성별 매출",
        data: Array.isArray(genderSalesData)
          ? genderSalesData.map((item) => item.value)
          : [],
        backgroundColor: Array.isArray(genderSalesData)
          ? genderSalesData.map((item) =>
              item.value === maxGender ? "#007bff" : "#fdaba2"
            )
          : [],
      },
    ],
  };

  // 평균 임대료 차트 데이터
  const rentLineData = {
    labels: Array.isArray(rentData) ? rentData.map((item) => item.name) : [],
    datasets: [
      {
        label: "평균 임대료",
        data: Array.isArray(rentData) ? rentData.map((item) => item.value) : [],
      },
    ],
  };

  // 평균 임대료 텍스트 계산 (useMemo)
  const averageRentText = useMemo(() => {
    if (!rentData || rentData.length === 0) return "-";
    const validItems = rentData.filter(
      (item) => typeof item.value === "number" && item.value > 0
    );
    if (validItems.length === 0) return "-";
    const sum = validItems.reduce((acc, item) => acc + item.value, 0);
    const avg = Math.round(sum / validItems.length / 10000);
    return `${avg.toLocaleString()}만원`;
  }, [rentData]);

  // 평균 매출액 차트 데이터

  const salesLineData = {
    labels: salesData.map((item) => item.name),
    datasets: [
      {
        label: "평균 매출",
        data: salesData.map((item) => item.value),
        borderColor: "#007bff",
        backgroundColor: "#007bff",
      },
    ],
  };

  if (!selectedId) return null;

  return (
    <>
      <div
        className={`Analysis-container${isAnalysisVisible ? "" : " hidden"}`}
      >
        {/* 분석 리포트 제목 */}
        <div className="Analysis-report-title">
          분석 리포트 {`${selectedMarker}`} {`${selectedId}`}
        </div>

        <div className="Analysis-section">
          <div className="Analysis-section-title">종합 평가</div>
          <div
            className="Analysis-additional-all"
            style={{
              fontWeight: 500,
              backgroundColor: "rgba(209, 209, 209, 0.33)",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: "18px" }}>
              해당 지역에 대한 종합 평가 입니다.
            </p>
            <p>
              ●&nbsp;유동인구는&nbsp;
              <span style={{ fontWeight: 800, color: "#F28080" }}>
                {currentPopulation > forecastPopulation
                  ? "감소할 것"
                  : "증가할 것"}{" "}
              </span>
              으로 예상됩니다.
            </p>
            <p>
              ●&nbsp;
              <span style={{ fontWeight: 800, color: "#F28080" }}>
                {dayLabels[(salesByDayData || []).indexOf(maxDay)]}
              </span>
              &nbsp;에 매출이 가장 높아요. 이날에 유리한 업종을 고려해보세요.
            </p>
            <p>
              ●&nbsp;평당 임대료는&nbsp;
              <span style={{ fontWeight: 800, color: "#F28080" }}>
                {averageRentText.toLocaleString()}
              </span>
              &nbsp;이며 매출액은&nbsp;
              <span style={{ fontWeight: 800, color: "#F28080" }}>
                {totalSalesData !== null
                  ? `${totalSalesData.toLocaleString()}만원`
                  : "-"}
              </span>
              &nbsp;입니다.
            </p>
          </div>
        </div>

        {/* 업종별 분포 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">업종별 분포</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">{topIndustry.name}&nbsp;</div>
            <div className="type-description">이 가장 많습니다.</div>
          </div>

          <div className="Analysis-additional-description">
            해당 지역의 업종별 분포를 분석한 결과입니다. 가장 높은 비중을
            차지하는 업종은 유의하세요.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 업종별 분포 차트 */}
            <Pie data={industryPieData} key={JSON.stringify(industryPieData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 유동인구 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">유동인구 분석</div>

          <div className="Analysis-type-main">
            <div className="type-description">유동인구 수는 일 평균</div>
            <span className="type-highlight">
              &nbsp;
              {currentPopulation !== null ? `${currentPopulation.toLocaleString()}명` : "-"}
              &nbsp;
            </span>
            <div className="type-description">이고 앞으로</div>
            <div className="type-highlight">
              &nbsp;
              {forecastPopulation !== null ? `${forecastPopulation.toLocaleString()}명` : "-"}
              &nbsp;
            </div>
            <div className="type-description">으로</div>
            <div className="type-highlight">
              &nbsp;
              {currentPopulation > forecastPopulation
                ? "감소할 것"
                : "증가할 것"}
              &nbsp;
            </div>
            <div className="type-description">으로 예측됩니다.</div>
          </div>

          <div className="Analysis-additional-description">
            해당 지역의 유동인구를 분석한 결과입니다. 향후 유동인구를 고려해
            준비해야합니다.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 유동인구 분석 차트 */}
            <Line
              data={populationLineData}
              key={JSON.stringify(populationLineData)}
            />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 이용 성별 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">이용 성별 비율</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {population && population.male > population.female
                ? "남성"
                : "여성"}
              &nbsp;
            </div>
            <div className="type-description">의 이용이 가장 많아요.</div>
          </div>

          <div className="Analysis-additional-description">
            {population && population.male > population.female
              ? "남성"
              : "여성"}{" "}
            고객이 가장 많은 지역 입니다.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 이용 성별 차트 */}
            {population ? (
              <Pie data={genderPieData} key={JSON.stringify(genderPieData)} />
            ) : (
              <p>데이터 불러오는 중...</p>
            )}
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 업종별 매출 순위 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">업종별 매출 순위</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {salesRankData.length > 0 ? salesRankData[0].name : "업종"}&nbsp;
            </div>
            <div className="type-description">매출이 가장 높아요.</div>
          </div>

          <div className="Analysis-additional-description">
            {salesRankData.length > 0 ? salesRankData[0].name : "업종"}의 매출
            순위가 가장 높아요.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 시간대별 매출 분석 차트 */}
            {salesRankChartData ? (
              <Bar
                data={salesRankChartData}
                key={JSON.stringify(salesRankChartData)}
              />
            ) : (
              <p>데이터 준비중</p>
            )}
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 시간대별 매출 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">시간대별 매출 분석</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {hourlyLabels[(salesByTimeData || []).indexOf(maxHourly)]}
              &nbsp;
            </div>
            <div className="type-description">매출이 가장 높아요.</div>
          </div>

          <div className="Analysis-additional-description">
            {hourlyLabels[(salesByTimeData || []).indexOf(maxHourly)]}시 이용
            고객이 가장 많은 지역 입니다. 외식업을 고려 해보세요.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 시간대별 매출 분석 차트 */}
            <Bar data={hourlyBarData} key={JSON.stringify(hourlyBarData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 요일별 매출 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">요일별 매출 분석</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {dayLabels[(salesByDayData || []).indexOf(maxDay)]}
              &nbsp;
            </div>
            <div className="type-description">매출이 가장 높아요.</div>
          </div>

          <div className="Analysis-additional-description">
            {dayLabels[(salesByDayData || []).indexOf(maxDay)]}에 매출이 가장
            높습니다.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 시간대별 매출 분석 차트 */}
            <Bar data={dayBarData} key={JSON.stringify(dayBarData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 연령별 매출 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">연령별 매출 분석</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {ageLabels[(ageSalesData || []).indexOf(maxAge)]}&nbsp;
            </div>
            <div className="type-description">매출이 가장 높아요.</div>
          </div>

          <div className="Analysis-additional-description">
            직장인이 많아 {ageLabels[(ageSalesData || []).indexOf(maxAge)]}{" "}
            매출이 가장 높습니다.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 시간대별 매출 분석 차트 */}
            <Bar data={ageBarData} key={JSON.stringify(ageBarData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 성별 매출 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">성별 매출 분석</div>

          <div className="Analysis-type-main">
            <div className="type-highlight">
              {
                (genderSalesData || []).find((item) => item.value === maxGender)
                  ?.name
              }
              &nbsp;
            </div>
            <div className="type-description">이 가장 많은 돈을 사용해요.</div>
          </div>

          <div className="Analysis-additional-description">
            {
              (genderSalesData || []).find((item) => item.value === maxGender)
                ?.name
            }{" "}
            고객의 소비가 많은 지역 입니다.{" "}
            {
              (genderSalesData || []).find((item) => item.value === maxGender)
                ?.name
            }
            이 좋아하는 요식업을 준비해보세요.
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 이용 성별 차트 */}
            <Pie
              data={genderSalesPieData}
              key={JSON.stringify(genderSalesPieData)}
            />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 평균 임대료 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">평균 임대료</div>

          <div className="Analysis-type-main">
            <div className="type-description">평균 임대료는 1평당 </div>
            <div className="type-highlight">
              &nbsp;
              {averageRentText}
              &nbsp;
            </div>
            <div className="type-description">입니다.</div>
          </div>

          {/* <div className="Analysis-additional-description">
            2개월 뒤 평균 임대로는 약 3% 상승 예정입니다.
          </div> */}

          <div className="Analysis-chart">
            {" "}
            {/* 이용 성별 차트 */}
            <Line data={rentLineData} key={JSON.stringify(rentLineData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        {/* 평균 매출액 분석 내용 */}
        <div className="Analysis-section">
          <div className="Analysis-section-title">평균 매출액</div>

          <div className="Analysis-type-main">
            <div className="type-description">평균 매출액은</div>
            <div className="type-highlight">
              &nbsp;
              {totalSalesData !== null
                ? `${totalSalesData.toLocaleString()}만원`
                : "-"}
              &nbsp;
            </div>
            <div className="type-description">입니다.</div>
          </div>

          <div className="Analysis-chart">
            {" "}
            {/* 이용 성별 차트 */}
            <Line data={salesLineData} key={JSON.stringify(salesLineData)} />
          </div>

          <div className="Analysis-line" />
        </div>

        <button
          className="Profit-loss-calculation"
          onClick={() => {
            window.location.href = "/profit";
          }}
        >
          손익 계산하러 가기
        </button>
      </div>
      <button
        className={`Analysis-toggle-button${
          isAnalysisVisible ? " visible" : " hidden"
        }`}
        onClick={() => {
          setIsAnalysisVisible((prev) => !prev);
        }}
      >
        {isAnalysisVisible ? "❯" : "❮"}
      </button>
    </>
  );
}
export default Analysis;
