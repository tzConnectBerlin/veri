import {
  HStack,
  useColorModeValue,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdOutlineFileCopy } from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { trimString } from '../../../utils/general';
import { TrimSizeType } from '../../../types/general';

export interface AddressProps {
  bgColor?: string;
  addr: string;
  trimSize?: TrimSizeType;
}

export const Address: React.FC<AddressProps> = ({
  bgColor = 'gray.100',
  trimSize = 'small',
  addr,
}) => {
  const toast = useToast();
  const [trimText, setTrimText] = useState<string>();

  const handleCopy = () => {
    toast({
      title: `Copied to clipboard!`,
      status: 'info',
      duration: 3000,
    });
  };

  useEffect(() => {
    setTrimText(trimString(addr, trimSize));
  }, [addr, trimSize]);

  return (
    <HStack
      px={2}
      py={1}
      width="fit-content"
      backgroundColor={useColorModeValue(bgColor, 'blackAlpha.50')}
      borderRadius={'md'}
      cursor="pointer"
      fontSize="14px"
    >
      <CopyToClipboard text={addr} onCopy={handleCopy}>
        <>
          <Text>{trimText}</Text>
          <MdOutlineFileCopy />
        </>
      </CopyToClipboard>
    </HStack>
  );
};
