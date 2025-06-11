import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import "../../styles/components/ProfitDashBoard/ProfitChart.css";
import {
  getSales,
  getRents,
  getHistoricalPopulation,
  getForecastPopulation,
} from "../../api/profitAPI";
import { useSelectedRegion } from "../../hooks/useSelectedRegion";

const ProfitChart = ({ capital, pyeong }) => {
  const [salesInfo, setSalesInfo] = useState({
    yearSales: 0,
    monthSales: 0,
    monthProfit: 0,
    breakEvenMonth: 0,
  });

  const { areaId, categoryCode } = useSelectedRegion();

  useEffect(() => {
    const fetchData = async () => {
      if (!areaId || !categoryCode) return;

      try {
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
        const inflowRate = 0.5; // 유입률
        const visitRate = 0.5; // 방문율
        const conversionRate = 0.2; // 구매 전환율

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

        const 고정비용 = 2500000;
        const 가변비용 = Math.round(predictedSales * 0.7);
        const estimatedCost = 고정비용 + 가변비용;
        const netProfit = predictedSales - monthlyRent - estimatedCost;
        const breakEven = netProfit > 0 ? Math.ceil(capital / netProfit) : 0;

        setSalesInfo({
          yearSales: predictedSales * 12,
          monthSales: predictedSales,
          monthProfit: netProfit,
          breakEvenMonth: breakEven,
        });
      } catch (error) {
        console.error(
          "\u274C 예측 수익 데이터를 불러오는 중 오류 발생:",
          error
        );
      }
    };

    fetchData();
  }, [areaId, categoryCode, capital, pyeong]);

  const chartData = Array.from({ length: 71 }, (_, month) => {
    const cumulativeProfit = salesInfo.monthProfit * month;
    return {
      month: `${month}`,
      profit: cumulativeProfit,
    };
  });

  return (
    <div className="profit-chart-wrapper">
      <div className="profit-chart-labels">
        <p className="profit-chart-title">분석 결과</p>

        <div className="profit-chart-item">
          <p className="profit-chart-label">예상 연 매출액</p>
          <p className="profit-chart-value">
            {salesInfo.yearSales.toLocaleString()}원
          </p>
        </div>

        <div className="profit-chart-item">
          <p className="profit-chart-label">예상 월 매출액</p>
          <p className="profit-chart-value">
            {salesInfo.monthSales.toLocaleString()}원
          </p>
        </div>

        <div className="profit-chart-item">
          <p className="profit-chart-label">예상 월 순이익</p>
          <p className="profit-chart-value red">
            {salesInfo.monthProfit.toLocaleString()}원
          </p>
        </div>

        <div className="profit-chart-item">
          <p className="profit-chart-label">손익 분기점</p>
          <p className="profit-chart-value red">
            {salesInfo.breakEvenMonth > 0
              ? `${Math.floor(salesInfo.breakEvenMonth / 12)}년 ${
                  salesInfo.breakEvenMonth % 12
                }개월`
              : "-"}
          </p>
        </div>
      </div>

      <div className="profit-chart-graph">
        <ResponsiveContainer width="100%" height={440}>
          <LineChart
            data={chartData}
            margin={{ right: 10, left: 60, bottom: 10 }}
          >
            <XAxis
              dataKey="month"
              label={{
                value: "기간 (개월)",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "누적 수익 (원)",
                angle: -90,
                position: "insideLeft",
                dx: -50,
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#000" />
            {salesInfo.breakEvenMonth > 0 && (
              <ReferenceLine
                x={`${salesInfo.breakEvenMonth}`}
                stroke="#f28080"
                strokeDasharray="3 3"
                label={{
                  value: `${Math.floor(salesInfo.breakEvenMonth / 12)}년 ${
                    salesInfo.breakEvenMonth % 12
                  }개월`,
                  fill: "#f28080",
                  position: "right",
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
