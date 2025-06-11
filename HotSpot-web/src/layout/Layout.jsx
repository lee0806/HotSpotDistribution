import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Banner/Banner";

const Layout = () => {
  return (
    <div>
      <Banner />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
