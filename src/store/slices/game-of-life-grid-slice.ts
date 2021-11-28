import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameOfLifeGridState {
  generationCounter: number;
  rows: number;
  cols: number;
  initialGrid: boolean[][];
}

const initialState: GameOfLifeGridState = {
  generationCounter: 0,
  rows: 0,
  cols: 0,
  initialGrid: [],
};

export const gameOfLifeGridSlice = createSlice({
  name: 'gameOfLifeGridSlice',
  initialState,
  reducers: {
    initializeGrid: (
      state,
      action: PayloadAction<{
        generationCounter: number;
        rows: number;
        cols: number;
        initialGrid: boolean[][];
      }>,
    ) => {
      state.generationCounter = action.payload.generationCounter;
      state.rows = action.payload.rows;
      state.cols = action.payload.cols;
      state.initialGrid = action.payload.initialGrid;
    },
    resetGrid: (state) => {
      state.generationCounter = initialState.generationCounter;
      state.rows = initialState.rows;
      state.cols = initialState.cols;
      state.initialGrid = initialState.initialGrid;
    },
    setRows: (state, action: PayloadAction<{ rows: number }>) => {
      state.rows = action.payload.rows;
    },
  },
});

export const { initializeGrid, resetGrid, setRows } =
  gameOfLifeGridSlice.actions;
export const gameOfLifeGridSliceReducer = gameOfLifeGridSlice.reducer;
