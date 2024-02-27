import { Outlet, Navigate } from "react-router-dom";
import Pictures from "/assets/video/pictures.mp4";

const Authlayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <main className="relative w-full h-screen flex items-center justify-center flex-col ">
          <section className="flex justify-center items-center flex-col absolute bg-[#00000010] w-full h-full z-10">
            <Outlet />
          </section>

          <video
            src={Pictures}
            controls={false}
            autoPlay={true}
            loop
            muted
            className="sm:w-0 xl:block  w-full  h-full  object-cover"
          />
        </main>
      )}
    </>
  );
};

export default Authlayout;
