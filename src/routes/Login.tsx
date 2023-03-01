import { useContext } from "react";
import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
        await user.login({ username, password });
        navigate("/");
      }}
      successMessage="Signed in successfully!"
      failureMessage="Check your username and password."
    />
  );
}
