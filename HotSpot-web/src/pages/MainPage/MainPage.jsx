import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import "../../styles/MainPage/Mainpage.css";
import ServiceSection from "../../components/ServiceSection/ServiceSection.jsx";
//
const MainPage = () => {
  return (
    <div className="main-page">
      <MainBanner />
      <ServiceSection />
    </div>
  );
};

export default MainPage;
