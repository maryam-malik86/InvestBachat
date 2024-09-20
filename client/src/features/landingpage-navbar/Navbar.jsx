import React from "react";
import { IoIosMenu } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="text-black fixed top-0 w-full z-[1]">
      <nav className="bg-indigo-400 text-xl flex justify-between px-[2rem] md:px-[4rem]  h-[5.35rem] font-bold items-center  drop-shadow-2">
        <div>
          Invest Bachat
        </div>
        <div className="bg-white w-[70%] h-[300vh] xl:hidden   xsm:w-[60%] md:w-[25rem] gap-4 flex xl:flex-row flex-col xl:static absolute top-0 left-0 min-h-dvh xl:w-[40rem] items-start xl:items-center px-8 xl:px-0 xl:py-0 xl:min-h-1 py-8 xl:justify-between text-black duration-300"
          style={{ left: isOpen ? '0' : '-100%' }} >
        <ul className="flex flex-col gap-4 overflow-auto h-[90vh] w-full"
        >
          <li className="mb-1 flex xl:hidden w-full justify-end text-2xl">
            <IoClose onClick={() => setIsOpen(false)} />
          </li>
          <li className="mb-5  xl:hidden block">Invest bachat</li>
          {/* {userData.role === "Member" &&( */}
          <li className="flex items-start gap-2 font-normal">
          <Link to={"/"} className="cursor-pointer">
            Home
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
          <Link to={"/products"} className="cursor-pointer">
            Products
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
          <Link to={"/portfolio"} className="cursor-pointer">
          Portfolio
          </Link>
        </li>

        {/* <li className="flex items-start gap-2 font-normal">
          <Link to="/ourstory" className="cursor-pointer">
            Our Stroy
          </Link>
        </li> */}

        <li className="flex items-start gap-2 font-normal">
          <Link to="/licence" className="cursor-pointer">
            Licence
          </Link>
        </li>
        <li className="flex items-start gap-2 font-normal  ">
  <button className=" ">
          <Link to={"/auth/login"} className="cursor-pointer">
            Log In
          </Link>
  </button>
        </li>

{/* )
} */}

        </ul>
        </div>

       <div className='flex items-center gap-2 md:gap-2'>

{/* ----------------------------------------------------------------- */}

<div className="xl:block hidden">
<ul className="flex  gap-4 overflow-auto w-full"
        >
          <li className="mb-1 flex xl:hidden w-full justify-end text-2xl">
            <IoClose onClick={() => setIsOpen(false)} />
          </li>
          <li className="mb-5  xl:hidden block">Invest bachat</li>
          {/* {userData.role === "Member" &&( */}
  <>
       


        
       

  


        <li className="flex items-start gap-2 font-normal">
          <Link to={"/"} className="cursor-pointer">
            Home
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
          <Link to={"/products"} className="cursor-pointer">
            Products
          </Link>
        </li>

        <li className="flex items-start gap-2 font-normal">
          <Link to={"/portfolio"} className="cursor-pointer">
          Portfolio
          </Link>
        </li>

        {/* <li className="flex items-start gap-2 font-normal">
          <Link to="/ourstory" className="cursor-pointer">
            Our Stroy
          </Link>
        </li> */}

        <li className="flex items-start gap-2 font-normal">
          <Link to="/licence" className="cursor-pointer">
            Licence
          </Link>
        </li>

  
  </>
{/* )
} */}




        </ul>
</div>
{/* --------------------------------------------------------------- */}

<li className="flex items-start gap-2 font-normal xl:block hidden ">
  <button className=" shadow-custom px-4 py-1 ml-2 rounded-lg text-white">
          <Link to={"/auth/login"} className="cursor-pointer">
            Log In
          </Link>
  </button>
        </li>

<span className="xl:block hidden text-xl">


</span>
        <IoIosMenu className="text-3xl xl:hidden block" onClick={() => setIsOpen(true)} />
        {/* <CiSearch className='text-2xl'/> */}
       </div>
      </nav>
    </div>
  );
};

export default Navbar;
