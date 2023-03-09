import { Outlet } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

/**
 * The wrapper around every other routed "page" component.
 */

export default function Root() {
  return (
    <PageWrapper searchbar>
      <Outlet />
    </PageWrapper>
  );
}
