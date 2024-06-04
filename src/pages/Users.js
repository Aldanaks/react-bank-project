import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUsers } from "../api/auth";
import { Link } from "react-router-dom";

const User = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log(users);

  const [serachQuery, setSerachQuery] = useState("");

  const filteredUsers = users?.filter(
    (user) => {
      if (user?.username?.toLowerCase().includes(serachQuery.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }
    // user?.username?.includes(serachQuery)
  );

  const handleChange = (event) => {
    setSerachQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10">
      <div className="max-w-3xl w-full bg-gray-100 p-8 rounded-lg shadow-lg mb-10">
        {/* <h6>{serachQuery}</h6> */}

        <h2 className="text-2xl font-bold text-sky-700 mb-6">Users</h2>

        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers?.map((user) => (
            <div
              key={user._id}
              className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center"
            >
              <img
                src={`https://react-bank-project.eapi.joincoded.com/${user.image}`}
                alt="User"
                className="w-24 h-24 rounded-full mb-4"
              />
              <div className="text-center">
                <h3 className="text-lg text-sky-800 font-semibold mb-2">
                  {user.username}
                </h3>
                <p className="text-gray-300">{user.email}</p>
                <button className="mt-8 inline-block rounded bg-sky-600 px-12 py-3 text-lg font-medium text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                  <Link to={`/MoneyTrensfer/${user._id}`}>Transfer</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
