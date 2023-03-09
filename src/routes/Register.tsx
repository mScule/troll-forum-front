import { useEffect } from "react";
import axios from "../setup/axios";
import { useContext } from "react";
import ValidatedForm from "../components/ValidatedForm";
import { FormSchema } from "../components/ValidatedForm";
import { NotificationContext } from "../contexts/Notification";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import NavigateWithNotification from "../components/NavigateWithNotification";

/*
Form made with schema from /components/ValidatedForm.tsx
Allows users to register an account.

When the user gives the credentials, values are checked for validity.

The username is checked for length and if it can already be found in the database.
The password must be 12 characters or longer.

User is informed if registration was successful or not.
If registration was successful, user is navigated automatically to the login page.

 */

export default function Register() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const createNotification = useContext(NotificationContext);

  const schema: FormSchema = {
    username: {
      type: "text",
      rows: 1,

      validatePending: async (value: string) => {
        if (value.length < 3) {
          return "failure";
        }

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

  return user.getLoginStatus() === true ? (
    <NavigateWithNotification
      to="/"
      type="info"
      content="You have already logged in"
    />
  ) : (
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

          navigate("/login");

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
