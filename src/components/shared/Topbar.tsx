import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Social Gram"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            variant="ghost"
            onClick={signOut}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
