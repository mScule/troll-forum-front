import axios from "../setup/axios";
import PageWrapper from "../components/PageWrapper";
import ValidatedForm from "../components/ValidatedForm";
import { FormSchema } from "../components/ValidatedForm";

export default function Register() {
  const schema: FormSchema = {
    username: {
      rows: 1,
      validatePending: async (value: string) => {
        if (value.length < 3) {
          return "failure";
        }

        await new Promise(resolve => setTimeout(resolve, 2000))
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
    test: {
      rows:2,
      validatePending: async (value) => {
        await new Promise(resolve => setTimeout(resolve, 4000))
        return "failure"
      },
      errorText: "error"
    },
    password: {
      rows: 1,
      validate: (value) => (value.length >= 12 ? "success" : "failure"),
      errorText: "Password has to be 12 characters or longer",
    },
  };

  return (
    <PageWrapper>
      <ValidatedForm
        formName="Registeration"
        formSchema={schema}
        submitLabel="Register"
        handleSubmit={async (form) => {
          console.log("USER:", form);
        }}
      />
    </PageWrapper>
  );
}
