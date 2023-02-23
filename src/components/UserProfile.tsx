import { FC } from "react";
import { Divider, Typography, Stack } from "@mui/material";

import ContentWrapper from "./ContentWrapper";
import ContentHeader from "./ContentHeader";
import Link from "./Link";

interface Props {
  visitable?: boolean;
  username: string;
  id: number;
}

const UserProfile: FC<Props> = ({ visitable, username, id }) => (
  <ContentWrapper>
    <ContentHeader title={username} meta={`#${id}`} />
    {visitable && <Link to={`/user/${id}`}>Visit</Link>}

    <Stack direction="column" gap={1}>
      <Typography variant="h4" fontSize={18}>
        Posts
      </Typography>
      <Divider flexItem orientation="horizontal" />
      <Typography variant="h4" fontSize={18}>
        Comments
      </Typography>
      <Divider flexItem orientation="horizontal" />
      <Typography variant="h4" fontSize={18}>
        Reactions
      </Typography>
    </Stack>
  </ContentWrapper>
);

export default UserProfile;
