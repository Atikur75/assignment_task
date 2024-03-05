"use client";
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import {
  ErrorToast,
  IsEmpty,
  SuccessToast,
} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const OtpVerify = () => {
  const router = useRouter();
  let [data, setData] = useState({ email: "", otp: "" });
  let [submit, setSubmit] = useState(false);

  const inputChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    if (IsEmpty(data.email)) {
      ErrorToast("Valid email is required!");
    } else if (IsEmpty(data.otp)) {
      ErrorToast("Valid otp is required!");
    } else {
      setSubmit(true);
      let options = { method: "POST", body: JSON.stringify(data) };
      let res = await (await fetch("/api/user/verifyOTP", options)).json();
      setSubmit(false);
      if (res["status"] === "success") {
        SuccessToast("Login Successfull!");
        router.push("/user/dashboard");
      } else {
        ErrorToast("OTP Verify Failed!");
      }
    }
  };

  return (
    <div>
      <div className="row h-100 justify-content-center center-screen">
      <Toaster position="bottom-center"/>
        <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
          <div className="card animated fadeIn p-5 gradient-bg">
            <h5 className="mb-3">Verification PIN</h5>
            <label className="form-label">User Email</label>
            <input
              value={data.email}
              onChange={(e) => {
                inputChange("email", e.target.value);
              }}
              type="email"
              className="form-control mb-2"
            />
            <label className="form-label">6 Digit Code</label>
            <input
              value={data.otp}
              onChange={(e) => {
                inputChange("otp", e.target.value);
              }}
              type="password"
              className="form-control mb-2"
            />
            <SubmitButton
              onClick={formSubmit}
              className="btn btn-danger mt-3"
              submit={submit}
              text="Verify"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
