import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer } from "react";

type InitialStateType = {
  user: any;
};
const initialState = {
  user: null,
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum UserReducerTypes {
  SET_USER = "set_user",
  SET_METADATA = "set_metadata",
}

type UserPayload = {
  [UserReducerTypes.SET_USER]: object;
  [UserReducerTypes.SET_METADATA]: object;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: InitialStateType, action: UserActions) => {
  switch (action.type) {
    case UserReducerTypes.SET_USER:
      return {
        user: action.payload,
      };
    case UserReducerTypes.SET_METADATA:
      return {
        ...state,
        metadata: action.payload,
      };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: InitialStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    console.log("user", user);
    if (router.asPath === "/login" && user) {
      void router.push("/");
    }
    if (!user && !isLoading && router.asPath !== "/login") {
      void router.push("/login");
    }
  }, [router.asPath, user, isLoading]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
