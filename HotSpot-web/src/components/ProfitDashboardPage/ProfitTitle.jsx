import React from "react";
import "../../styles/components/ProfitDashBoard/ProfitTitle.css";

const ProfitTitle = () => {
  return (
    <div className="profit-title-wrapper">
      <h2 className="profit-title-heading">수익이 시작되는 순간, 함께해요.</h2>
      <p className="profit-title-description">
        예상 매출, 임대료, 운영비용까지 복잡한 계산은 우리가 대신할게요.
      </p>
    </div>
  );
};

export default ProfitTitle;
