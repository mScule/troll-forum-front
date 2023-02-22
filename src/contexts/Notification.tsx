import { useState, createContext, FC, useRef, ReactNode } from "react";
import { Alert, Box, Drawer } from "@mui/material";

export const NotificationContext = createContext(
  (_notification: Notification) => {}
);

interface Props {
  children: ReactNode;
}

interface Notification {
  content: string;
  type: "info" | "success" | "warning" | "error";
}

export const NotificationProvider: FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const content = useRef<Notification>({
    type: "info",
    content: "",
  });
  const timeout = useRef<null | number>(null);

  function createNotification(notification: Notification) {
    content.current = notification;
    setShow(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => setShow(false), 2000);
  }

  return (
    <>
      <Drawer
        anchor="top"
        open={show}
        elevation={0}
        slotProps={{ backdrop: { invisible: true } }}
      >
        <Alert
          sx={{
            height: "4rem",
            borderRadius: 0,
            alignItems: "center",
          }}
          variant="filled"
          severity={content.current.type}
        >
          {content.current.content}
        </Alert>
      </Drawer>

      <NotificationContext.Provider value={createNotification}>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationContext;
