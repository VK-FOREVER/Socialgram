import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomSidebar = () => {
  const { pathname } = useLocation();
  return (
    <ul className="bottom-bar">
      {bottombarLinks.map((link, idx) => {
        const active = pathname === link.route;

        return (
          <li key={`bottom-link-${idx}`}>
            <Link
              to={link.route}
              className={`bottombar-link group ${
                active && "bg-primary-600 rounded-[10px]"
              } flex-center flex-col gap-1 p-2 transition`}
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
          </li>
        );
      })}
    </ul>
  );
};

export default BottomSidebar;
