import { useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";

export default function LogOutButton() {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <Button
      className="shad-button_ghost"
      variant="ghost"
      onClick={handleSignOut}
    >
      <img src="/assets/icons/logout.svg" alt="logout" />
      <p className="small-medium lg:base-medium">Logout</p>
    </Button>
  );
}
