import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from '@/components/Login';
import Signin from '@/components/Signup';
import { UrlState } from '@/context';


const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

    const {isAuthenticated , loading} = UrlState();

    useEffect( () => {
      if(isAuthenticated && !loading){
        navigate(`/admindashboard${longLink ? `?createNew=${longLink}` : ""}`);
      }
    },[isAuthenticated , loading])
  return (
    <div className='flex mt-36 flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>
      {
        longLink
        ? "Login First" : "LOGIN / SIGNUP"
      }
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="login">
   Login
    </TabsTrigger>
    <TabsTrigger value="signup">
      Signin
    </TabsTrigger>
  </TabsList>
  <TabsContent value="login">
  <Login></Login>
  </TabsContent>
  <TabsContent value="signup">
  <Signin></Signin>
  </TabsContent>
</Tabs>

    </div>
  )
}

export default Auth
