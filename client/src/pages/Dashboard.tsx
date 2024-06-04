import React from "react";
import { withMainlayout } from "../layouts";
import { useNavigate } from "react-router-dom";
import { PATH } from "../consts";
import { DashboardView } from "../components/Views";

export const Dashboard: React.FC = withMainlayout(() => {
  const navigate = useNavigate();
  if (!localStorage.getItem("username")) {
    navigate(PATH.LOGIN);
  }

  return <DashboardView />;
});
