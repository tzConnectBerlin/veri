import { Link, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import React, { Fragment } from 'react';

export interface FooterProps {
  links: {
    title: string;
    url: string;
  }[];
}

export const Footer: React.FC<FooterProps> = ({ links }) => {
  const [isMobile] = useMediaQuery('(max-width: 800px)');

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      py={6}
    >
      {links.map((link, index) => (
        <Fragment key={index}>
          {index === 0 ? (
            <Text>
              Made by{' '}
              <Link textDecoration="underline" href={link.url}>
                {link.title}
              </Link>
            </Text>
          ) : (
            <Link textDecoration="underline" href={link.url}>
              {link.title}
            </Link>
          )}
        </Fragment>
      ))}
    </Stack>
  );
};
