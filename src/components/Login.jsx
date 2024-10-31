// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { BeatLoader } from "react-spinners";
// import { Button } from "./ui/button";
// import Error from "./error";
// import * as Yup from "yup";
// import { login } from "@/db/apiAuth";
// import useFetch from './../hooks/use-fetch.jsx';
// import { useNavigate, useSearchParams } from "react-router-dom";

// const Login = () => {
//   const [error, setError] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   let [searchParams] = useSearchParams();
//   const longLink = searchParams.get("createnew");
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const {data,  errors, loading, fn : fnLogin} = useFetch( login, formData);
//   useEffect(() => {
//     // console.log(formData);
//     // console.log(data);
//     console.log('Data:', data);
// console.log('Errors:', errors);
//       if(errors === null && data){
//         navigate(`/dashboard?${longLink ? `createNew={longLink}` : ""}`)
//       }
//   }, [ data, error])

// const {data, errors, loading, fn: fnLogin} = useFetch(login, formData);
// useEffect(() => {
//   // console.log(data);
//   console.log('Data:', data);
//   console.log('Errors:', errors);
//   console.log('Loading:', loading);
//   console.log('FormData:', formData);;
//   if (errors === null && data) {
//     navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`)
//   }
// }, [data, errors, navigate, longLink])

//   const handleLogin = async () => {
//     setError([]);
//     try {
//       const schema = Yup.object().shape({
//         email: Yup.string()
//           .email("Invalid email")
//           .required("Email is required"),
//         password: Yup.string()
//           .min(6, "Password must be atleast  6 characters")
//           .required("Password is required"),
//       });
//       await schema.validate(formData, { abortEarly: false });

//       //api call
//       await fnLogin();

//     } catch (error) {
//       const newErrors = [];

//       error?.inner?.forEach((err) => {
//         newErrors[err.path] = err.message;
//       });

//       setError(newErrors);
//     }
//   };

//   // here used errors instead of error
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Login</CardTitle>
//         <CardDescription>
//           to your account if you already have one
//         </CardDescription>
//        {errors && <Error message={errors.message} />}
//       </CardHeader>
//       <CardContent className="space-y-2">

//         <div className="space-y-1 ">
//           <input
//             type="email"
//             placeholder="Enter Email"
//             name="email"
//             className="bg-transparent w-72 h-12 p-2"
//             onChange={handleInputChange}
//           />
//           <br />

//           {error.email && <Error message={error.email} className="inline" />}
//         </div>
//         <div className="space-y-1 py-2 ">
//           <input
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             className="bg-transparent w-72 h-12 p-2"
//             onChange={handleInputChange}
//           />
//           <br />
//           {/* <Error message={"some error"}/> */}
//           {error.email && <Error message={error.password} />}
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button onClick={handleLogin}>
//           {loading ? <BeatLoader size={10} color={"#36d7bc"} /> : "Login"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Login;


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
import { login } from "@/db/apiAuth";
import useFetch from './../hooks/use-fetch.jsx';
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
// import AdminDashboard from "@/pages/AdminDashboard";

const Login = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createnew");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error: fetchError, loading, execute: fnLogin } = useFetch(login);
  const {fetchUser} = UrlState();

  const handleLogin = useCallback(async () => {
    setError(null);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });

      console.log('Validation passed, calling fnLogin');
      const result = await fnLogin(formData);
      console.log('Login result:', result);

    } catch (error) {
      console.error('Login error:', error);
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
  }, [formData, fnLogin]);

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
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {fetchError && <Error message={fetchError.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? <BeatLoader size={10} color={"#36d7bc"} /> : "Login"}
        </Button>
      </CardFooter>
      {error?.general && <Error message={error.general} />}
      {/* <div>Debug - Loading state: {loading ? 'true' : 'false'}</div> */}
    </Card>
  );
};

export default Login;