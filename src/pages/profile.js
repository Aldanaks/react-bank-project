// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  //   const [profile, setProfile] = useState({});

  const { data: profile } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getProfile,
  });

  console.log(profile);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1 > {profile.username}'s Profile</h1>
      <p >Balance: {profile.balance}</p>
    </div>
  );
};

export default Profile;
