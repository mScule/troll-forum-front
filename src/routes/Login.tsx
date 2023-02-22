import { useContext } from "react";
import axios from "../setup/axios";
import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import PageWrapper from "../components/PageWrapper";
import { NotificationContext } from "../contexts/Notification";

export default function Login() {
  const createNotification = useContext(NotificationContext);

  const schema: FormSchema = {
    username: { type: "text" },
    password: { type: "password" },
  };

  return (
    <PageWrapper>
      <ValidatedForm
        formName="Login"
        formSchema={schema}
        submitLabel="Login"
        handleSubmit={async ({ username, password }) => {
          try {
            const response = (await axios.post("auth", { username, password }))
              .data.token;

            localStorage.setItem("authorization", response);
            createNotification({
              type: "success",
              content: "Signed in successfully!",
            });
          } catch {
            createNotification({
              type: "error",
              content: "Check your username and password.",
            });
          }
        }}
      />
    </PageWrapper>
  );
}
