import {
  Typography,
  TextField,
  Button,
  TextFieldProps,
  Alert,
} from "@mui/material";
import { FC, useState, useContext } from "react";
import { Stack } from "@mui/material";
import NotificationContext from "../contexts/Notification";
import FormWrapper from "./FormWrapper";

export type ValidatorResult = "success" | "failure";
export type ValidationStatus = ValidatorResult | "pending" | "empty";

export interface FormField {
  value: string;
  validation: ValidationStatus;
}

export type Validator = (value: string) => ValidatorResult;
export type PendingValidator = (value: string) => Promise<ValidatorResult>;

export interface FormSchemaField {
  rows?: number;
  type: "text" | "password";
  errorText?: ((value: string) => string) | string;
  validate?: Validator;
  validatePending?: PendingValidator;
}

export type FormSchema = Record<string, FormSchemaField>;

interface Props {
  formName: string;
  formSchema: FormSchema;
  handleSubmit: (form: Record<string, string>) => Promise<void>;
  submitLabel: string;
  submitInfo?: string;
  submitWarning?: string;
  successMessage?: string;
  failureMessage?: string;
}

const initForm = (formSchema: FormSchema): Record<string, FormField> => {
  const form: Record<string, FormField> = {};
  Object.keys(formSchema).forEach(
    (field: string) => (form[field] = { value: "", validation: "empty" })
  );
  return form;
};

const multilineFieldProps = (rows: number) => ({
  multiline: true,
  rows,
});

/**
 * Component for making validated forms less boilerplatish.
 * 
 * How to use:
 * 
 * To use this, you'll create schema instead of defining every input
 * component that the form consists of.
 *
 * The schema is an object that contains keys that points to input field
 * definitions. Objects that defined the input fields.
 *
 * Simple schema example:
 * ```js
 * const simpleSchema = {
 *    username: {type: "text"},
 *    password: {type: "password"}
 * }
 * ```
 *
 * Complex schema example with validation:
 * ```js
 * const complexSchema = {
 *    title: {
 *      type: "text",
 *      validatePending: async value =>
 *        (await imaginaryApi.postExistsWithTitle(value))
 *          ? "success"
 *          : "failure"
 *    },
 *    body: {
 *      type: "text",
 *      validate: value => value.length < 256 ? "success" : "failure"
 *    }
 * }
 * ```
 * Attributes:
 *
 * **formName** Name of the form.\
 * **formSchema** Schema that the form is based of.\
 * **handleSubmit** Function that handles the submit. Parameter is the filled
 *                  form with every field sanitized.\
 * **submitLabel** Label for the submit button.\
 * **submitInfo** Info text that will be shown above the submit button. (optional)\
 * **submitWarning** Warning text that will be shown above the submit button. (optional)\
 * **successMessage** Message that will be shown on success. Can be string or a function
 *                    containing the filled form as parameter so that the values can be
 *                    used in the message. The function return the message.\
 * **failureMessage** Same case as with the successMessage but for failure message.
 */
const ValidatedForm: FC<Props> = ({
  formName,
  formSchema,
  handleSubmit,
  submitLabel,
  submitInfo,
  submitWarning,
  successMessage,
  failureMessage,
}) => {
  const createNotification = useContext(NotificationContext);

  const [form, setForm] = useState<Record<string, FormField>>(
    initForm(formSchema)
  );

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finishedForm: Record<string, string> = {};
    for (const [key, field] of Object.entries({ ...form })) {
      finishedForm[key] = field.value.trim();
    }

    setForm(initForm(formSchema));

    try {
      await handleSubmit(finishedForm);
      if (successMessage) {
        createNotification({ type: "success", content: successMessage });
      }
    } catch (error) {
      if (failureMessage) {
        createNotification({ type: "error", content: failureMessage });
      }
    }
  };

  const isFormValidated = () => {
    let isValidated = true;

    for (const field of Object.values(form)) {
      if (field.validation !== "success") {
        isValidated = false;
        break;
      }
    }

    return isValidated;
  };

  const onValidation = (key: string): null | TextFieldProps => {
    let errorText = formSchema[key].errorText
      ? formSchema[key].errorText
      : "Invalid input value";

    switch (form[key].validation) {
      case "success":
        return {
          color: "success",
        };
      case "pending":
        return {
          helperText: "Validating...",
        };
      case "failure":
        return {
          error: true,
          helperText:
            typeof errorText === "function"
              ? (errorText as unknown as (value: string) => string)(
                  form[key].value
                )
              : errorText,
        };
      default:
        return null;
    }
  };

  const capitalize = (value: string) =>
    value[0].toUpperCase() + value.substring(1);

  const validate = async (key: string, form: Record<string, FormField>) => {
    const updatedForm = { ...form };
    let containsPendingValidators = false;

    const pendingValidator = formSchema[key].validatePending;
    const validator = formSchema[key].validate;

    if (updatedForm[key].value === "") {
      updatedForm[key].validation = "empty";
    } else if (updatedForm[key].value.replaceAll(" ","") === "") {
      updatedForm[key].validation = "failure";
    } else if (validator) {
      updatedForm[key].validation = validator(updatedForm[key].value);
    } else if (pendingValidator) {
      updatedForm[key].validation = "pending";
      containsPendingValidators = true;
    } else {
      updatedForm[key].validation = "success";
    }

    setForm(updatedForm);

    if (!containsPendingValidators) {
      return;
    }

    const awaitedUpdatedForm = { ...updatedForm };

    for (const name of Object.keys(form)) {
      const pendingValidator = formSchema[name].validatePending;

      if (
        pendingValidator &&
        awaitedUpdatedForm[name].validation === "pending"
      ) {
        updatedForm[name].validation = await pendingValidator(
          updatedForm[name].value
        );
      }
    }

    setForm(awaitedUpdatedForm);
  };

  const setValue = (key: string, value: string) => {
    const updatedForm = { ...form };

    updatedForm[key].value = value;

    setForm(updatedForm);
    validate(key, updatedForm);
  };

  return (
    <FormWrapper>
      <Typography component="h2" fontSize={25}>
        {formName}
      </Typography>

      <Stack component="form" onSubmit={submit} gap={3}>
        {Object.entries(formSchema).map(([fieldName, schema]) => {
          return (
            <TextField
              key={`form-${formName}-field-${fieldName}`.toLowerCase()}
              id={fieldName}
              name={fieldName}
              label={capitalize(fieldName)}
              type={schema.type}
              placeholder={capitalize(fieldName)}
              value={form[fieldName].value}
              onChange={(event) => setValue(fieldName, event.target.value)}
              required
              fullWidth
              {...(schema.rows && schema.rows > 1
                ? multilineFieldProps(schema.rows)
                : null)}
              {...onValidation(fieldName)}
            />
          );
        })}
        {submitInfo && (
          <Alert variant="outlined" severity="info">
            {submitInfo}
          </Alert>
        )}
        {submitWarning && (
          <Alert variant="outlined" severity="warning">
            {submitWarning}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          disabled={!isFormValidated()}
        >
          {submitLabel}
        </Button>
      </Stack>
    </FormWrapper>
  );
};

export default ValidatedForm;
