import { Outlet } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Root() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
