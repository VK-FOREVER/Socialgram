import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="bottom-bar">
      {bottombarLinks.map((link, idx) => {
        const active = pathname === link.route;

        return (
          <>
            <Link
              to={link.route}
              className={`bottombar-link group ${
                active && "bg-primary-500 rounded-[10px]"
              } flex-center flex-col gap-1 p-2 transition`}
              key={`bottom-link-${idx}`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`group-hover:invert-white ${
                  active && "invert-white"
                }`}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default BottomSidebar;
