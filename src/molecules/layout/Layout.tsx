import { useRouter } from "next/router";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Button from "~/atoms/button/Button";
// import { UserContext } from "~/contexts/useUserContext";
// import logout from "~/firebaseApis/logout";
import { IoMenu } from "react-icons/io5";
import useWindowSize from "~/hooks/useWindowSize/useWindowSize";
import { MobileMenuContext } from "~/contexts/useMobileMenu";
import Image from "next/image";
import { SlUserFollow } from "react-icons/sl";
import Link from "next/link";

interface AccountDropDownProps {
  setHoverDropDown: (state: boolean) => void;
}
const AccountDropDown = (props: AccountDropDownProps) => {
  //   const { state, dispatch } = React.useContext(UserContext);
  const { setHoverDropDown } = props;
  const router = useRouter();

  const goToAccountPage = () => {
    // if (!state.user) {
    //   return void router.push("/login");
    // }
    // void router.push(`/users/${state.user.uid}}`);
  };

  const handleLogOut = async () => {
    // await logout();
    // dispatch({ type: "set_user", payload: null });
  };

  return (
    <div
      className="absolute right-3 top-12 z-30 h-14 w-32 rounded-lg bg-[#48cad9] text-xs"
      onMouseEnter={() => {
        setHoverDropDown(true);
      }}
      onMouseLeave={() => {
        setHoverDropDown(false);
      }}
    >
      {/* <Button
        onClick={goToAccountPage}
        className="h-1/2 w-full rounded-t-lg px-3 text-white hover:bg-[#6dc4cf]"
      >
        Go to Account
      </Button> */}
      <Button
        onClick={handleLogOut}
        className="h-full w-full rounded-lg px-3 text-white hover:bg-[#6dc4cf]"
      >
        <Link href="/api/auth/logout">Log Out</Link>
      </Button>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [hoverAccountIcon, setHoverAccountIcon] =
    React.useState<boolean>(false);
  const [hoverDropDown, setHoverDropDown] = React.useState<boolean>(false);

  //   const { state } = React.useContext(UserContext);
  const { dispatch: mobileMenuDispatch } = React.useContext(MobileMenuContext);
  const isLoggedIn = true;
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const openMobileMenu = () => {
    mobileMenuDispatch({
      type: "set_show",
      payload: true,
    });
  };

  const goToUserSearchPage = () => {
    void router.push("/user-search");
  };

  return (
    <>
      <nav
        className="absolute top-0 flex h-16 w-screen flex-col"
        style={{
          background:
            "linear-gradient(109.5deg, rgb(72, 203, 217) 11.2%, rgb(135, 218, 149) 91.1%)",
        }}
      >
        <div className="flex h-24 w-full items-center">
          <div
            className="relative z-30 ml-3 w-44 text-lg tracking-widest text-white hover:cursor-pointer"
            onClick={() => {
              if (!isLoggedIn) return;
              void router.push("/");
            }}
          >
            DuoASL
          </div>
          {isLoggedIn && !isMobile && (
            <div
              className="z-30 ml-auto mr-3"
              onMouseEnter={() => {
                setHoverAccountIcon(true);
              }}
              onMouseLeave={() => {
                setHoverAccountIcon(false);
              }}
            >
              <FaUserCircle
                size={32}
                className="hover:cursor-pointer"
                color="white"
              />
            </div>
          )}
          {isLoggedIn && isMobile && (
            <div className="z-30 ml-auto mr-3">
              <IoMenu
                size={32}
                className="hover:cursor-pointer"
                onClick={openMobileMenu}
                color="white"
              />
            </div>
          )}
          {(hoverAccountIcon || hoverDropDown) && (
            <AccountDropDown
              setHoverDropDown={(state) => setHoverDropDown(state)}
            />
          )}
        </div>
      </nav>
      {children}
    </>
  );
};

export default Layout;
