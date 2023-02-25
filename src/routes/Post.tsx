import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import axios from "../setup/axios";

export default function Post() {
  const schema: FormSchema = {
    title: { type: "text" },
    body: { type: "text", rows: 10 },
  };

  return (
    <ValidatedForm
      formName={"Post"}
      formSchema={schema}
      handleSubmit={async ({ title, body }) => {
        try {
          await axios.post("post", { title: title, body: body });
        } catch (error) {
          console.log(error);
        }
      }}
      submitWarning={
        "Remember! You can't remove your posts, so be mindfull (or not) of the type of content you decide to put up 👺"
      }
      submitLabel={"Post"}
      successMessage={"Post created!"}
      failureMessage={"There was problem creating the post"}
    />
  );
}
