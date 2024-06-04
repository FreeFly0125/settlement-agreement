import React from "react";
import { Settlement } from "../../types";
import { toast } from "react-toastify";
import axios from "axios";

interface DeleteProps {
  settlement: Settlement;
  deleteSettlement: (settle: Settlement) => void;
  setDeleteOption: (flag: boolean) => void;
}

export const SettlementDelete: React.FC<DeleteProps> = ({
  settlement,
  deleteSettlement,
  setDeleteOption,
}) => {
  const delete_settlement = async () => {
    const url = `http://localhost:4000/settlement/${settlement.id}`;
    try {
      const result = await axios.delete(url);
      deleteSettlement(settlement);
      setDeleteOption(false);
      toast.success("Deleted!");
    } catch (e) {
      toast.error("Failed!");
      setDeleteOption(false);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center fixed top-0">
      <div className="w-1/5 bg-gray-200 border-1 rounded-lg border-1 border-gray-500 absolute">
        <div className="flex bg-red-400 p-2 rounded-tl-md rounded-tr-md justify-between">
          <p className="font-bold">Delete</p>
        </div>
        <div className="p-4">Do you really want to delete this settlement?</div>
        <div className="flex px-4 py-2 justify-end gap-2">
          <button
            onClick={delete_settlement}
            className="rounded-lg border-red-500 border-2 p-2 text-red-500 hover:border-red-300"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setDeleteOption(false);
            }}
            className="rounded-lg border-blue-500 border-2 p-2 text-blue-500 hover:border-blue-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
