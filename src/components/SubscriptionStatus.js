// SubscriptionStatus.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "react-bootstrap";

const SubscriptionStatus = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const accessToken = localStorage.getItem("access");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8000/api/subscription/check/",
          config
        );

        setIsSubscribed(true); // Actualizar estado si el usuario está suscrito
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  return (
    <>
      {isSubscribed ? (
        <Badge bg="warning">Suscrito</Badge>
      ) : (
        <Badge bg="secondary">No suscrito</Badge>
      )}
    </>
  );
};

export default SubscriptionStatus;
