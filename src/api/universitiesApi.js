import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosApi as universityApi } from "./axios";
import { toast } from "react-toastify";
import { toastSuccessOpt, toastErrorOpt } from "../shared/utils/toastOptions";

// get all universities
const getUniversities = async () => {
  const result = await universityApi.get(`/universities`);
  return result.data;
};
export const useUniversities = () => {
  return useQuery({
    queryKey: [`all-universities`],
    queryFn: async ({ signal }) => getUniversities({ signal }),
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

// get university by id
const getUniversityById = async (id) => {
  const result = await universityApi.get(`/universities/${id}`);
  return result.data;
};
export const useUniversityById = (id) => {
  return useQuery({
    queryKey: [`university-${id}`],
    queryFn: getUniversityById.bind(null, id),
    initialData: {},
    refetchOnWindowFocus: false,
  });
};

// post university and optimistic update
const addUniversity = async (newUniversity) => {
  const result = await universityApi.post("/universities", newUniversity, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
};
export const useAddUniversity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUniversity) => addUniversity(newUniversity),
    onMutate: async (universityFormData) => {
      const newUniversity = Object.fromEntries(universityFormData.entries());

      await queryClient.cancelQueries({ queryKey: ["all-universities"] });

      const previousUniversitylist = queryClient.getQueryData([
        "all-universities",
      ]);

      queryClient.setQueryData(["all-universities"], (old) => {
        if (old) {
          return [...old, newUniversity];
        }
        return [newUniversity];
      });

      return { previousUniversitylist };
    },
    onSuccess: (response) => {
      toast.success(response.message, toastSuccessOpt);
    },
    onError: (err, newUniversity, context) => {
      queryClient.setQueryData(
        ["all-universities"],
        context.previousUniversitylist
      );

      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-universities"] });
    },
  });
};

// update country and optimistic update
const updateUniversity = async (updatedUniversity) => {
  const result = await universityApi.patch("/universities", updatedUniversity, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
};
export const useUpdateUniversity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedUniversity) => updateUniversity(updatedUniversity),

    onSuccess: (response) => {
      toast.success(response.message, toastSuccessOpt);
    },
    onError: (err) => {
      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["all-universities"] });
      queryClient.refetchQueries({ queryKey: [`university-${id}`] });
    },
  });
};

// DELETE University
const deleteUniversity = async (id) => {
  const result = await universityApi.delete("/universities", {
    data: { id: id },
  });
  return result.data;
};
export const useRemoveUniversity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteUniversity(id),
    onError: (err) => {
      let errMsg;

      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;
      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["all-universities"],
      });
      queryClient.invalidateQueries({
        queryKey: [`university-${id}`],
      });
    },
  });
};
