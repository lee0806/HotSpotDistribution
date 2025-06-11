import React, { createContext, useContext, useState } from "react";

export const SelectedRegionContext = createContext();

export const SelectedRegionProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGu, setSelectedGu] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(""); // 여기서 areaId가 담김
  const [selectedIndustry, setSelectedIndustry] = useState("");

  return (
    <SelectedRegionContext.Provider
      value={{
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
      }}
    >
      {children}
    </SelectedRegionContext.Provider>
  );
};

export const useSelectedRegion = () => {
  const context = useContext(SelectedRegionContext);
  if (!context) {
    return {
      areaId: null,
      categoryCode: null,
    };
  }
  return {
    ...context,
    areaId: context.selectedDetail,
    categoryCode: context.selectedIndustry,
  };
};
