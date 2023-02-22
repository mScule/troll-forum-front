import { useState } from "react";

import axios from "../setup/axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import FormWrapper from "../components/FormWrapper";
import PageWrapper from "../components/PageWrapper";
import { Stack } from "@mui/system";

import { TbX as ValidationFailureIcon } from "react-icons/tb";
import { TbCheck as ValidationSuccessIcon } from "react-icons/tb";
import ValidatedForm, { ValidatorResult } from "../components/ValidatedForm";

type ValidationStatus =
  | "is-validated"
  | "is-not-validated"
  | "pending"
  | "not-filled";

interface FormField {
  value: string;
  validation: ValidationStatus;
}


export default function Register() {
  return (
    <PageWrapper>
      <ValidatedForm
        formName="Registeration"
        formSchema={{
          username: {
            rows: 1,
            errorText: (value) => `There's already user with name ${value}`,
            validatePending: async (value: string) => {
              await new Promise(resolve => setTimeout(resolve, 1000))
              return "success";
            },
          },
          password: {
            rows: 1,
            errorText: "Password has to be 12 characters or longer",
            validate: (_value) => "failure",
          },
        }}
        submitLabel="Register"
        handleSubmit={async (form) => {
          console.log(form);
        }}
      />
    </PageWrapper>
  );
}
