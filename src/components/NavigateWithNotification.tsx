import { FC, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import NotificationContext from "../contexts/Notification";

interface Props {
  to: string;
  type: "info" | "success" | "warning" | "error";
  content: string;
}

const NavigateWithNotification: FC<Props> = ({ to, type, content }) => {
  const createNotification = useContext(NotificationContext);

  useEffect(() => {
    createNotification({ type, content });
  }, []);

  return <Navigate to={to} />;
};

export default NavigateWithNotification;
