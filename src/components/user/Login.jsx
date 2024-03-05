"use client";
import React, { useState } from "react";
import Link from "next/link";
import SubmitButton from "../master/SubmitButton";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {

  let router = useRouter();

  let [data, setData] = useState({email:"", password:""});
  let [submit, setSubmit] = useState(false);

  const inputChange = (name,value)=>{
    setData((data)=>({
      ...data,
      [name]: value
    }))
  }

  const formSubmit = async ()=>{
    if(IsEmail(data.email)){
      ErrorToast("Valid Email Address Required!");
    }
    if(IsEmpty(data.password)){
      ErrorToast("Valid Password Is Required!");
    }
    else {
      setSubmit(true);
      const options = {method: "POST", body: JSON.stringify(data)};
      let res = await (await fetch("/api/user/login",options)).json();
      setSubmit(false);
      setData({email: "",password: ""});
      if(res['status'] === "success" ){
        SuccessToast("OTP Sent Successfully! Please Check Your Email!");
        Cookies.set('user', JSON.stringify({ email: data.email }));
        router.push("user/verifyOTP");
        
      }else {
        ErrorToast("Invalid User!");
      }

    }
  }

  return (
    <div className="row h-100 justify-content-center center-screen">
      <Toaster position="bottom-center"/>
      <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
        <div className="card animated fadeIn p-5 gradient-bg">
          <h5 className="mb-3">User Login</h5>
          <label className="form-label">User Email</label>
          <input
            value={data.email}
            onChange={(e)=>{inputChange("email", e.target.value)}}
            type="email"
            className="form-control mb-2"
          />
          <label className="form-label">User Password</label>
          <input
            value={data.password}
            onChange={(e)=>{inputChange("password", e.target.value)}}
            type="password"
            className="form-control mb-1"
          />
          <SubmitButton
            onClick={formSubmit}
            className="btn btn-danger mt-3"
            submit={submit}
            text="Login"
          />
          <div className="my-3 d-flex">
            <Link href="/user/registration" className="nav-link mx-2">
              Don't have account? Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
