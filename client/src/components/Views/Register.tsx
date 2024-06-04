import React from "react";

import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RegisterPayload, UserRole } from "../../types";

interface RegisterViewProps {
  onSubmit: (value: RegisterPayload, actions: FormikHelpers<RegisterPayload>) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onSubmit }) => {
  const loginSchema = Yup.object().shape({
    name: Yup.string().required("User Name is required!"),
  });
  const errorStyle = "text-xs mb-10";
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="items-center bg-white p-12 rounded-lg border-2">
        <Formik
          initialValues={{
            name: "",
            role: UserRole.Proposer,
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-96 flex flex-col gap-5">
              <h1 className="text-2xl m-auto">Register</h1>
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
              <div className="flex w-full">
                <label className="py-2 pr-4">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full px-4 bg-white border-2 border-gray-500 rounded-lg"
                >
                  <option value={UserRole.Proposer}>Proposer</option>
                  <option value={UserRole.Verifier}>Verifier</option>
                </Field>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-5 py-2 w-full"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
