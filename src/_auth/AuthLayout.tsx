import { Outlet, Navigate } from "react-router-dom";

const Authlayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col ">
            <Outlet />
          </section>
          <video
            src="/assets/video/pictures.mp4"
            autoPlay={true}
            loop
            muted
            className="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default Authlayout;
