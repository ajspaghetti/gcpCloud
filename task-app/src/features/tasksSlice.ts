import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  tasks: any[]; // Define a more specific type based on your data structure
}

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<any>) { // Specify exact type instead of any
      state.tasks.push(action.payload);
    },
    // Add other reducers like deleteTask, updateTask, etc.
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
