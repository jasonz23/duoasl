import { useRouter } from "next/router";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "~/atoms/button/Button";
import { MobileMenuContext } from "~/contexts/useMobileMenu";
// import { UserContext } from "~/contexts/useUserContext";
// import logout from "~/firebaseApis/logout";

const Item = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className="w-80% flex h-14 items-center justify-center rounded-full bg-[#48cad9] text-xl font-bold text-white hover:bg-[#48cad9]"
    >
      {children}
    </Button>
  );
};

const MobileMenu = () => {
  const { dispatch } = React.useContext(MobileMenuContext);
  //   const { state: userState, dispatch: userDispatch } =
  //     React.useContext(UserContext);
  const closeMobileMenu = () => {
    dispatch({ type: "set_show", payload: false });
  };
  const router = useRouter();
  const goToAccount = () => {
    closeMobileMenu();
    // void router.push(`/users/${userState.user?.uid}`);
  };

  const signOut = async () => {
    // userDispatch({ type: "set_user", payload: null });
    // await logout();
    closeMobileMenu();
  };

  const goToHomePage = () => {
    closeMobileMenu();
    void router.push("/");
  };

  const goToCreateActivityPage = () => {
    closeMobileMenu();
    void router.push("/create-activity");
  };

  const goToCalendarPage = () => {
    closeMobileMenu();
    void router.push("/calendar");
  };

  return (
    <div
      className="relative z-50 flex h-screen w-screen flex-col gap-3 px-3 pt-20"
      style={{
        background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
      }}
    >
      <div className="absolute right-3 top-5">
        <IoIosCloseCircleOutline
          size={32}
          onClick={closeMobileMenu}
          color="white"
        />
      </div>
      <Item onClick={goToHomePage}>Go to Home Page</Item>
      <Item onClick={signOut}>Log Out</Item>
    </div>
  );
};

export default MobileMenu;
