import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getProfile, getUserID, moneyTransfer } from "../api/auth";
import { useParams } from "react-router-dom";

function MoneyTransfer() {
  const { userID } = useParams();
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const { data: myProfile } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getProfile,
  });

  const { data: profile } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getProfile,
  });

  const { data: userInfo } = useQuery({
    queryKey: ["getUserID"],
    queryFn: () => getUserID(userID),
  });

  console.log(userInfo);

  const { mutate } = useMutation({
    mutationKey: ["MoneyTrasfer"],
    mutationFn: () => moneyTransfer(amount, userInfo?.username),
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyInfo"]);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl text-Black font-semibold mb-"> Transfer</h2>

        <h3 className=" text-white font-semibold mb-2">
          {profile?.balance} KWD
        </h3>
        <div>
          <h1 className=" text-2x1 text-gray-800 font-semibold mb-2">
            {" "}
            {userInfo?.username}{" "}
          </h1>
          <h3 className="text-gray-800 font-semibold mb-2">
            {userInfo?.balance} KWD
          </h3>
        </div>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
                  className="mt-2 inline-block rounded bg-sky-600 px-12 py-3 text-lg font-medium text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
                  onClick={mutate}
        >
          Transfer
        </button>
      </div>
    </div>
  );
}

export default MoneyTransfer;
