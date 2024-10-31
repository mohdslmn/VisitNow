import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";
import Error from "./error";
import * as Yup from "yup";
import { signup } from "@/db/apiAuth";
import useFetch from './../hooks/use-fetch.jsx';
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
// import AdminDashboard from "@/pages/AdminDashboard";

const Signup = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createnew");

  const handleInputChange = (e) => {
    const { name, value, files} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error: fetchError, loading, execute: fnSignup } = useFetch(signup);
  const {fetchUser} = UrlState();

  const handleSignup = useCallback(async () => {
    setError(null);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile Pic is required"),
      });
      await schema.validate(formData, { abortEarly: false });

      // console.log('Validation passed, calling fnLogin');
      const result = await fnSignup(formData);
      console.log('Signup result:', result);

    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setError(newErrors);
      } else {
        setError({ general: error.message });
      }
    }
  }, [formData, fnSignup]);

  useEffect(() => {
    console.log('Data:', data);
    console.log('Error:', fetchError);
    console.log('Loading:', loading);
    console.log('FormData:', formData);
    
    if (fetchError === null && data) {
      navigate(`/admindashboard${longLink ? `?createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, fetchError, loading, navigate, longLink, formData]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          to new account if you don&rsquo;t have one
        </CardDescription>
        {fetchError && <Error message={fetchError.message} />}
      </CardHeader>
      <CardContent className="space-y-2">

      <div className="space-y-1">
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="bg-transparent w-72 h-12 p-2"
            onChange={handleInputChange}
            value={formData.name}
          />
          <br />
          {error?.name && <Error message={error.name} className="inline" />}
        </div>

        <div className="space-y-1">
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="bg-transparent w-72 h-12 p-2"
            onChange={handleInputChange}
            value={formData.email}
          />
          <br />
          {error?.email && <Error message={error.email} className="inline" />}
        </div>
        <div className="space-y-1 py-2">
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="bg-transparent w-72 h-12 p-2"
            onChange={handleInputChange}
            value={formData.password}
          />
          <br />
          {error?.password && <Error message={error.password} />}
        </div>

        <div className="space-y-1">
          <input
            type="file"
            accept="image/*"
            name="profile_pic"
            className="bg-transparent w-72 h-12 p-2"
            onChange={handleInputChange}
         
          />
          <br />
          {error?.profile_pic && <Error message={error.profile_pic} className="inline" />}
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} disabled={loading}>
          {loading ? <BeatLoader size={10} color={"#36d7bc"} /> : "Create Account"}
        </Button>
      </CardFooter>
      {error?.general && <Error message={error.general} />}
      {/* <div>Debug - Loading state: {loading ? 'true' : 'false'}</div> */}
    </Card>
  );
};




export default Signup;
