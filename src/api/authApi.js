import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosApi as authApi } from "./axios";
import { toast } from "react-toastify";
import { useAuthStore, usePersistentStore } from "../store/authStore";
import { toastSuccessOpt, toastErrorOpt } from "../shared/utils/toastOptions";

// register user
const registerUser = async (newUser) => {
  const result = await authApi.post("/auth/register", {
    ...newUser,
  });
  return result.data;
};

export const useRegister = (newUser) => {
  return useMutation({
    mutationFn: (newUser) => registerUser(newUser),
    onSuccess: (response) => {
      toast.success("Registration is Succesful", toastSuccessOpt);
      useAuthStore.getState().setCredentials(response.accessToken);
      usePersistentStore.getState().setPersist(true);
    },
    onError: (err) => {
      let errMsg;
      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
  });
};
// login user
const loginUser = async (credentials) => {
  const result = await authApi.post("/auth/login", {
    ...credentials,
  });
  return result.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (response) => {
      toast.success("Login is Succesful", toastSuccessOpt);
      useAuthStore.getState().setCredentials(response.accessToken);
      usePersistentStore.getState().setPersist(true);
    },
    onError: (err) => {
      let errMsg;
      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
  });
};

// logout user
const logoutUser = async () => {
  const result = await authApi.post("/auth/logout");
  return result.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (response) => {
      toast.success("Logged Out", toastSuccessOpt);
      useAuthStore.getState().setLogout();
      queryClient.removeQueries();
    },
    onError: (err) => {
      let errMsg;
      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
  });
};

// get refresh token id
const getRefreshToken = async () => {
  const result = await authApi.get(`/auth/refresh`);

  return result.data;
};
export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["refresh"],
    queryFn: () => getRefreshToken(),
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });
};
