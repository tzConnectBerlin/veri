import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const HeaderContainer = styled.header`
  margin: auto;
  padding: 3.75rem 0;
  text-align: center;
  h6{
    max-width: 540px;
    margin: auto;
    margin-top: 1.5rem;
  }
`;

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <Typography variant="h1" fontSize="2.8125rem">
        {title}
      </Typography>
      <Typography variant="h6" px={4}>
        {subtitle}
      </Typography>
    </HeaderContainer>
  );
};
