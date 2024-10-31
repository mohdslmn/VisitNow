// import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/ui/Footer";
const AppLayout = () => {
  return (
    <div className="">
      <main className="min-h-screen mx-8 my-4 mt-2 ">
        {/* <header></header> */}
        <Header />
        <Outlet />
      </main>

      {/* <footer></footer> */}
      <Footer />

      
   

     

      
    </div>
  );
};

export default AppLayout;
