import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CsvState {
  files: any[];
  selectedFile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CsvState = {
  files: [],
  selectedFile: null,
  loading: false,
  error: null,
};

const csvSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    fetchCsvFilesRequest(state) {
      state.loading = true;
    },
    fetchCsvFilesSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.files = action.payload;
    },
    fetchCsvFilesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCsvFileRequest(state) {
      state.loading = true;
    },
    fetchCsvFileSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.selectedFile = action.payload;
    },
    fetchCsvFileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCsvFilesRequest,
  fetchCsvFilesSuccess,
  fetchCsvFilesFailure,
  fetchCsvFileRequest,
  fetchCsvFileSuccess,
  fetchCsvFileFailure,
} = csvSlice.actions;
export default csvSlice.reducer;
