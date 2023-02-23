import axios from "../setup/axios";
import { useContext } from "react";
import PageWrapper from "../components/PageWrapper";
import ValidatedForm from "../components/ValidatedForm";
import { FormSchema } from "../components/ValidatedForm";
import { NotificationContext } from "../contexts/Notification";

export default function Register() {
  const createNotification = useContext(NotificationContext);

  const schema: FormSchema = {
    username: {
      type: "text",
      rows: 1,
      validatePending: async (value: string) => {
        if (value.length < 3) {
          return "failure";
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const search = await axios.get("search", { params: { value } });
        const users = search.data.users;

        for (const user of users) {
          if (value === user.username) {
            return "failure";
          }
        }

        return "success";
      },
      errorText: (value) =>
        value.length >= 3
          ? `There's already user with name ${value}`
          : "Username has to be 3 characters or longer",
    },
    password: {
      type: "password",
      rows: 1,
      validate: (value) => (value.length >= 12 ? "success" : "failure"),
      errorText: "Password has to be 12 characters or longer",
    },
  };

  return (
    <ValidatedForm
      formName="Registeration"
      formSchema={schema}
      submitLabel="Register"
      handleSubmit={async (form) => {
        try {
          const { username } = (
            await axios.post("user", {
              username: form.username,
              password: form.password,
            })
          ).data.user;

          createNotification({
            type: "success",
            content: `User ${username} created successfully!`,
          });
        } catch {
          createNotification({
            type: "error",
            content: "Error was encountered while creating new user.",
          });
        }
      }}
    />
  );
}
