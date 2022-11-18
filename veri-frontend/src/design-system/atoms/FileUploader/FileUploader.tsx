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
import { SUPPORTED_FORMATS } from '../../../Global';

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

  &.isDragged {
    border: solid 1px var(--chakra-colors-blue-500);
    box-shadow: 0 0 0 1px var(--chakra-colors-blue-500);
  }

  &.isError {
    border: solid 1px var(--chakra-colors-red-500);
    box-shadow: 0 0 0 1px var(--chakra-colors-red-500);
  }
`;

export interface FileUploaderProps extends InputProps {
  onFileChanges: (val?: File) => Promise<void> | void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onChange,
  onFileChanges,
  isInvalid,
  value,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(value as any);
  const [isDragged, setIsDragged] = useState(false);
  const startAnimation = () => setIsDragged(true);
  const stopAnimation = () => setIsDragged(false);

  const handleChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onFileChanges(e.target.files[0]);
      onChange && onChange(e);
      setIsDragged(false);
    }
  };

  const handleDelete = () => {
    setFile(null);
    onFileChanges();
  };

  return (
    <>
      <Box height="fit-content" width="100%">
        {file ? (
          <Stack
            direction="row"
            alignItems="center"
            position="relative"
            zIndex={1}
          >
            <Image
              boxSize="30px"
              borderRadius="full"
              objectFit="cover"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Text as="span">{file.name}</Text>
            <Button onClick={handleDelete} variant="icon">
              <GrFormClose />
            </Button>
          </Stack>
        ) : (
          <FileUploaderContainer
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            height="100%"
            className={`${isDragged ? 'isDragged' : undefined} ${
              isInvalid && !isDragged ? 'isError' : undefined
            }`}
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
          accept={SUPPORTED_FORMATS}
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
