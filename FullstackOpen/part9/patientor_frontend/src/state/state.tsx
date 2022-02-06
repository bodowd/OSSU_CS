import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient | null;
};

const initialState: State = {
  patients: {},
  patient: null,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// the components that need to access the state or dispatcher use this to access those things
export const useStateValue = () => useContext(StateContext);
