import styled from "@emotion/styled";
import { ListItem, Typography } from "@mui/material";

const FooterContainer = styled.footer`
  display: flex;
  padding-top: 2rem;
  margin: auto;

  .MuiListItem-root {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    width: fit-content;
    a {
      color: rgba(255, 255, 255, 0.65);
      text-underline-offset: 1px;
    }
    p {
      color: rgba(255, 255, 255, 0.65);
      margin-right: 8px;
    }
  }
`;

export interface FooterProps {
  links: {
    title: string;
    url: string;
  }[];
}

export const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <FooterContainer>
      {links.map((link, index) => (
        <ListItem key={index} component="div" disablePadding>
          {index === 0 && (
            <Typography variant="body1" fontWeight="normal">
              Made By
            </Typography>
          )}
          <Typography
            variant="body1"
            fontWeight="normal"
            component="a"
            href={link.url}
            target="_blank"
          >
            {link.title}
          </Typography>
        </ListItem>
      ))}
    </FooterContainer>
  );
};
