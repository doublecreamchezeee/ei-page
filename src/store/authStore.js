import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";
import jwtDecode from "jwt-decode";

// if user is logged in persist is set to true and when page reloads
// we send our token to the backend and check if the users token is still usable
export const usePersistentStore = create(
  persist(
    (set) => ({
      persist: false,
      authenticated: false,
      role: "",
      setPersist: (bool) =>
        set((state) => ({
          ...state,
          persist: bool,
        })),
      setAuth: (bool, role) =>
        set((state) => ({
          ...state,
          role: role,
          authenticated: bool,
        })),
    }),
    {
      name: "persist",
      getStorage: () => sessionStorage,
    }
  )
);

// authenticated user informations
export const useAuthStore = create(
  devtools((set) => ({
    user: {
      _id: null,
      username: null,
      email: null,
      role: null,
      authenticated: false,
    },
    token: null,
    setCredentials: (token) =>
      set((state) => {
        let logUser;
        if (token) {
          const decoded = jwtDecode(token);

          const { _id, username, email, role } = decoded.UserInfo;

          logUser = {
            _id: _id,
            username: username,
            email: email,
            role: role,
            authenticated: true,
          };
        }
        usePersistentStore.getState().setAuth(true, logUser?.role);

        return {
          ...state,
          user: logUser ? logUser : state.user,
          token: token,
        };
      }),
    setLogout: () =>
      set((state) => {
        usePersistentStore.getState().setPersist(false);
        usePersistentStore.getState().setAuth(false, null);
        return {
          ...state,
          token: null,
          user: {
            _id: null,
            username: null,
            email: null,
            role: null,
            authenticated: false,
          },
        };
      }),
  }))
);

const refresh = usePersistentStore.getState().persist;

if (refresh) {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data?.accessToken) {
        useAuthStore.getState().setCredentials(response.data.accessToken);
      }
    })
    .catch((err) => {
      console.log("Refresh Token Expired");
      useAuthStore.getState().setLogout();
    });
}
