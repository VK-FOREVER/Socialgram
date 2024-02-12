import BottomSidebar from "@/components/shared/BottomSidebar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import TopCreators from "@/components/shared/TopCreators";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <TopCreators />
      <BottomSidebar />
    </div>
  );
};

export default RootLayout;
