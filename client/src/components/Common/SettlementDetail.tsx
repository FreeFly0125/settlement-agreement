import React, { useEffect, useState } from "react";
import {
  Settlement,
  SettlementPayload,
  SettlementStatus,
  UserProfile,
  UserRole,
} from "../../types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

interface DetailProps {
  settlement: Settlement;
  setDetailOption: (flag: boolean) => void;
  insertSettlement: (settle: Settlement) => void;
  updateSettlement: (settle: Settlement) => void;
}

export const SettlementDetail: React.FC<DetailProps> = ({
  settlement,
  setDetailOption,
  insertSettlement,
  updateSettlement,
}) => {
  const [verifiers, setVerifiers] = useState<UserProfile[]>([]);
  const userrole = localStorage.getItem("userrole") ?? "";

  useEffect(() => {
    const fetch_users = async () => {
      const url = "http://localhost:4000/user";
      const profiles = await axios.get(url);
      setVerifiers(
        profiles.data.filter(
          (profile: UserProfile) => profile.role === UserRole.Verifier
        )
      );
    };

    fetch_users();
  }, []);

  const onSubmit = async (
    payload: SettlementPayload,
    actions: FormikHelpers<SettlementPayload>
  ) => {
    const action = localStorage.getItem("action") ?? "";

    if (action === "save") {
      if (settlement.id === 0) {
        if (payload.verifier === "") payload.verifier = verifiers[0].name;
        const url = "http://localhost:4000/settlement";
        const result = await axios.post(url, payload);
        const id = result.data.id;
        insertSettlement({ ...payload, id });
        setDetailOption(false);
        toast.success("New settlement requested!");
      } else {
        const url = `http://localhost:4000/settlement/${settlement.id}`;
        const result = await axios.put(url, payload);
        const id = result.data.id;
        updateSettlement({ ...payload, id });
        setDetailOption(false);
        toast.success("Settlement updated!");
      }
    } else {
      const url = `http://localhost:4000/verify/${settlement.id}`;
      const flag = action === "approve";

      try {
        const result = await axios.post(url, {
          verifier: settlement.verifier,
          status: flag ? SettlementStatus.Approved : SettlementStatus.Rejected,
        });

        if (flag) {
          settlement.status = SettlementStatus.Approved;
          toast.success("Approved!");
        } else {
          settlement.status = SettlementStatus.Rejected;
          toast.success("Rejected!");
        }
        setDetailOption(false);
        updateSettlement(settlement);
      } catch (e) {
        toast.error("Failed!");
      }
    }
  };

  const detailSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    description: Yup.string()
      .required("Description is require!")
      .min(3, "Must be at least 3 characteres"),
  });
  const errorStyle = "text-xs mb-10";
  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0">
      <div className="w-1/3 bg-white border-1 rounded-lg border-2 border-gray-500">
        <div className="flex bg-blue-500 p-2 rounded-tl-md rounded-tr-md justify-between">
          <p className="font-bold">Settlement</p>
          <button
            className="pr-2 text-white font-bold"
            onClick={() => {
              setDetailOption(false);
            }}
          >
            X
          </button>
        </div>
        <Formik
          validationSchema={detailSchema}
          onSubmit={onSubmit}
          initialValues={{
            title: settlement.title,
            description: settlement.description,
            proposer: settlement.proposer,
            verifier: settlement.verifier,
            status: settlement.status,
          }}
          className="py-2 px-4"
        >
          {({ errors, touched }) => (
            <Form className="w-full p-4 flex flex-col">
              <div className="flex flex-col gap-3">
                <label>Title</label>
                <Field
                  name="title"
                  placeholder="Title"
                  className={`w-full border rounded-lg px-5 py-2 ${
                    errors.title && touched.title
                      ? "outline-red-500"
                      : "outline-blue-500"
                  }`}
                ></Field>
                {errors.title && touched.title ? (
                  <div className={`${errorStyle} text-red-500`}>
                    {errors.title}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label>Description</label>
                <Field
                  name="description"
                  placeholder="Description"
                  className={`w-full border rounded-lg px-5 py-2 ${
                    errors.description && touched.description
                      ? "outline-red-500"
                      : "outline-blue-500"
                  }`}
                ></Field>
                {errors.description && touched.description ? (
                  <div className={`${errorStyle} text-red-500`}>
                    {errors.description}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col w-full gap-3">
                  <label>Proposer</label>
                  <Field
                    as="select"
                    name="proposer"
                    className="p-2 bg-white rounded-lg border-2 border-gray-800"
                  >
                    <option value={settlement.proposer}>
                      {settlement.proposer}
                    </option>
                  </Field>
                </div>
                <div className="flex flex-col w-full gap-3">
                  <label>Verifier</label>
                  <Field
                    as="select"
                    name="verifier"
                    className="p-2 bg-white rounded-lg border-2 border-gray-800"
                  >
                    {verifiers.map((verifier) => (
                      <option key={verifier.name} value={verifier.name}>
                        {verifier.name}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div className="flex justify-between py-4">
                {settlement.id !== 0 ? (
                  <div className="flex items-center gap-3">
                    <div>Status:</div>
                    <Field
                      as="select"
                      name="status"
                      className="p-2 bg-white rounded-lg border-2 border-gray-800"
                    >
                      <option
                        key={SettlementStatus.Pending}
                        value={SettlementStatus.Pending}
                      >
                        {SettlementStatus.Pending}
                      </option>
                      <option
                        key={SettlementStatus.Approved}
                        value={SettlementStatus.Approved}
                      >
                        {SettlementStatus.Approved}
                      </option>
                      <option
                        key={SettlementStatus.Rejected}
                        value={SettlementStatus.Rejected}
                      >
                        {SettlementStatus.Rejected}
                      </option>
                    </Field>
                  </div>
                ) : (
                  <div></div>
                )}
                {userrole === UserRole.Proposer ? (
                  <button
                    type="submit"
                    onClick={() => {
                      localStorage.setItem("action", "save");
                    }}
                    className={`text-white py-2 px-4 rounded-sm ${
                      settlement.proposer !==
                        localStorage.getItem("username") ||
                      settlement.status !== SettlementStatus.Pending
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    }`}
                    disabled={
                      settlement.proposer !==
                        localStorage.getItem("username") ||
                      settlement.status !== SettlementStatus.Pending
                    }
                  >
                    Save
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={() => {
                        localStorage.setItem("action", "approve");
                      }}
                      className={`text-white py-2 px-4 rounded-sm ${
                        settlement.verifier !==
                          localStorage.getItem("username") ||
                        settlement.status !== SettlementStatus.Pending
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                      disabled={
                        settlement.verifier !==
                          localStorage.getItem("username") ||
                        settlement.status !== SettlementStatus.Pending
                      }
                    >
                      Approve
                    </button>
                    <button
                      type="submit"
                      onClick={() => {
                        localStorage.setItem("action", "reject");
                      }}
                      className={`text-white py-2 px-4 rounded-sm ${
                        settlement.verifier !==
                          localStorage.getItem("username") ||
                        settlement.status !== SettlementStatus.Pending
                          ? "bg-gray-500"
                          : "bg-purple-500"
                      }`}
                      disabled={
                        settlement.verifier !==
                          localStorage.getItem("username") ||
                        settlement.status !== SettlementStatus.Pending
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
