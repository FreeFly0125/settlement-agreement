import React from "react";
import { Settlement, SettlementStatus } from "../../types";

interface SettlementTableProps {
  data: Settlement[];
  setDetailOption: (flag: boolean) => void;
  setDeleteOption: (flag: boolean) => void;
  setSettlement: (settle: Settlement) => void;
}

export const SettlementTable: React.FC<SettlementTableProps> = ({
  data,
  setDetailOption,
  setDeleteOption,
  setSettlement,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="w-1/6 p-3">
              <div className="flex justify-center">
                <p>Title</p>
              </div>
            </th>
            <th scope="col" className="w-1/3 p-3">
              <div className="flex justify-center">
                <p>Description</p>
              </div>
            </th>
            <th scope="col" className="w-1/8 p-3">
              <div className="flex justify-center">
                <p>Proposer</p>
              </div>
            </th>
            <th scope="col" className="w-1/8 p-3">
              <div className="flex justify-center">
                <p>Verifier</p>
              </div>
            </th>
            <th scope="col" className="w-1/8 p-3">
              <div className="flex justify-center">
                <p>Status</p>
              </div>
            </th>
            <th scope="col" className="w-1/12" />
            <th scope="col" className="w-1/12" />
          </tr>
        </thead>
        <tbody>
          {data.map((settle) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="flex justify-center">
                  <p>{settle.title}</p>
                </div>
              </th>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <p>
                    {settle.description.length <= 70
                      ? settle.description
                      : settle.description.substring(0, 70) + "..."}
                  </p>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <p>{settle.proposer}</p>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <p>{settle.verifier}</p>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <p>{settle.status}</p>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setDetailOption(true);
                      setSettlement(settle);
                    }}
                    className="font-medium hover:underline text-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setDeleteOption(true);
                      setSettlement(settle);
                    }}
                    className={`font-medium ${
                      settle.proposer !== localStorage.getItem("username") ||
                      settle.status !== SettlementStatus.Pending
                        ? "cursor-not-allowed text-gray-600"
                        : "hover:underline text-red-600"
                    }`}
                    disabled={
                      settle.proposer !== localStorage.getItem("username") ||
                      settle.status !== SettlementStatus.Pending
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
