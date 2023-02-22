import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const schema: FormSchema = {
    username: { rows: 1, errorText: "" },
    password: { rows: 1, errorText: "" },
  };

  return (
    <PageWrapper>
      <ValidatedForm
        formName="Login"
        formSchema={schema}
        handleSubmit={async (form) => console.log(form)}
        submitLabel="Login"
      />
    </PageWrapper>
  );
}
