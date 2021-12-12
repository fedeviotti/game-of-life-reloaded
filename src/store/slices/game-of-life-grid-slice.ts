import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellInterface } from '../../components/game-of-life-grid';

export interface GameOfLifeGridState {
  counterFromFile?: number;
  gridFromFile?: CellInterface[];
  rows?: number;
  cols?: number;
  totalGridCells?: number;
}

const initialState: GameOfLifeGridState = {};

export const gameOfLifeGridSlice = createSlice({
  name: 'gameOfLifeGridSlice',
  initialState,
  reducers: {
    loadGridFromFile: (state, action: PayloadAction<GameOfLifeGridState>) => ({
      ...action.payload,
      totalGridCells:
        (action?.payload?.rows || 0) * (action?.payload?.cols || 0),
    }),
    resetGrid: () => ({}),
  },
});

export const { loadGridFromFile, resetGrid } = gameOfLifeGridSlice.actions;
export const gameOfLifeGridSliceReducer = gameOfLifeGridSlice.reducer;
