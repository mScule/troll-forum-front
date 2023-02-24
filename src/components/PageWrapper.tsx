import { FC, useState, ReactNode } from "react";
import { Container } from "@mui/material";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

interface Props {
  searchbar?: boolean;
  children: ReactNode;
}

const PageWrapper: FC<Props> = ({ searchbar, children }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleShowSidebar = () => setShowSideBar(!showSideBar);

  return (
    <>
      <TopBar searchbar={searchbar} handleMenuButtonClick={handleShowSidebar} />
      <Sidebar open={showSideBar} handleCloseSidebar={handleShowSidebar} />
      <Container fixed sx={{ marginTop: 8, marginBottom: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default PageWrapper;
