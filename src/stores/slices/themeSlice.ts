// src/stores/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Theme = "light" | "dark";
interface ThemeState {
  theme: Theme;
}

const storedTheme = localStorage.getItem("theme") as Theme | null;

const initialState: ThemeState = {
  theme: storedTheme || "light",
};
const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // Persist
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});
export const { toggleTheme, setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
