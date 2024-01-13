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
          <img
            src="/assets/images/side-img.svg"
            alt="Login-Form"
            className="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default Authlayout;
