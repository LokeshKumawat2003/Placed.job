import React, { useState, useEffect } from "react";

const SignupComponent = () => {
  const x = localStorage.getItem("userID");
  useEffect(() => {
    fetch("http://localhost:8080/api/signup")
      .then((response) => response.json())
      .then((data) => {
        data.data.map((el, i) => {
          if (el._id == x) {
            console.log(el);
          }
        });
      })
      .catch((error) => {
        console.error(error); // Log any errors
      });
  }, []);

  return <></>;
};

export default SignupComponent;
