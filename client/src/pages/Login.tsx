import React from "react";
import { withMainlayout } from "../layouts";
import { LoginView } from "../components/Views";
import { LoginPayload } from "../types";
import { FormikHelpers } from "formik";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../consts";

export const LoginPage: React.FC = withMainlayout(() => {
  const navigate = useNavigate();
  const onSubmit = async (
    payload: LoginPayload,
    actions: FormikHelpers<LoginPayload>
  ) => {
    const url = "http://localhost:4000/login";
    try {
      const result = await axios.post(url, { name: payload.name });
      localStorage.setItem("username", result.data.name);
      localStorage.setItem("userrole", result.data.role);
      actions.resetForm();
      navigate(PATH.DASHBOARD);
    } catch (e) {
      toast.error("Login Failed!");
      return;
    }
  };

  return <LoginView onSubmit={onSubmit} />;
});
