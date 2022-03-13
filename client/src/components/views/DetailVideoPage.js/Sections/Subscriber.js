import axios from "axios";

import React, { useEffect, useState } from "react";

const Subscriber = (props) => {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to Unsubscribe");
          }
        });
    } else {
      axios
        .post("/api/subscribe/subscribe", subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to subscribe");
          }
        });
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("Failsed to get subscriber number");
        }
      });

    axios.post("/api/subscribe/subscribed").then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("Failed to get Subscribed Information");
      }
    });
  }, []);

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          border: "none",
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {SubscribeNumber}
        {Subscribed ? " Subscribed " : " Subscribe"}
      </button>
    </div>
  );
};

export default Subscriber;
