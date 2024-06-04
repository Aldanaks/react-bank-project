import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

import { deposit, getProfile, login, withdraw } from "../api/auth";

export default function DepoWithd() {
  const [amount, setAmount] = useState(0);
  const [choice, setChoice] = useState("deposit");

  const queryClient = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getProfile,
  });

  const { mutate: withdrawMuatate } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: () => withdraw(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyInfo"]);
    },
  });

  const { mutate: depositMutate } = useMutation({
    mutationKey: ["deposit"],
    mutationFn: () => deposit(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyInfo"]);
    },
  });

  const onSubmit = () => {
    if (choice == "deposit") {
      depositMutate();
    } else {
      withdrawMuatate();
    }
  };
  const isValidInput = (input) => {
    return !isNaN(input) && input >= 0;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-6">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
          <h3 className="text-gray-800 font-semibold mb-6">
            Your available Balance :
          </h3>
          <h3 className="text-gray-800 font-semibold mb-6">
            {profile?.balance} KWD
          </h3>
        </div>

        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex gap-5 text-gray-800 justify-center mb-4">
            <h1>Deposit</h1>
            <label
              htmlFor="AcceptConditions"
              className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition-all"
            >
              <input
                onClick={() => {
                  if (choice === "deposit") setChoice("withdraw");
                  else setChoice("deposit");
                }}
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 left-0 m-1 w-6 h-6 rounded-full bg-white transition-all peer-checked:left-6 peer-checked:bg-green-500"></span>
            </label>
            <h1>Withdraw</h1>
          </div>

          <h3 className="mb-4 text-gray-800">Amount</h3>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Amount"
          />
          {isValidInput(amount) && (
            <button
              onClick={onSubmit}
              type="submit"
              className="mt-8 inline-block rounded bg-sky-600 px-5 py-3 text-lg font-medium text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
