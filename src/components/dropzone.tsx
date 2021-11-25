import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: React.FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="border-dashed border-2 w-full h-32 rounded flex justify-center items-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drop your files here</p>
    </div>
  );
};

export default Dropzone;
