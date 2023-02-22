import { Typography, Switch, Button } from "@mui/material";
import PageWrapper from "../components/PageWrapper";

export default function Root() {
  return (
    <PageWrapper>
      <h2>Trolfeed</h2>
      <Button variant="outlined">Hello</Button>
      <Switch/>
    </PageWrapper>
  );
}
