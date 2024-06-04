import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../consts";

interface TagProps {
  title: string;
  value: string;
}

const Tag: React.FC<TagProps> = ({ title, value }) => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <p className="text-sm mr-2">{title}:</p>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
};

export const HeaderBarView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const username = localStorage.getItem("username") ?? "";
  const userrole = localStorage.getItem("userrole") ?? "";

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userrole");
    navigate(PATH.LOGIN);
  }

  return (
    <div className="z-20 sticky top-0 w-full min-h-28 max-h-28 flex p-3 flex-row shadow-md shadow-black justify-between items-center xl:py-[1.375rem] bg-gradient-to-r from-[#5c5e75] to-[#100c35]">
      <div className="text-white text-2xl px-8">Settlement Aggrement</div>
      {isDashboard && (
        <div className="flex text-white gap-4">
          <Tag title="Name" value={username} />
          <Tag title="Role" value={userrole} />
          <button className="bg-red-400 rounded-md p-2" onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
};
