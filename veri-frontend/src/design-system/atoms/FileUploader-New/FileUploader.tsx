import { useState } from 'react';

import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF'];

export const DragDropFileUploader = () => {
  const [file, setFile] = useState<File>();
  const handleChange = (file: File) => {
    setFile(file);
  };

  console.log(file);
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};
