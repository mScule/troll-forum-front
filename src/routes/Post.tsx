import { useContext } from "react";
import ValidatedForm, { FormSchema } from "../components/ValidatedForm";
import axios from "../setup/axios";
import { UserContext } from "../contexts/User";
import NavigateWithNotification from "../components/NavigateWithNotification";

/*
Form made with schema from /components/ValidatedForm.tsx

Allows users to make new posts. The user must be logged-in to perform this action.
User is informed if the posting was successful or not.

 */

export default function Post() {
  const user = useContext(UserContext);

  const schema: FormSchema = {
    title: { type: "text" },
    body: { type: "text", rows: 10 },
  };

  return user.getLoginStatus() === true ? (
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
  ) : (
    <NavigateWithNotification
      to="/"
      type="error"
      content="You have to be logged in in order to use this feature!"
    />
  );
}
