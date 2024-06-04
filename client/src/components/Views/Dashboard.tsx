import React, { useEffect, useRef, useState } from "react";
import { SettlementTable, SettlementDetail, SettlementDelete } from "../Common";
import { Settlement, SettlementStatus, UserRole } from "../../types";
import axios from "axios";

export const DashboardView: React.FC = () => {
  const new_settlement = {
    id: 0,
    title: "",
    price: "",
    proposer: localStorage.getItem("username") ?? "",
    verifier: "",
    status: SettlementStatus.Pending,
  };

  const userrole = localStorage.getItem("userrole") ?? "";

  const socketRef = useRef<WebSocket | null>(null);
  const [settles, setSettles] = useState<Settlement[]>([]);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [curSettlement, setCurSettlement] =
    useState<Settlement>(new_settlement);

  const setDetailOption = (flag: boolean) => {
    setIsDetail(flag);
  };

  const setSettlement = (settle: Settlement) => {
    setCurSettlement(settle);
  };

  const setDeleteOption = (flag: boolean) => {
    setIsDelete(flag);
  };

  const insertSettlement = (settle: Settlement) => {
    setSettles((prev) => [...prev, settle]);
  };

  const updateSettlement = (settle: Settlement) => {
    setSettles((prev) =>
      prev.map((prev_settle) =>
        prev_settle.id === settle.id ? settle : prev_settle
      )
    );
  };

  const deleteSettlement = (settle: Settlement) => {
    setSettles((prev) =>
      prev.filter((prev_settle) => prev_settle.id !== settle.id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:4000/settlement";
      const result = await axios.get(url);
      setSettles(result.data.map((settle: Settlement) => settle));
    };

    fetchData();

    if (!socketRef.current) {
      const socket_url = "ws://localhost:4004";
      const ws = new WebSocket(socket_url);

      ws.onopen = () => {
        console.log("WebSocket connection opened");
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.onmessage = (event) => {
        const data: any = JSON.parse(event.data);
        if (data.type === "connect") {
          console.log("Socket connected!");
        } else if (data.type === "message") {
          console.log("Message received: ", data.message);
        } else if (data.type === "new") {
          const settlement: Settlement = data.data;
          insertSettlement(settlement);
        } else if (data.type === "update") {
          const settlement: Settlement = data.data;
          updateSettlement(settlement);
        } else if (data.type === "delete") {
          const settlement: Settlement = data.data;
          deleteSettlement(settlement);
        } else {
          console.log("Unknown message: ", data);
        }
      };

      socketRef.current = ws;
    }
  }, []);

  return (
    <>
      <div className="px-36 py-8 h-full">
        <div className="w-full flex pl-8 py-4 items-center justify-between">
          <p className="text-2xl font-bold">Settlements</p>
          {userrole === UserRole.Proposer && (
            <div>
              <button
                onClick={() => {
                  setCurSettlement(new_settlement);
                  setIsDetail(true);
                }}
                className="px-6 py-1 border-2 border-purple-600 rounded-lg text-purple-600 hover:border-purple-300"
              >
                New
              </button>
            </div>
          )}
        </div>
        <div
          className={`w-full h-[calc(100%-68px)] ${
            isDetail || isDelete ? "blur" : ""
          }`}
        >
          <SettlementTable
            data={settles}
            setDetailOption={setDetailOption}
            setDeleteOption={setDeleteOption}
            setSettlement={setSettlement}
          />
        </div>
      </div>
      {isDetail && (
        <SettlementDetail
          settlement={curSettlement}
          setDetailOption={setDetailOption}
          insertSettlement={insertSettlement}
          updateSettlement={updateSettlement}
        />
      )}
      {isDelete && (
        <SettlementDelete
          settlement={curSettlement}
          deleteSettlement={deleteSettlement}
          setDeleteOption={setDeleteOption}
        />
      )}
    </>
  );
};
