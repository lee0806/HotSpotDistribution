import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* 왼쪽 소개 영역 */}
      <div className="footer-left">
        <h2 className="footer-title">
          <strong>HotSpot</strong>과 함께 하고 싶은 사장님 <br />
          여기에 알려주세요.
        </h2>
        <p className="footer-subtext">경기대학교 AI컴퓨터공학부</p>
        <p className="footer-address">
          경기도 수원시 영통구 광교산로 154-42 <br />
        </p>
      </div>

      {/* 오른쪽 링크 영역 */}
      <div className="footer-right">
        {/* 서비스 */}
        <div className="footer-section">
          <h3 className="footer-section-title">서비스</h3>
          <p className="footer-section-item">문의 하기</p>
          <p className="footer-section-item">자주 하는 질문</p>
          <p className="footer-section-item">고객센터</p>
        </div>

        {/* 팀원 */}
        <div className="footer-section">
          <h3 className="footer-section-title">팀원</h3>
          <p className="footer-section-item">202211455 박정연</p>
          <p className="footer-section-item">202211502 이윤아</p>
          <p className="footer-section-item">202014999 조성빈</p>
          <p className="footer-section-item">202014906 김지웅</p>
          <p className="footer-section-item">202015071 이세현</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
