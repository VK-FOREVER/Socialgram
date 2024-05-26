import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated } = useUserContext();

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5 items-center justify-center">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/socialgram1.png"
            alt="Social Gram"
            width={170}
          />
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <Button
            className="w-14"
            variant="ghost"
            onClick={() => handleSignOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3 ">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
