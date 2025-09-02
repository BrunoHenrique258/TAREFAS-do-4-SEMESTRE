import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  category?: string;
  completed: boolean;
}

export interface HabitsState {
  items: Habit[];
  filter: string | null;
}

const initialState: HabitsState = {
  items: [],
  filter: null,
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; category?: string }>) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload.name,
        category: action.payload.category,
        completed: false,
      });
    },
    editHabit: (state, action: PayloadAction<{ id: string; name: string; category?: string }>) => {
      const habit = state.items.find((h) => h.id === action.payload.id);
      if (habit) {
        habit.name = action.payload.name;
        habit.category = action.payload.category;
      }
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.items.find((h) => h.id === action.payload);
      if (habit) habit.completed = !habit.completed;
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((h) => h.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((h) => !h.completed);
    },
    setFilter: (state, action: PayloadAction<string | null>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addHabit,
  editHabit,
  toggleHabit,
  deleteHabit,
  clearCompleted,
  setFilter,
} = habitsSlice.actions;

export default habitsSlice.reducer;
