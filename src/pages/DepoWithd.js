import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

import { deposit } from "../api/auth";





export default function DepoWithd() {

  const { mutate } = useMutation({

    mutationKey: ["DepoWithd"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);

    }})



  // const { data } = useQuery({

  //   queryKey: [""],

  //   queryFn: deposit(),

  // });




  const [query, setQuery] = useState("");




  const handleChange = (e) => {

    setQuery(e.target.value);

  };




  const [amount, setAmount] = useState(data);

  // useEffect(() => {

  //   document.title = query + data; needs fixing

  // });

  // available balance (from the user)+ query , correct one




  return (

    <div>

      <div

        className="navyblue min-h-screen flex items-center justify-center absolute inset-0 z-[-1]"

        style={{ position: "fixed" }}

      >

        <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">

          <h3 className=" text-white font-semibold mb-6">

            Your available Balance :{" "}

          </h3>

          <h3 className=" text-white font-semibold mb-6">{}KWD</h3>

        </div>

        {/* toggle switch you need a state  */}

        <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">

          <label

            for="AcceptConditions"

            class="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"

          >

            {/* You need to manage the state from here */}

            <input type="checkbox" id="AcceptConditions" class="peer sr-only" />




            <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>

          </label>




          <h3>Amount</h3>

          <input

            type="Amount"

            className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

            placeholder="Amount"

            aria-describedby="search-addon"

            onChange={handleChange}

          />

          <button

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



