import MobileMenu from "~/molecules/mobileMenu/MobileMenu";
import { useReducer, createContext } from "react";

type InitialStateType = {
  show: boolean;
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

const initialState: InitialStateType = {
  show: false,
};

export enum MobileMenuReducerTypes {
  SET_SHOW = "set_show",
}

type MobileMenuPayload = {
  [MobileMenuReducerTypes.SET_SHOW]: boolean;
};

export type MobileMenuActions =
  ActionMap<MobileMenuPayload>[keyof ActionMap<MobileMenuPayload>];

export const mobileMenuReducer = (
  state: InitialStateType,
  action: MobileMenuActions,
) => {
  switch (action.type) {
    case MobileMenuReducerTypes.SET_SHOW:
      return {
        show: action.payload,
      };
    default:
      return state;
  }
};

const MobileMenuContext = createContext<{
  state: InitialStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mobileMenuReducer, initialState);

  return (
    <MobileMenuContext.Provider value={{ state, dispatch }}>
      {state.show && <MobileMenu />}
      {children}
    </MobileMenuContext.Provider>
  );
};

export { MobileMenuContext, MobileMenuProvider };
