import { useCallback, useEffect } from "react";
import { Button } from "../ui/button";
// import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite/config";

export default function LogOutButton() {
  // const { mutate: signOut, isSuccess } = useSignOutAccount();
  const signOutAccount = async () => {
    try {
      const areYou = confirm("Are you sure you want to sign out?");

      if (areYou) {
        const session = await account.deleteSession("current");
        return session;
      } else {
        null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSignOut = useCallback(() => {
  //   signOut();
  // }, [signOut]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate(0);
  //   }
  // }, [isSuccess]);

  return (
    <Button
      className="shad-button_ghost"
      variant="ghost"
      onClick={signOutAccount}
    >
      <img src="/assets/icons/logout.svg" alt="logout" />
      <p className="small-medium lg:base-medium">Logout</p>
      {/* <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </Button>
  );
}
