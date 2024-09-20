import React from 'react'
import { useState , useEffect,useRef } from 'react'
import { toast } from 'react-toastify';
import {useGettingAdminProjectByIdQuery , useUpdatedProjectByIdMutation} from "../../features/Admin side/ApprovingReceiptsApi"
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { PropagateLoader } from "react-spinners";
import { useNavigate,useParams } from 'react-router-dom';
const UpdateProject = () => {
    const navigate=useNavigate();
    const {id} = useParams();
    
    const {data,isLoading:isGettingProjectLoding, refetch: refetchProjectData} = useGettingAdminProjectByIdQuery(id);
    const [updatedProjectById ,{isLoading}] = useUpdatedProjectByIdMutation();

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
      console.log(error)
    })
  }


    const [formData, setformData] = useState({
        project_name:"",
        project_picture:"",
        description:"",
        required_investment:"",
        invested_amount:"",
        project_duration:"",
      });

      useEffect(() => {
        if (data) {
            // Update formData when data changes
            setformData({
                project_name: data.data.project_name,
                project_picture: data.data.project_picture,
                description: data.data.description,
                required_investment: data.data.required_investment,
                project_duration: data.data.project_duration,
              });
        }
    }, [data]);
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
        updatedProjectById({
          id:data.data._id,
            project_name: formData.project_name,
            project_picture: formData.project_picture,
            description: formData.description,
            required_investment: formData.required_investment,
            invested_amount: data.data.invested_amount,
            project_duration: formData.project_duration,
        })
        .unwrap()
        .then((response) => {
            toast.success("Project updated Successfully")
            refetchProjectData();
            navigate("/admin/allprojects")
        }).catch((error)=>{
          console.log(error)
            toast.error("An error occured, Please try again")
        })
      }

     

      const submitHandler = () => {
          handleUserData();
      };
      const fileInputRef = useRef(null);
  return (
    <>
        <Navbar/>
        <LeftSideBar/>
    {isGettingProjectLoding ? (
        <div className="flex justify-center items-center mt-32">
            <PropagateLoader color="#3B82F6" />
        </div>
    ) : (
      <div className='xl:ml-[17rem] mx-auto  p-5 mt-[7.8rem] w-[95%] xl:w-[97%]  shadow-custom min-h-[10rem] mb-10 py-10'>
    <div className='xl:pl-[17rem]' >
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
                    value={formData.project_name}
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
                    value={formData.description}
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
                    type="text"
                    required
                    value={formData.required_investment}
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div>

      <div className=" md:mb-0 mb-3">
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
                    disabled
                    value={data.data.invested_amount}
                    className="px-2 focus:outline-none  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
      </div>

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

      {/* <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
            <label htmlFor="investment-amount" className="font-bold">
              How much do you want to invest?
            </label>
            <select
              name="investment_amount"
              onChange={formDataHandler}
              value={formData.investment_amount}
              id="investment-amount"
              className="sm:ml-2 p-1 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
            >
              <option>Select</option>
              <option value="1000">1 Thousand</option>
              <option value="2000">2 Thousand</option>
              <option value="5000">5 Thousand</option>
              <option value="10000">10 Thousand</option>
              <option value="20000">20 Thousand</option>
              <option value="30000">30 Thousand</option>
              <option value="50000">50 Thousand</option>
              <option value="70000">70 Thousand</option>
              <option value="100000">100 Thousand</option>
            </select>
          </div> */}

      <label htmlFor="image-upload" className="font-bold h-[2rem]">
            Upload image :
          </label>

          <div className="mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                formDataHandler(e); // Update formData with the selected image
                submitImg(e); // Upload the selected image to Cloudinary
            }}
              className="hidden"
              id="fileInput"
              ref={fileInputRef}
            />
            {
    img ? (
        <div className="flex justify-center">
            <PropagateLoader color="#3B82F6" />
        </div>
    ) : formData.project_picture ? (
        <div className="mt-4 flex justify-center ">
            <img
                src={formData.project_picture}
                alt="Receipt Preview"
                className="md:w-[40%] w-[100%] h-[100%] object-cover "
                onClick={() => fileInputRef.current.click()}
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
    )
}
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
                {isLoading ? "Updating Project ..." : "Update Project"} 
                
              </button>
    </div>
    </div>
    )}
    </>
  )
}

export default UpdateProject
