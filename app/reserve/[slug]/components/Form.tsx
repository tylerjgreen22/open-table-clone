"use client";

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();
  const [day, time] = date.split("T");

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    } else {
      return setDisabled(true);
    }
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w=[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            placeholder="First Name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            name="bookerLastName"
            placeholder="Last Name"
            value={inputs.bookerLastName}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            name="bookerPhone"
            placeholder="Phone Number"
            value={inputs.bookerPhone}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            name="bookerEmail"
            placeholder="Email"
            value={inputs.bookerEmail}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            name="bookerOccasion"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 w-80 mb-4"
            type="text"
            name="bookerRequest"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            onChange={handleChange}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>

          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
