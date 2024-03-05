"use client";
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
  SuccessToast,
} from "@/utility/FormHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const Registration = () => {
  let router = useRouter();

  let [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    otp: "0",
  });
  let [submit, setSubmit] = useState(false);

  const inputChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    if (IsEmpty(data.firstName)) {
      ErrorToast("FirstName is required!");
    } else if (IsEmpty(data.lastName)) {
      ErrorToast("LastName is required!");
    } else if (IsMobile(data.mobile)) {
      ErrorToast("Valid mobile is required!");
    } else if (IsEmail(data.email)) {
      ErrorToast("Valid email is required!");
    } else if (IsEmpty(data.password)) {
      ErrorToast("Valid password is required!");
    } else {
      setSubmit(true);
      let options = { method: "POST", body: JSON.stringify(data) };
      let res = await (await fetch("/api/user/registration", options)).json();
      setSubmit(false);
      if (res["status"] === "success") {
        SuccessToast("Registration Completed Successfully!");
        router.push("/");
      } else {
        ErrorToast("Registration Failed!");
      }
    }
  };

  return (
    <div>
      <div className="row h-100 justify-content-center center-screen">
      <Toaster position="bottom-center"/>
        <div className="col-md-8 col-lg-8 col-sm-12 col-12 ">
          <div className="card container-fluid animated fadeIn p-5 gradient-bg">
            <div className="row ">
              <h5 className="mb-1 mx-0 px-0">User Registration</h5>
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <label className="form-label">First Name</label>
                <input
                  value={data.firstName}
                  onChange={(e) => {
                    inputChange("firstName", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <label className="form-label">Last Name</label>
                <input
                  value={data.lastName}
                  onChange={(e) => {
                    inputChange("lastName", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <label className="form-label">Mobile</label>
                <input
                  value={data.mobile}
                  onChange={(e) => {
                    inputChange("mobile", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <label className="form-label">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => {
                    inputChange("email", e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <label className="form-label">Password</label>
                <input
                  value={data.password}
                  onChange={(e) => {
                    inputChange("password", e.target.value);
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                <SubmitButton
                  className="btn btn-danger w-100 mt-3"
                  submit={submit}
                  onClick={formSubmit}
                  text="SignUp"
                />
                <div className="my-3 d-flex">
                  <Link href="/" className="nav-link mx-2">
                    Already have account? Sign In!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
