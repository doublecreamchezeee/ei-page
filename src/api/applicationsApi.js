import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosApi as applicationApi } from "./axios";
import { toast } from "react-toastify";
import { toastSuccessOpt, toastErrorOpt } from "../shared/utils/toastOptions";

// get applications by student
const getAppByStd = async (id) => {
  const result = await applicationApi.get(`/applications/std/${id}`);
  return result.data;
};
export const useApplications = (id) => {
  return useQuery({
    queryKey: [`applications-${id}`],
    queryFn: async ({ signal }) => getAppByStd(id, { signal }),
    initialData: [],
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// get application by id
const getApplicationById = async (id) => {
  const result = await applicationApi.get(`/applications/${id}`);
  return result.data;
};
export const useApplicationById = (id) => {
  return useQuery({
    queryKey: [`application-${id}`],
    queryFn: getApplicationById.bind(null, id),
    initialData: {},
  });
};

// post application and optimistic update
const addApplication = async (newApplication) => {
  const result = await applicationApi.post("/applications/", {
    ...newApplication,
  });
  return result.data;
};
export const useAddApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newApplication) => addApplication(newApplication),
    onMutate: async (newApplication) => {
      await queryClient.cancelQueries({
        queryKey: [`applications-${newApplication.stdId}`],
      });

      const previousApplicationlist = queryClient.getQueryData([
        `applications-${newApplication.stdId}`,
      ]);

      queryClient.setQueryData(
        [`applications-${newApplication.stdId}`],
        (old) => {
          if (old) {
            return [...old, newApplication];
          }
          return [newApplication];
        }
      );

      return { previousApplicationlist };
    },
    onSuccess: ({ message }) => {
      toast.success(message, toastSuccessOpt);
    },
    onError: (err, newApplication, context) => {
      queryClient.setQueryData(
        [`applications-${newApplication.stdId}`],
        context.previousApplicationlist
      );
      let errMsg;
      if (err.response) {
        errMsg = err.response.data.message;
      } else if (err.request) {
        errMsg = err.request.message;
      } else {
        errMsg = err.message;
      }
      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: ({ stdId }) => {
      queryClient.invalidateQueries([`applications-${stdId}`]);
    },
  });
};

// PATCH Application
const updateApplication = async (updatedApplication) => {
  const result = await applicationApi.patch("/applications", {
    ...updatedApplication,
  });
  return result.data;
};
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (application) => updateApplication(application),
    onMutate: async (application) => {
      await queryClient.cancelQueries({
        queryKey: [`applications-${application.stdId}`],
      });
      const previousApplicationslist = queryClient.getQueryData([
        `applications-${application.stdId}`,
      ]);
      queryClient.setQueryData([`applications-${application.stdId}`], (old) => {
        if (old) {
          return [
            ...old.filter((app) => app._id !== application.appId),
            application,
          ];
        } else {
          return [application];
        }
      });
      return { previousApplicationslist };
    },
    onSuccess: ({ message }) => {
      toast.success(message, toastSuccessOpt);
    },
    onError: (err, application, context) => {
      queryClient.setQueryData(
        [`applications-${application.stdId}`],
        context.previousApplicationslist
      );
      toast.error(err.message, toastErrorOpt);
    },
    onSettled: ({ stdId, id }) => {
      queryClient.invalidateQueries({
        queryKey: [`applications-${stdId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`application-${id}`],
      });
    },
  });
};

// DELETE Application
const deleteApplication = async (id) => {
  const result = await applicationApi.delete("/applications", {
    data: { id: id },
  });
  return result.data;
};
export const useRemoveApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteApplication(id),
    onSuccess: ({ message }) => {
      toast.success(message, toastSuccessOpt);
    },
    onError: (err) => {
      toast.error(err.message, toastErrorOpt);
    },
    onSettled: ({ stdId }) => {
      queryClient.invalidateQueries({ queryKey: [`applications-${stdId}`] });
    },
  });
};
