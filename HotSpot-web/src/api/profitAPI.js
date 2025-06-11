const BASE_URL = "https://hotspot-1cp7.onrender.com";

// 매출 정보 가져오기
export const getSales = async (areaId, categoryCode) => {
  try {
    const url = categoryCode
      ? `${BASE_URL}/areas/${areaId}/sales?categoryCode=${categoryCode}`
      : `${BASE_URL}/areas/${areaId}/sales`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("매출 데이터를 가져오는 데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ getSales 오류:", error);
    return null;
  }
};

// 임대료 정보 가져오기
export const getRents = async () => {
  try {
    const url = `${BASE_URL}/rents`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("임대료 데이터를 가져오는 데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ getRents 오류:", error);
    return [];
  }
};

export const getHistoricalPopulation = async (areaId) => {
  try {
    const response = await fetch(
      `https://hotspot-1cp7.onrender.com/areas/${areaId}/population/history`
    );
    if (!response.ok) {
      throw new Error("과거 유동인구 데이터를 가져오는 데 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("getHistoricalPopulation 오류:", error);
    return [];
  }
};

// 예측 유동인구 데이터 가져오기
export const getForecastPopulation = async (areaId) => {
  try {
    const url = `${BASE_URL}/areas/${areaId}/population/forecast`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("예측 유동인구 데이터를 가져오는 데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ getForecastPopulation 오류:", error);
    return [];
  }
};

export const getSalesWithoutCategory = async (areaId) => {
  const res = await fetch(
    `https://hotspot-1cp7.onrender.com/areas/${areaId}/sales`
  );
  if (!res.ok) {
    throw new Error("상권 전체 매출 데이터를 가져오는 데 실패했습니다.");
  }
  return await res.json(); // 업종별 매출 리스트 반환
};
