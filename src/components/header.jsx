import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookAIcon, LinkIcon, LogOut, TractorIcon } from "lucide-react";
import UseFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

import { UrlState } from "@/context";

// import logo from '././public/medicalAppLogo.jpg'
// import FLogo from './src/public/assets/FLogo.png';
import logo from "../assets/nlogon.png"
const Header = () => {
  const navigate = useNavigate();
  const {user , fetchUser} = UrlState();
  const {loading , execute: fnLogOut} = UseFetch(logout);
  return (
    <>
    <nav className=" flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="medicalAppLogo" className="h-24" />
        
      </Link>
      

      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden ">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="w-4 h-4 mr-2"/>
                <span>Profile</span></DropdownMenuItem>
              <DropdownMenuItem>
                <BookAIcon className="mr-2 h-4 w-4"/>
                <span>Booking</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TractorIcon className="w-4 h-4 mr-2" />
                <span>Track</span></DropdownMenuItem>
              <DropdownMenuItem className='text-red-400'>
                <LogOut className='mr-2 h-4 w-4' />
                <span onClick={() => {
                  fnLogOut().then(() => {
                    fetchUser();
                    navigate("/")
                  });
                  
                }}>Logout</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
     
    </nav>
    {loading && <BarLoader className="mb-4" width={'100%'} color="#36d7b7"></BarLoader>}
    </>
  );
};

export default Header;
