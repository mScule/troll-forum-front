import {useContext} from "react";
import {UserContext} from "../contexts/User";
import ValidatedForm, {FormSchema} from "../components/ValidatedForm";
import axios from "../setup/axios";
import NavigateWithNotification from "../components/NavigateWithNotification";

/*
Form made with schema from /components/ValidatedForm.tsx

Allows users to change their password. The user must be logged-in to perform this action.
The new password must be 12 characters or longer.
User is informed if the password change was successful or not.

 */

export default function Password() {
    const user = useContext(UserContext)

    const schema: FormSchema = {
        password: {
            type: "password",
            validate: (value) => (value.length >= 12 ? "success" : "failure"),
            errorText: "Password has to be 12 characters or longer", }
    }
    return user.getLoginStatus() === true ? (
        <ValidatedForm formName={"Change password"} formSchema={schema}
                       handleSubmit={async ({password}) => {
                           try {
                               await axios.patch(`user/${user.getId()}`, {password: password});
                           } catch (error) {
                               console.log(error)
                           }
                       }}
                       submitLabel={"Change password"}
                       successMessage={"Password changed successfully!"}
                       failureMessage={"There was a problem with changing password"}
        />
    ) : (
        <NavigateWithNotification
            to="/"
            type="error"
            content="You have to be logged in in order to use this feature!"
        />
    );
}