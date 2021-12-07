import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '../store/hooks';
import {
  initializeGrid,
  resetGrid,
} from '../store/slices/game-of-life-grid-slice';

const Dropzone: React.FC = () => {
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    dispatch(resetGrid());
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = String(reader.result);
        console.log('[binaryStr]', binaryStr);

        // Read the string and extract the values for initial state
        const [generation, rowsAndCols, ...grid] = binaryStr?.split(/\r?\n/);
        const generationCounter =
          Number(generation.slice(generation.indexOf(' ') + 1, -1)) | 0;
        const [rows, cols] = rowsAndCols.split(' ').map((el) => Number(el) | 0);
        const initialGrid = grid
          .filter((row) => row.length)
          .map<boolean[]>((row) => row.split('').map((value) => value === '*'));
        //console.log('generationCounter', generationCounter);
        //console.log('rows', rows);
        //console.log('cols', cols);
        //console.log('initialGrid', initialGrid);
        dispatch(
          initializeGrid({ generationCounter, rows, cols, initialGrid }),
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
