import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getTrans } from "../api/auth";

const Transactions = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTrans,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("All");

  const handleSearch = () => {
    if (!transactions) return [];
    
    let filtered = transactions;

    if (filterType !== "All") {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter(transaction => 
        transaction.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt.substring(0, 10));
        return from <= transactionDate && transactionDate <= to;
      });
    }

    return filtered;
  };

  const filteredTransactions = handleSearch();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-xl mb-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Transactions</h1>
          <input
            type="search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Search by amount"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-3 justify-center mb-4">
            <div className="flex flex-col items-center">
              <label className="mb-2 text-gray-700">From</label>
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="mb-2 text-gray-700">To</label>
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="mt-8 inline-block rounded bg-sky-600 px-12 py-3 text-lg font-medium text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
              >
              Search
            </button>
          </div>
        </div>
        <div className="flex gap-3 justify-center mb-6">
          <div>
            <input
              type="radio"
              name="type"
              value="All"
              className="mr-1"
              checked={filterType === "All"}
              onChange={() => setFilterType("All")}
            />
            <label className="text-gray-700">All</label>
          </div>
          <div>
            <input
              type="radio"
              name="type"
              value="deposit"
              className="mr-1"
              checked={filterType === "deposit"}
              onChange={() => setFilterType("deposit")}
            />
            <label className="text-gray-700">Deposit</label>
          </div>
          <div>
            <input
              type="radio"
              name="type"
              value="withdraw"
              className="mr-1"
              checked={filterType === "withdraw"}
              onChange={() => setFilterType("withdraw")}
            />
            <label className="text-gray-700">Withdraw</label>
          </div>
          <div>
            <input
              type="radio"
              name="type"
              value="transfer"
              className="mr-1"
              checked={filterType === "transfer"}
              onChange={() => setFilterType("transfer")}
            />
            <label className="text-gray-700">Transfer</label>
          </div>
        </div>
        <div>
          {isLoading ? (
            <p className="text-gray-700 text-center">Loading...</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md"
              >
                <p className="text-gray-800">Amount: {transaction.amount}</p>
                <p className="text-gray-800">Type: {transaction.type}</p>
                <p className="text-gray-800">
                  Date: {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

