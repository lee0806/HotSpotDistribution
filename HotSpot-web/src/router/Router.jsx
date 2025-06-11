import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import MainPage from "../pages/MainPage/MainPage.jsx";
import ProfitDashboardPage from "../pages/ProfitDashboardPage/ProfitDashboardPage";
import MapPage from "../pages/MapPage/map.jsx";
import SelectPage from "../pages/SelectPage/SelectPage.jsx";
import LocalRecommendPage from "../pages/LocalRecommendPage/LocalRecommendPage.jsx";
import IndustryPage from "../components/RecommendPage/IndustryPage/IndustryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "profit", element: <ProfitDashboardPage /> },
      { path: "map", element: <MapPage /> },
      { path: "select", element: <SelectPage /> },
      { path: "localRecommendPage", element: <LocalRecommendPage /> },
      { path: "IndustryPage", element: <IndustryPage /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
