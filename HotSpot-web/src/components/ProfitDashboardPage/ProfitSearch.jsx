import React, { useState, useEffect } from "react";
import "../../styles/components/ProfitDashBoard/ProfitSearch.css";
import {
  getSales,
  getRents,
  getHistoricalPopulation,
  getForecastPopulation,
} from "../../api/profitAPI";
import { useSelectedRegion } from "../../hooks/useSelectedRegion";
import VARIABLE_COST_RATES from "../../constants/VARIABLE_COST_RATES";

const ProfitSearch = ({ capital, setCapital, pyeong, setPyeong }) => {
  const [sales, setSales] = useState(0);
  const [rent, setRent] = useState(0);
  const [cost, setCost] = useState(0);
  const [capitalDisplay, setCapitalDisplay] = useState("0");
  const [error, setError] = useState(null);

  const { selectedDetail: areaId, selectedIndustry: categoryCode } =
    useSelectedRegion();

  useEffect(() => {
    const fetchData = async () => {
      if (!areaId || !categoryCode) return;

      try {
        setError(null);

        const [salesData, rentData, pastPop, futurePop] = await Promise.all([
          getSales(areaId, categoryCode),
          getRents(),
          getHistoricalPopulation(areaId),
          getForecastPopulation(areaId),
        ]);

        const pastSales = salesData?.[0]?.quarters?.[0]?.totalSales || 0;

        const pastPopulation =
          pastPop?.reduce(
            (sum, p) =>
              sum + (p.hourlyFlow?.reduce((acc, h) => acc + h.value, 0) || 0),
            0
          ) || 1;

        const futurePopulation =
          futurePop?.reduce(
            (sum, p) =>
              sum + (p.hourlyFlow?.reduce((acc, h) => acc + h.value, 0) || 0),
            0
          ) || 0;

        const avgPurchasePerPerson = pastSales / pastPopulation;

        // 가정값
        const inflowRate = 0.5;
        const visitRate = 0.5;
        const conversionRate = 0.2;

        const predictedSales = Math.round(
          futurePopulation *
            inflowRate *
            visitRate *
            conversionRate *
            avgPurchasePerPerson
        );

        const matchingRent = rentData.find((r) => r.areaId === areaId);
        const rentValues = Object.values(matchingRent?.monthlyRents || {});
        const 평당임대료 = Math.max(...rentValues, 0);
        const monthlyRent = 평당임대료 * (pyeong || 20);

        const FIXED_COST = 500000;
        const VARIABLE_COST_RATE = VARIABLE_COST_RATES[categoryCode] || 0.75;
        const estimatedCost = Math.round(
          FIXED_COST + predictedSales * VARIABLE_COST_RATE
        );

        setSales(predictedSales);
        setRent(monthlyRent);
        setCost(estimatedCost);
      } catch (err) {
        console.error("❌ [ProfitSearch] fetchData error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setSales(0);
        setRent(0);
        setCost(0);
      }
    };

    fetchData();
  }, [areaId, categoryCode, pyeong]);

  useEffect(() => {
    setCapitalDisplay(capital.toLocaleString());
  }, [capital]);

  const formatCurrency = (value) => `${parseInt(value).toLocaleString()} 원`;

  const handleCapitalChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw || "0", 10);
    setCapital(num);
    setCapitalDisplay(num.toLocaleString());
  };

  const handleAreaSizeChange = (e) => {
    const size = parseInt(e.target.value || "0", 10);
    setPyeong(size > 0 ? size : 1); // 최소 1평
  };

  return (
    <div className="profit-input-wrapper">
      <h4 className="profit-input-title">비용 계산하기</h4>

      {error && <p className="profit-error-message">{error}</p>}

      <label className="profit-input-label" htmlFor="sales">
        예상 매출액
      </label>
      <input
        className="profit-input-box"
        type="text"
        id="sales"
        value={formatCurrency(sales)}
        readOnly
      />

      <label className="profit-input-label" htmlFor="rent">
        임대료
      </label>
      <div className="rent-row">
        <input
          className="profit-input-box"
          type="text"
          id="rent"
          value={formatCurrency(rent)}
          readOnly
        />
        <input
          className="area-size-input"
          type="number"
          min="1"
          value={pyeong}
          onChange={handleAreaSizeChange}
          title="임대 면적 (평)"
        />
        <span className="area-size-unit">평</span>
      </div>

      <label className="profit-input-label" htmlFor="cost">
        운영 비용
      </label>
      <input
        className="profit-input-box"
        type="text"
        id="cost"
        value={formatCurrency(cost)}
        readOnly
      />

      <label className="profit-input-label" htmlFor="capital">
        초기 자본
      </label>
      <input
        className="profit-input-box"
        type="text"
        id="capital"
        value={capitalDisplay}
        onChange={handleCapitalChange}
        placeholder="0"
      />
    </div>
  );
};

export default ProfitSearch;
