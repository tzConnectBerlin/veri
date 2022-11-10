import { Box, Input, InputProps, Stack, Text, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const FileUploaderContainer = styled(Box)`
  position: relative;
  border-radius: 1rem;
  border: dashed 1px;
  padding: 1rem;
  min-height: 160px;
  height: fit-content;
`;

export const FileUploader: React.FC<InputProps> = props => {
  const [files, setFiles] = useState<File[]>([]);
  const startAnimation = () => console.log('hover');
  const stopAnimation = () => console.log();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, e.target.files[0]]);
    }
  };
  return (
    <FileUploaderContainer height={40} width="100%" border="gray.200">
      <Stack textAlign="center" justifyContent="center" height="100%">
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <Stack direction="row" alignItems="center" key={index}>
              <Image
                boxSize="30px"
                borderRadius="full"
                objectFit="cover"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Text as="span">{file.name}</Text>
            </Stack>
          ))
        ) : (
          <Text>
            Drag & drop or{' '}
            <Text color="primary" textDecoration="underline" as="span">
              click here
            </Text>{' '}
            to upload
          </Text>
        )}
      </Stack>
      <Input
        type="file"
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        opacity="0"
        aria-hidden="true"
        accept="image/*"
        onDragEnter={startAnimation}
        onDragLeave={stopAnimation}
        onChange={handleChange}
        {...props}
      />
    </FileUploaderContainer>
  );
};
