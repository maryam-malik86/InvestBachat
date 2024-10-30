import React from "react";
import {useEffect} from "react";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import {useGettingAllProjectsQuery ,useDeleteProjectMutation} from "../Admin side/ApprovingReceiptsApi"
import PropagateLoader from "react-spinners/PropagateLoader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AllProjects = () => {
  const { data, error, isLoading, refetch } = useGettingAllProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  useEffect(()=>{
    refetch();
  },[])

  return (
    <div>
      <div className="z-[0] relative">
        <Navbar />
        <LeftSideBar className="" />
        {/* <div className="absolute right-[5rem] rounded-full bg-red-500 p-5">
        <FaPlus />
        </div> */}
        {
          isLoading ? (<div className="flex justify-center items-center h-screen">
          <PropagateLoader color="#3B82F6" />
        </div>):(<div className="xl:ml-[17rem] mt-[7.8rem] xl:w-[75%] w-[100vw] px-4 text-[2rem] min-h-[10rem] font-bold flex justify-center flex-wrap gap-7">
          {data && data.data.map((project) => {
            return (
                <div className=" shadow-custom pb-3 rounded-lg">
                
              <Link>
                <div id={project._id} className="  sm:w-[22rem] mx-auto w-[92vw] min-h-[20rem] mb-5 rounded-lg  shadow-custom  p-5">
                  <div className="w-[100%] h-[14rem] overflow-hidden">
                  <img
                    className="w-[100%]  h-[14rem] object-cover transition-transform transform hover:scale-110"
                    src={project.project_picture}
                    alt=""
                  />
                  </div>
                  <p className="text-xl text-indigo-500 text-center pt-4">
                    {project.project_name}
                  </p>
                </div>
              </Link>
                  <div className="text-lg text-white flex gap-3 justify-center">
                    <button onClick={()=>deleteProject(project._id)
                    .unwrap()
                    .then(() =>{ 
                        toast.success("Project Deleted successfully")
                        // window.location.reload();
                    }).catch(()=>{
                      toast.error("Cannot delete the project as it is associated with an investment profile")
                    })
                } className="w-[5rem] py-1 rounded-lg bg-red-500">Delete</button>
                    <Link to={`/admin/allprojects/updateproject/${project._id}`}>
                    <button className="w-[5rem] py-1 rounded-lg bg-indigo-500">Update</button>
                    </Link>
                  </div>
                  </div>
            );
          })}
        </div>)
        }
        
      </div>
    </div>
  );
};

export default AllProjects;
