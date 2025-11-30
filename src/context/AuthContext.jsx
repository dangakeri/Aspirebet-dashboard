import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const initialState = { user: null, isAuthenticated: false, isLoading: false };
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false };
    case "createAccount":
      return { ...state, user: action.payload };
    case "currUser":
      return { ...state, user: action.payload };
    case "updateAuthState":
      return { ...state, isAuthenticated: action.payload };
    default:
      throw new Error("Something went wrong");
  }
}

function AuthProvider({ children }) {
  let [{ user }, dispatch] = useReducer(reducer, initialState);

  function logout() {
    dispatch({ type: "loading" });
    dispatch({ type: "createAccount", payload: null });
    localStorage.clear();

    dispatch({ type: "loaded" });
  }

  function getCurrentUser() {
    const user = localStorage.getItem("user");
    if (user != null) {
      const currentUser = JSON.parse("user");
      dispatch({ type: "currUser", payload: currentUser });
      dispatch({ type: "updateAuthState", payload: true });
    } else {
      dispatch({ type: "updateAuthState", payload: true });
    }
  }

  return (
    <AuthContext.Provider value={{ user, dispatch, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuthState() {
  const context = useContext(AuthContext);
  if (context === undefined) return;

  return context;
}
export { AuthProvider, useAuthState };
