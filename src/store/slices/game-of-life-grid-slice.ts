import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellInterface } from '../../components/game-of-life-grid';

export interface GameOfLifeGridState {
  counterFromFile?: number;
  gridFromFile?: CellInterface[];
  rows?: number;
  cols?: number;
  totalGridCells?: number;
  isGridLoading?: boolean;
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
    toggleIsGridLoading: (state, action: PayloadAction<boolean>) => {
      state.isGridLoading = action.payload;
    },
    resetGrid: () => ({}),
  },
});

export const { loadGridFromFile, resetGrid, toggleIsGridLoading } =
  gameOfLifeGridSlice.actions;
export const gameOfLifeGridSliceReducer = gameOfLifeGridSlice.reducer;
