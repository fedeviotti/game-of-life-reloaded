import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '../store/hooks';
import {
  loadGridFromFile,
  resetGrid,
} from '../store/slices/game-of-life-grid-slice';
import { CellInterface } from './game-of-life-grid';
import styles from '../styles/game-of-life-grid.module.css';
import { createCell } from '../utils/create-cell';
import { calcX } from '../utils/calc-x';
import { calcY } from '../utils/calc-y';

const Dropzone: React.FC = () => {
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = String(reader.result);
        console.log('[binaryStr]', binaryStr);

        // Read the string and extract the values for initial state
        const [generationInfo, gridInfo, ...grid] = binaryStr?.split(/\r?\n/);
        const counterFromFile =
          +generationInfo.slice(generationInfo.indexOf(' ') + 1, -1) | 0;
        const [rows, cols] = gridInfo.split(' ').map((el) => +el | 0);
        const gridFromFile = grid
          .filter((row) => row.length)
          ?.join('')
          .split('')
          ?.map<CellInterface>((value: string, index) => {
            const cell = createCell(calcX(index, cols), calcY(index, cols));
            if (value === '*') {
              cell.currentState = 1;
              cell.className = styles.live;
              return cell;
            } else if (value === '.') {
              cell.currentState = 0;
              cell.className = styles.dead;
              return cell;
            } else {
              window.console.error('Error in the file format.');
              return {
                id: '',
                currentState: 0,
                nextState: null,
                className: 'dead',
              };
            }
          });
        dispatch(
          loadGridFromFile({ counterFromFile, gridFromFile, rows, cols }),
        );
      };
      // TODO: can we use FileReader.readAsArrayBuffer() instead of readAsText()
      reader.readAsText(file);
    });
  }, []);

  // TODO: Add some styles for isDragActive, isDragAccept, isDragReject,
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="border-dashed border-2 w-48 h-32 rounded flex justify-center items-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drop your files here</p>
    </div>
  );
};

export default Dropzone;
