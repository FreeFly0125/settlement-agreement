import React from "react";
import axios, { AxiosError } from "axios";
import { FormikHelpers } from "formik";

import { withMainlayout } from "../layouts";
import { RegisterPayload } from "../types";
import { RegisterView } from "../components/Views";
import { toast } from "react-toastify";

export const RegisterPage: React.FC = withMainlayout(() => {
  const onSubmit = async (
    payload: RegisterPayload,
    actions: FormikHelpers<RegisterPayload>
  ) => {
    const url = "http://localhost:4000/register";
    try {
      const result = await axios.post(url, payload);
      actions.resetForm();
      toast.success("Register successed!");
    } catch (e: any) {
      if (e.response.status === 409) {
        toast.error("Already registered!");
      } else {
        toast.error("Register failed!");
      }
      return;
    }
  };

  return <RegisterView onSubmit={onSubmit} />;
});
