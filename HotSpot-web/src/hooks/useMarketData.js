import { useQuery } from "@tanstack/react-query";
import axios from "axios";


// 상권 데이터 가져오기
const fetchCategoryData = async () => {
    const response = await axios.get("https://hotspot-1cp7.onrender.com/categories");
    return response.data;
}

// 상권 데이터 훅
export const useCategoryData = () => {
    return useQuery({
        queryKey: ["categoryData"],
        queryFn: fetchCategoryData,
        staleTime: 1000 * 60 * 5, // 5분
    })
}

// 상권별 개폐업 데이터 가져오기
const fetchOpenCloseData = async (areaId) => {
    const response = await axios.get(`https://hotspot-1cp7.onrender.com/areas/${areaId}/open-close-stats`);
    const data = response.data;

    const distribution = data.map(item => ({
        categoryCode: item.categoryCode,
        categoryName: item.categoryName,
        totalStores: item.totalStores,
        openRate: item.openRate,
        closeRate: item.closeRate,
    }));

    return distribution;
}

// 상권별 개폐업 데이터 훅
export const useOpenCloseData = (areaId) => {
    return useQuery({
        queryKey: ["openCloseData", areaId],
        queryFn: () => fetchOpenCloseData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5, // 5분
    });
};


// 과거 유동인구 데이터 가져오기
const fetchPopulationData = async (areaId) => {
    const response = await axios.get(`https://hotspot-1cp7.onrender.com/areas/${areaId}/population/history`);
    const data = response.data;

    // 2024년 데이터만 필터링
    const filtered = data.filter(item => item.month.startsWith("2024"));

    // 각 월의 hourlyFlow 값을 합산하여 월별 총합을 구함
    const monthlyAverages = filtered.map(monthItem => {
        const total = monthItem.hourlyFlow.reduce((sum, h) => sum + h.value, 0);
        return total;
    });

    // 1년 기준 월 평균 유동인구 (12달 총합 / 12)
    const overallAverage = monthlyAverages.reduce((sum, val) => sum + val, 0) / monthlyAverages.length;

    // 1년 기준 일 평균 유동인구 (월 평균 유동인구 / 30)
    const dailyAverage = overallAverage / 30;

    // 2024년 전체 성별 유동인구 계산 (월별 평균)
    const maleTotal = filtered.reduce((sum, monthItem) => {
        const genderData = monthItem.genderAgeFlow?.male || {};
        const monthlyMale = Object.values(genderData).reduce((s, v) => s + Number(v), 0);
        return sum + monthlyMale;
    }, 0) / filtered.length;

    const femaleTotal = filtered.reduce((sum, monthItem) => {
        const genderData = monthItem.genderAgeFlow?.female || {};
        const monthlyFemale = Object.values(genderData).reduce((s, v) => s + Number(v), 0);
        return sum + monthlyFemale;
    }, 0) / filtered.length;


    return {
        monthlyData: filtered,
        averagePopulation: Math.round(overallAverage),
        dailyAveragePopulation: Math.round(dailyAverage),
        male: Math.round(maleTotal),
        female: Math.round(femaleTotal),
    };
}

// 과거 유동인구 데이터 훅
export const usePopulationData = (areaId) => {
    return useQuery({
        queryKey: ["populationData", areaId],
        queryFn: () => fetchPopulationData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    });
}


// 예측 유동인구 데이터 가져오기
const fetchForecastPopulationData = async (areaId) => {
    const response = await axios.get(`https://hotspot-1cp7.onrender.com/areas/${areaId}/population/forecast`);
    const data = response.data;

    // 2025년 데이터만 필터링
    const filtered = data.filter(item => item.month.startsWith("2025"));

    // 각 월의 hourlyFlow 값을 합산하여 월별 총합을 구함
    const monthlyAverages = filtered.map(monthItem => {
        const total = monthItem.hourlyFlow.reduce((sum, h) => sum + h.value, 0);
        return total;
    });

    // 전체 평균 계산 (12달 총합 / 12)
    const overallAverage = monthlyAverages.reduce((sum, val) => sum + val, 0) / monthlyAverages.length;

    // 1년 기준 일 평균 유동인구 (월 평균 유동인구 / 30)
     const dailyAverage = overallAverage / 25;

    // 남성, 여성 유동인구 합산
     const maleTotal = filtered.reduce((sum, item) => {
        const gender = item.genderAgeFlow.male || {};
        return sum + Object.values(gender).reduce((s, v) => s + v, 0);
     }, 0);

    const femaleTotal = filtered.reduce((sum, item) => {
        const gender = item.genderAgeFlow.female || {};
        return sum + Object.values(gender).reduce((s, v) => s + v, 0);
     }, 0); 

    
    return {
        monthlyData: filtered,
        averagePopulation: Math.round(overallAverage),
        dailyAveragePopulation: Math.round(dailyAverage),
        male: Math.round(maleTotal),
        female: Math.round(femaleTotal),
    };
}


// 예측 유동인구 데이터 훅
export const useForecastPopulationData = (areaId) => {
    return useQuery({
        queryKey: ["populationForecastData", areaId],
        queryFn: () => fetchForecastPopulationData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    });
}

// 업종별 매출 데이터 가져오기

const fetchSalesCategoryData = async (areaId) => {
    const response = await axios.get(`https://hotspot-1cp7.onrender.com/areas/${areaId}/sales`);
    return response.data;
}


// 업종별 매출 데이터 훅
export const useSalesCategoryData = (areaId) => {
    return useQuery({
        queryKey: ["salesCategoryData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    });
};

// 시간대별 매출 데이터 훅
export const useSalesByTimeData = (areaId) => {
    return useQuery({
        queryKey: ["salesByTimeData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    })
}

// 요일별 매출 데이터 훅
export const useSalesByDayData = (areaId) => {
    return useQuery({
        queryKey: ["salesByDayData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    })
}

// 나이 데이터 훅
export const useAgeSalesData = (areaId) => {
    return useQuery({
        queryKey: ["ageSalesData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    })
}

//성별 데이터 훅
export const useGenderSalesData = (areaId) => {
    return useQuery({
        queryKey: ["genderSalesData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    })
}

// 전체 매출 데이터 훅
export const useTotalSalesData = (areaId) => {
    return useQuery({
        queryKey: ["totalSalesData", areaId],
        queryFn: () => fetchSalesCategoryData(areaId),
        enabled: !!areaId, // areaId가 있을 때만 호출
        staleTime: 1000 * 60 * 5,
    })
}

// 보증금 데잍 ㅓ가져오기
const fetchRentData = async () => {
    const response = await axios.get(`https://hotspot-1cp7.onrender.com/rents`);
    const rawData = response.data;

    // 2024년 1~4분기 키만 추출
    const recentQuarters = ["20241", "20242", "20243", "20244"];

    const filteredData = rawData.map(area => {
      const filteredRents = {};
      recentQuarters.forEach(q => {
        if (area.monthlyRents[q] !== undefined) {
          filteredRents[q] = area.monthlyRents[q];
        }
      });

      return {
        areaId: area.areaId,
        areaName: area.areaName,
        monthlyRents: filteredRents,
      };
    });

    // 각 지역의 평균 보증금 계산
    const finalData = filteredData.map(area => {
        const rents = Object.values(area.monthlyRents);
        const averageRent = rents.length > 0 ? Math.round(rents.reduce((sum, val) => sum + val, 0) / rents.length) : 0;

        return {
            ...area,
            averageRent,
        };
    });

    return finalData;
}

export const useRentData = () => {
    return useQuery({
        queryKey: ["rentData"],
        queryFn: fetchRentData,
        staleTime: 1000 * 60 * 5, // 5분
    });
}

// 선택된 업종코드에 따라 모든 상권의 개폐업 데이터를 가져오는 훅
export const useFilteredOpenCloseData = (areaIds, selectedCategoryCode) => {
    return useQuery({
        queryKey: ["filteredOpenCloseData", areaIds?.join(","), selectedCategoryCode],
        queryFn: async () => {
            if (!Array.isArray(areaIds) || areaIds.length === 0) return [];

            const results = await Promise.all(
                areaIds.map(async (id) => {
                    const res = await axios.get(
                        `https://hotspot-1cp7.onrender.com/areas/${id}/open-close-stats`
                    );
                    return res.data.map((item) => ({ ...item, areaId: id }));
                })
            );
            const flat = results.flat();

            if (
                !selectedCategoryCode ||
                selectedCategoryCode === "선택" ||
                selectedCategoryCode === "CS100000"
            ) {
                return flat;
            }

            return flat.filter(d => d.categoryCode === selectedCategoryCode);
        },
        enabled: Array.isArray(areaIds) && areaIds.length > 0,
        staleTime: 1000 * 60 * 5,
    });
};