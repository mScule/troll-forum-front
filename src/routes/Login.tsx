import { useContext } from "react";
import axios from "../setup/axios";
import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import PageWrapper from "../components/PageWrapper";
import { NotificationContext } from "../contexts/Notification";
import { UserContext } from "../contexts/User";
import getUserId from "../auth/getUserId";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const createNotification = useContext(NotificationContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const schema: FormSchema = {
    username: { type: "text" },
    password: { type: "password" },
  };

  return (
    <ValidatedForm
      formName="Login"
      formSchema={schema}
      submitLabel="Login"
      handleSubmit={async ({ username, password }) => {
        const response = (await axios.post("auth", { username, password })).data
          .token;

        localStorage.setItem("authorization", response);

        user.setId(getUserId());
        user.setIsLoggedIn(true);
        navigate("/");
      }}
      successMessage="Signed in successfully!"
      failureMessage="Check your username and password."
    />
  );
}
