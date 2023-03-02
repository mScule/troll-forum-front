import { useContext } from "react";
import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import NavigateWithNotification from "../components/NavigateWithNotification";

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const schema: FormSchema = {
    username: { type: "text" },
    password: { type: "password" },
  };

  return user.getLoginStatus() === true ? (
    <NavigateWithNotification
      to="/"
      type="info"
      content="You have already logged in"
    />
  ) : (
    <ValidatedForm
      formName="Login"
      formSchema={schema}
      submitLabel="Login"
      handleSubmit={async ({ username, password }) => {
        await user.login({ username, password });
        navigate("/");
      }}
      successMessage="Signed in successfully!"
      failureMessage="Check your username and password."
    />
  );
}
