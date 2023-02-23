import { Typography, TextField, Button, TextFieldProps } from "@mui/material";
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

const ValidatedForm: FC<Props> = ({
  formName,
  formSchema,
  handleSubmit,
  submitLabel,
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
      finishedForm[key] = field.value;
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
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 3, marginBottom: 3, width: "fit-content" }}
          disabled={!isFormValidated()}
        >
          {submitLabel}
        </Button>
      </Stack>
    </FormWrapper>
  );
};

export default ValidatedForm;
