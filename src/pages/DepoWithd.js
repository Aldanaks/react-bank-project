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
  return (
    <div className="">
      <div
        className="navyblue min-h-screen flex items-center justify-center absolute inset-0 z-[-1] flex-col gap-3"
        style={{ position: "fixed" }}
      >
        <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">
          <h3 className=" text-white font-semibold mb-6">
            Your available Balance :{" "}
          </h3>

          <h3 className=" text-white font-semibold mb-6">
            {profile?.balance}KWD
          </h3>
        </div>

        {/* toggle switch you need a state  */}

        <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md ">
          <div className="flex gap-5 text-white justify-center">
            <h1>Deposit</h1>
            <label
              for="AcceptConditions"
              class="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
            >
              {/* You need to manage the state from here */}

              <input
                onClick={() => {
                  if (choice == "deposit") setChoice("withdraw");
                  else setChoice("deposit");
                }}
                type="checkbox"
                id="AcceptConditions"
                class="peer sr-only"
              />

              <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
            </label>
            <h1>Withdraw</h1>
          </div>

          <h3>Amount</h3>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="Amount"
            className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            aria-describedby="search-addon"
          />

          <button
            onClick={onSubmit}
            type="submit"
            className="px-4 py-2 lightblue text-white rounded-md hover:bg-yellw-600 transition-colors"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
