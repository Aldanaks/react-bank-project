// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

const Profile = () => {
  const [profile, setProfile] = useState({});




  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}'s Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Balance: {profile.balance}</p>
    </div>
  );
};

export default Profile;
