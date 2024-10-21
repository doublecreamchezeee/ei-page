import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosApi as countryApi } from "./axios";
import { toastSuccessOpt, toastErrorOpt } from "../shared/utils/toastOptions";

// get all countries
const getCountries = async () => {
  const result = await countryApi.get(`/countries`);
  return result.data;
};
export const useCountries = () => {
  return useQuery({
    queryKey: [`all-countries`],
    queryFn: async ({ signal }) => getCountries({ signal }),
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

// get country by id
const getCountryById = async (id) => {
  const result = await countryApi.get(`/countries/${id}`);
  return result.data;
};
export const useCountryById = (id) => {
  return useQuery({
    queryKey: [`country-${id}`],
    queryFn: getCountryById.bind(null, id),
    initialData: {},
    refetchOnWindowFocus: false,
  });
};

// post country and optimistic update
const addCountry = async (newCountry) => {
  const result = await countryApi.post("/countries", newCountry, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
};
export const useAddCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCountry) => addCountry(newCountry),
    onMutate: async (countryFormData) => {
      const newCountry = Object.fromEntries(countryFormData.entries());
      await queryClient.cancelQueries({ queryKey: ["all-countries"] });

      const previousCountrylist = queryClient.getQueryData(["all-countries"]);

      queryClient.setQueryData(["all-countries"], (old) => {
        if (old) {
          return [...old, newCountry];
        }
        return [newCountry];
      });

      return { previousCountrylist };
    },
    onSuccess: (response) => {
      toast.success(response.message, toastSuccessOpt);
    },
    onError: (err, newCountry, context) => {
      queryClient.setQueryData(["all-countries"], context.previousCountrylist);

      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-countries"] });
    },
  });
};

// update country and optimistic update
const updateCountry = async (updatedCountry) => {
  const result = await countryApi.patch("/countries", updatedCountry, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
};
export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCountry) => updateCountry(updatedCountry),
    onSuccess: (response) => {
      toast.success(response.message, toastSuccessOpt);
    },
    onError: (err, updatedCountry, context) => {
      queryClient.setQueryData(["all-countries"], context.previousCountrylist);

      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["all-countries"] });
      queryClient.refetchQueries({ queryKey: [`country-${id}`] });
    },
  });
};

// DELETE Country
const deleteCountry = async (id) => {
  const result = await countryApi.delete("/countries", {
    data: { id: id },
  });
  return result.data;
};
export const useRemoveCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCountry(id),
    onSuccess: ({ message }) => {
      toast.success(message, toastSuccessOpt);
    },
    onError: (err) => {
      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["all-countries"],
      });
      queryClient.invalidateQueries({
        queryKey: [`country-${id}`],
      });
    },
  });
};
