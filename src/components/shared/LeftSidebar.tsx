// import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import Loader from "./Loader";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  // const handleSignOut = useCallback(() => {
  //   signOut();
  // }, [signOut]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/socialgram1.png"
            alt="Social Gram"
            width={170}
          />
        </Link>
        {user.imageUrl ? (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl}
              alt={user.name}
              className="h-14 w-14 rounded-full"
            />

            <div className="flex flex-col">
              <p className="body-bold"> {user.name}</p>
              <p className="small-regular text-light-3 mt-2">
                @{user.username}
              </p>
            </div>
          </Link>
        ) : (
          <Loader showTxt={false} />
        )}
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink, idx) => {
            const active = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  active && "bg-primary-600"
                }`}
                key={`leftsidebar-${link.label}-${idx}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white h-[24px] w-[24px] ${
                      active && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="Logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
