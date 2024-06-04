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
    <div className="bg-white min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8 bg-sky-800 rounded-md shadow-md">
        <h2 className="text-3xl text-white font-semibold mb-6">
          Transfer Money
        </h2>
        <h3 className=" text-white font-semibold mb-6">
          {profile?.balance} KWD
        </h3>
        <div>
          <h3> {userInfo?.username} </h3>
          <h3>{userInfo?.balance} KWD</h3>
        </div>
        <input
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className=" px-4 py-2 lightblue text-white rounded-md hover:bg-yellw-600 transition-colors gap-3"
          onClick={mutate}
        >
          Transfer
        </button>
      </div>
    </div>
  );
}

export default MoneyTransfer;
