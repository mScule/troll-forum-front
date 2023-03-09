import { FC, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import NotificationContext from "../contexts/Notification";

interface Props {
  to: string;
  type: "info" | "success" | "warning" | "error";
  content: string;
}

/**
 * Navigates to given location in the app, and shows notification at the same
 * time.
 *
 * Attributes
 *
 * **to** Url to the content.\
 * **type** Type of the notification.\
 * **content** Content of the notification to be shown.
 */
const NavigateWithNotification: FC<Props> = ({ to, type, content }) => {
  const createNotification = useContext(NotificationContext);

  useEffect(() => {
    createNotification({ type, content });
  }, []);

  return <Navigate to={to} />;
};

export default NavigateWithNotification;
