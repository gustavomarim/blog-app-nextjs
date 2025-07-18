"use client";

import { getApiUrl } from "@/config/api";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRequest = async () => {
      const url = getApiUrl("users");
      const requestUrl = `${url}/profile`;

      console.log("🔍 URL da requisição:", requestUrl);

      const response = await fetch(requestUrl, {
        credentials: "include",
      });

      console.log("🚀 ~ UsersPage ~ response status:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ UsersPage ~ data:", data);
      }

      setLoading(false);
    };

    checkRequest();
  }, []);

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  return <p>Users</p>;
};

export default UsersPage;
