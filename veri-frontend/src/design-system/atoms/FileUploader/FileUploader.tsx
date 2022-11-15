import {
  Box,
  Input,
  InputProps,
  Stack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';

const FileUploaderContainer = styled(Stack)`
  position: relative;
  border-radius: 6px;
  border: dashed 1px var(--chakra-colors-gray-200);
  padding: 1rem;
  min-height: 160px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface FileUploaderProps extends InputProps {
  onFileChanges: (val: File) => Promise<void> | void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onChange,
  onFileChanges,
  value,
  ...props
}) => {
  const [file, setFile] = useState<File>(value as any);
  const startAnimation = () => console.log('hover');
  const stopAnimation = () => console.log();

  const handleChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onFileChanges(e.target.files[0]);
      onChange && onChange(e);
    }
  };

  return (
    <>
      <Box height="fit-content" width="100%">
        {file ? (
          <Stack direction="row" alignItems="center">
            <Image
              boxSize="30px"
              borderRadius="full"
              objectFit="cover"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Text as="span">{file.name}</Text>
            <GrFormClose />
          </Stack>
        ) : (
          <FileUploaderContainer
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Text color="gray.500">
              Drag & drop or{' '}
              <Text color="primary.main" textDecoration="underline" as="span">
                click here
              </Text>{' '}
              to upload
            </Text>
          </FileUploaderContainer>
        )}
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
          cursor="pointer"
          onDragEnter={startAnimation}
          onDragLeave={stopAnimation}
          onChange={handleChange}
          {...props}
        />
      </Box>
    </>
  );
};
