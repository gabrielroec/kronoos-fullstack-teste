import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CsvState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  pages: number;
}

const initialState: CsvState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  pages: 0,
};

const csvSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    fetchCsvDataRequest(state) {
      state.loading = true;
    },
    fetchCsvDataSuccess(
      state,
      action: PayloadAction<{ data: any[]; total: number; pages: number }>
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
    },
    fetchCsvDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCsvDataRequest, fetchCsvDataSuccess, fetchCsvDataFailure } =
  csvSlice.actions;
export default csvSlice.reducer;
