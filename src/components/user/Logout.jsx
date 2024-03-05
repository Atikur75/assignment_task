"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    let options = { method: "GET" };
    let res = await (await fetch("/api/user/logout", options)).json();
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
