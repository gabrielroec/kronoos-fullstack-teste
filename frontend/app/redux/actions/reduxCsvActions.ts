import api from "@/utils/api";
import {
  fetchCsvFilesRequest,
  fetchCsvFilesSuccess,
  fetchCsvFilesFailure,
  fetchCsvFileRequest,
  fetchCsvFileSuccess,
  fetchCsvFileFailure,
} from "../reducers/reduxCsvReducer";

import { AppDispatch } from "../store";

export const fetchCsvFiles = () => async (dispatch: AppDispatch) => {
  dispatch(fetchCsvFilesRequest());

  try {
    const response = await api.get("/api/csv/get");
    dispatch(fetchCsvFilesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchCsvFilesFailure(error.message));
  }
};

export const fetchCsvFileById =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchCsvFileRequest());

    try {
      const response = await api.get(`/api/csv/get/${id}`);
      dispatch(fetchCsvFileSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchCsvFileFailure(error.message));
    }
  };

export const uploadCsv = (file: File) => async (dispatch: AppDispatch) => {
  dispatch(fetchCsvFilesRequest());

  try {
    const formData = new FormData();
    formData.append("csvFiles", file);

    const response = await api.post("/api/csv/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchCsvFilesSuccess([response.data]));
  } catch (error: any) {
    dispatch(fetchCsvFilesFailure(error.message));
    throw error;
  }
};

export const deleteCsvFileById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      await api.delete(`/api/csv/delete/${id}`);
      dispatch(fetchCsvFiles());
    } catch (error) {
      console.error("Erro ao deletar arquivo CSV:", error);
    }
  };
