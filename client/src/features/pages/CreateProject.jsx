import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import {useCreateProjectMutation} from "../../features/Admin side/ApprovingReceiptsApi"
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { PropagateLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
    const navigate=useNavigate();
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const [img,setImg] = useState(false);
  const submitImg = (e)=>{
    const file = e.target.files[0]
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","vnkvr19i");
    data.append("cloud_name","deiuxbyphp")
    setImg(true);
    fetch("https://api.cloudinary.com/v1_1/deiuxbyph/image/upload",{
      method:"post",
      body:data
    }).then((response)=>response.json())
    .then((data)=>{
     

      setformData((prevData) => ({
        ...prevData,
        project_picture: data.url
      }));
    setImg(false)
    }).catch((error)=>{
      setImg(false)
    })
  }


    const [formData, setformData] = useState({
        project_name:"",
        project_picture:"",
        description:"",
        required_investment:"",
        invested_amount:"0",
        project_duration:"",
        showAmounts:false
      });
      function formDataHandler(event) {
        setformData((prevData) => {
          const { name, value, checked, type } = event.target;
          return {
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
          };
        });
      }

      const handleUserData =()=>{
        createProject({
            project_name: formData.project_name,
            project_picture: formData.project_picture,
            description: formData.description,
            required_investment: formData.required_investment,
            invested_amount: formData.invested_amount,
            project_duration: formData.project_duration,
            showAmounts:formData.showAmounts
        })
        .unwrap()
        .then((response) => {
            toast.success("Project Created Successfully")
            navigate("/admin/allprojects")
        }).catch((error)=>{
            toast.error("An error occured, Please try again")
        })
      }

      

      const submitHandler = () => {
          handleUserData();
      };

  return (
    <>
        <Navbar/>
        <LeftSideBar/>
      <div className='xl:ml-[17rem] mx-auto p-5 mt-[7.8rem] w-[95%] xl:w-[97%] shadow-custom min-h-[10rem] mb-10 py-10'>
    <div className='xl:pl-[17rem]'>
      <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="project_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Project Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="project_name"
                    name="project_name"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>


        
      </div>
      
      <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Description
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={formDataHandler}
                    id="description"
                    name="description"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div>

      <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="required_investment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Required Investment
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="required_investment"
                    name="required_investment"
                    type="Number"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div>

      {/* <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="invested_amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Invested Amount
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="invested_amount"
                    name="invested_amount"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div> */}

      {/* <div className=" md:mb-0 mb-3">
                <label
                  htmlFor="project_duration"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project duration
                </label>
                <div className="mt-2">
                  <input
                    onChange={formDataHandler}
                    id="project_duration"
                    name="project_duration"
                    type="text"
                    required
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div> */}


<div className="flex sm:flex-row flex-col sm:justify-between mb-4 my-10">
            <label htmlFor="investment-amount" className="font-bold">
              Project Duration ?
            </label>
            <select
              name="project_duration"
              onChange={formDataHandler}
              value={formData.project_duration}
              id="project_duration"
              className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
            >
              <option>Select</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="10 Years">10 Years</option>
            </select>
          </div>


          <div className="flex sm:flex-row  sm:justify-start my-3">
        <label htmlFor="showAmounts" className="font-bold">
          Show Amounts to the user <input id="showAmounts" name="showAmounts" checked={formData.showAmounts} onChange={formDataHandler} type="checkbox" />
        </label>
        
      </div>


      <label htmlFor="image-upload" className="font-bold h-[2rem]">
            Upload image :
          </label>

          <div className="mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>submitImg(e)}
              className="hidden"
              id="fileInput"
            />
            {
            img ? (
              <div className="flex justify-center">
                <PropagateLoader color="#3B82F6" />
              </div>
            ) :formData.project_picture ? (
              <div className="mt-4 flex justify-center ">
                <img
                  src={formData.project_picture}
                  alt="Receipt Preview"
                  className="md:w-[40%] w-[100%] h-[100%] object-cover "
                />
              </div>
            ) : (
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-full h-[5rem] sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 dark:hover:bg-gray-300"
              >
                <div className="flex flex-col  items-center justify-center pt-5 pb-6">
                  <svg
                    className="sm:block hidden w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>{" "}
                    Project Photo
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </p>
                </div>
              </label>
            )}
          </div>



      <button
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 mx-auto mt-8 w-[10rem] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>{
                    if(formData.project_name === "" || formData.project_picture === "" || formData.description === "" || formData.required_investment === "" || formData.invested_amount === "" || formData.project_duration === ""){
                        toast.error("Please fill all fields")
                        
                    }else{
                        submitHandler()
                    }
                }}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Creating Project ..." : "Create Project"} 
                
              </button>
    </div>
    </div>
    </>
  )
}

export default CreateProject
