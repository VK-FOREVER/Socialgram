import { Outlet, Navigate } from "react-router-dom";
// import Pictures from "/assets/video/pictures.mp4";
import AuthBanner from "/assets/images/authentication.jpg";
import { useUserContext } from "@/context/AuthContext";

const Authlayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <main className="relative w-full h-screen flex items-center justify-center flex-col ">
          <section className="flex justify-center items-center flex-col absolute bg-[#00000055] w-full h-full z-10">
            <Outlet />
          </section>

          {/* <video
            src={Pictures}
            controls={false}
            autoPlay={true}
            loop
            muted
            className="max-sm:w-[500px] xl:block  w-full  h-full  object-cover"
          /> */}
          <img
            src={AuthBanner}
            alt="Authentication Banner"
            className="max-sm:w-[500px] xl:block  w-full  h-full  object-cover"
          />
        </main>
      )}
    </>
  );
};

export default Authlayout;
