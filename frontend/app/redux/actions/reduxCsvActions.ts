import api from "@/utils/api";

import {
  fetchCsvDataRequest,
  fetchCsvDataSuccess,
  fetchCsvDataFailure,
} from "../reducers/reduxCsvReducer";

import { AppDispatch } from "../store";

export const fetchCsvData =
  (page: number, limit: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchCsvDataRequest());

    try {
      const request = await api.get(`api/data?page=${page}&limit=${limit}`);
      dispatch(fetchCsvDataSuccess(request.data));
    } catch (error: any) {
      dispatch(fetchCsvDataFailure(error.message));
    }
  };

export const uploadCsv = (file: File) => async (dispatch: AppDispatch) => {
  dispatch(fetchCsvDataRequest());

  try {
    const formData = new FormData();
    formData.append("file", file);

    const request = await api.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchCsvDataSuccess(request.data));
  } catch (error: any) {
    dispatch(fetchCsvDataFailure(error.message));
    throw error;
  }
};
