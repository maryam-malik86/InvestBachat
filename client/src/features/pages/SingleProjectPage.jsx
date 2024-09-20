import React, { useState } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { useGetProjectByIdQuery } from "../investments/MemberProjectApi";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useParams } from "react-router-dom";
import AdminBankDetailsComponent from "../billing/components/AdminBankDetails";
const SingleProjectPage = () => {
 

  const { id } = useParams();
  const { data, isLoading } = useGetProjectByIdQuery(id);
  const [flag,setFlag] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#3B82F6" />
      </div>
    );
  }
  const {
    project_name,
    project_picture,
    description,
    showAmounts,
    required_investment,
    invested_amount,
    project_duration,
  } = data.data;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const descriptionContent = showMore ? description : description.slice(0, 100)+"...";

  const showMoreButton = description.length > 100 && (
    <button
      onClick={toggleShowMore}
      className="text-blue-500 underline"
    >
      {showMore ? "Show Less" : "Show More"}
    </button>
  );

  return (
    <div className="z-[0]">
      <Navbar />
      <LeftSideBar />
      <div className="pb-5 xl:ml-[17rem] mt-[7.8rem]  sm:min-h-[10rem] z-[-99] bg-white sm:shadow-custom mb-10 xl:w-[75%] w-[100%] sm:w-[90%]  p-5 sm:rounded-2xl flex sm:mx-auto flex-col items-center gap-7">
        <img className="w-[100%] h-[15rem] object-cover rounded-2xl " src={project_picture} alt="" />
        <div className="text-[1.8rem] font-bold text-center underline ">{project_name}</div>
        <p className="w-[100%] text-center px-5 mb-8 ">{descriptionContent}
    {showMoreButton}</p>


    {
          showAmounts ? (
            <div className="w-full text-black">
              <div>Required Investment : {required_investment}</div>
              <div>Invested Amount : {invested_amount}</div>
              <div>Project Duration : {project_duration}</div>
            </div>
          ):null
        }


        <button onClick={()=>{
          setFlag(!flag)
        }} className="w-[8rem] text-lg px-2 py-2 flex  justify-center rounded-md bg-indigo-600  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Invest Now</button>



       { (flag ? 
       <div className="w-full">
         <AdminBankDetailsComponent id={id} />
       </div>

      : null)}


    
      


    </div>
    </div>
  );
};

export default SingleProjectPage;
