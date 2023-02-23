import ValidatedForm, {FormSchema} from "../components/ValidatedForm";
import axios from "../setup/axios";
import React from "react";

export default function Post() {

    const schema: FormSchema = {
        title: {type: "text"},
        body: {type: "text", rows: 4}
    }

    return (
        <ValidatedForm
            formName={"Post"}
            formSchema={schema}
            handleSubmit={ async ({title, body}) => {
                try {
                    await axios.post("post", {title: title, body: body})
                } catch (error) {
                    console.log(error)
                }
            }}
            submitLabel={"Post"}
        />
    );


}