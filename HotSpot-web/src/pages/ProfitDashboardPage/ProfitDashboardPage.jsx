import React, { useState } from "react";
import "../../styles/ProfitDashboardPage/ProfitDashboardPage.css";
import ProfitTitle from "../../components/ProfitDashboardPage/ProfitTitle";
import ProfitFilter from "../../components/ProfitDashboardPage/ProfitFilter";
import ProfitSearch from "../../components/ProfitDashboardPage/ProfitSearch";
import ProfitChart from "../../components/ProfitDashboardPage/ProfitChart";

const ProfitDashBoardPage = () => {
  const [capital, setCapital] = useState(0);
  const [pyeong, setPyeong] = useState(20); // 평수 상태 추가

  return (
    <div className="profit-dashboard-container">
      <div className="profit-title-section">
        <ProfitTitle />
      </div>
      <div className="profit-filter-section">
        <ProfitFilter />
      </div>
      <div className="profit-content-section">
        <div className="profit-search-section">
          <ProfitSearch
            capital={capital}
            setCapital={setCapital}
            pyeong={pyeong}
            setPyeong={setPyeong}
          />
        </div>
        <div className="profit-chart-section">
          <ProfitChart capital={capital} pyeong={pyeong} />
        </div>
      </div>
    </div>
  );
};

export default ProfitDashBoardPage;
