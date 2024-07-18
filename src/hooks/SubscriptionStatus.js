import { useState, useEffect } from "react";
import axios from "axios";

const useSubscriptionStatus = (isAuthenticated) => {
  const [isActiveSubscription, setIsActiveSubscription] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchSubscriptionStatus = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          };

          const res = await axios.get(
            "http://localhost:8000/api/subscription/status/",
            config
          );
          setIsActiveSubscription(res.data.is_active);
        } catch (err) {
          console.error(err);
        }
      };

      fetchSubscriptionStatus();
    }
  }, [isAuthenticated]);
  console.log(isActiveSubscription);
  return isActiveSubscription;
};

export default useSubscriptionStatus;
