// export default function transactions() {
//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };
// }

// console.log(data);
// const Transaction = () => {
//   trans = getTrans.map(data);
// };

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTrans } from "../api/auth";

const Transactions = () => {
  const { data } = useQuery({
    queryKey: [""],
    queryFn: getTrans,
  });
  console.log(data);
  return (
    <div className="navyblue text-white min-h-screen flex items-center justify-center">
      <div className="bg-sky-900 text-black min-h-screen flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <div className="input-group rounded">
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="search"
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                // onChange={handleChange}
              />
              <button
                type="button"
                className="lightblue px-4 py-2 text-white rounded-md hover:bg-yellw-600 transition-colors"
              >
                {" "}
                search{" "}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <h3>Filter: </h3>
              <div>
                <input type="radio" name="type" value="All" />
                <label>All</label>
              </div>
              <div>
                <input type="radio" name="type" value="deposit" />
                <label>Deposit</label>
              </div>
              <div>
                <input type="radio" name="type" value="withdraw" />
                <label>Withdraw</label>
              </div>
              <div>
                <input type="radio" name="type" value="transfer" />
                <label>Transfer</label>
                {/* <div>{Transaction}</div> */}
              </div>
            </div>
          </div>
        </div>
        getAllTrans
      </div>
    </div>
  );
};
export default Transactions;
