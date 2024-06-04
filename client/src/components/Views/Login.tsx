import React from "react";

import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoginPayload, UserRole } from "../../types";

interface LoginViewProps {
  onSubmit: (value: LoginPayload, actions: FormikHelpers<LoginPayload>) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSubmit }) => {
  const loginSchema = Yup.object().shape({
    name: Yup.string().required("User Name is required!"),
  });
  const errorStyle = "text-xs mb-10";
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="items-center bg-white p-12 rounded-lg border-2">
        <Formik
          initialValues={{
            name: ""
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-96 flex flex-col gap-5">
              <h1 className="text-2xl m-auto">Login</h1>
              <div>
                <label>
                  Username <span className="text-red-500">*</span>
                </label>
                <Field
                  name="name"
                  placeholder="Enter the name"
                  className={`w-full border rounded-lg px-5 py-2 ${
                    errors.name && touched.name
                      ? "outline-red-500"
                      : "outline-blue-500"
                  }`}
                />
                {errors.name && touched.name ? (
                  <div className={`${errorStyle} text-red-500`}>
                    {errors.name}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-5 py-2 w-full"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
