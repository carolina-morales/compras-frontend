import { Container } from "@mui/system";
import React from "react";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default Layout;
