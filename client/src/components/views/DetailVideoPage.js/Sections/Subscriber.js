import axios from "axios";
import React, { useEffect } from "react";

const Subscriber = (props) => {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
        } else {
          alert("Failsed to get subscriber number");
        }
      });
  }, []);

  return (
    <div>
      <button
        style={{
          border: "none",
          backgroundColor: "#CC0000",
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Subscriber;
