
import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import { useGettingAllProjectsQuery ,useGetAllProfitLossEntriesQuery,useCalculateProfitPercentageForAllUsersMutation,useCreateProfitLossEntryMutation} from '../Admin side/ApprovingReceiptsApi';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const ProfitLoss = () => {

    const [isSlowNetwork, setIsSlowNetwork] = useState(false);

    useEffect(() => {
        // Check network speed
        const checkNetworkSpeed = async () => {
            try {
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (connection) {
                    const downlinkSpeed = connection.downlink;
                    setIsSlowNetwork(downlinkSpeed < 0.25); // Assuming 0.25 Mbps as threshold for slow network (2G)
                }
            } catch (error) {
                console.error('Error while detecting network speed:', error);
            }
        };

        checkNetworkSpeed();
    }, []);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
   
    const [calculateProfitPercentageForAllUsers] = useCalculateProfitPercentageForAllUsersMutation();
    const [createProfitLossEntry] = useCreateProfitLossEntryMutation();
    const { data, isLoading ,refetch } = useGettingAllProjectsQuery();
    const {data:profitLossEntry,isLoading:loading,refetch:refetching} = useGetAllProfitLossEntriesQuery()
    useEffect(()=>{
        refetch()
        refetching()
    },[])

    const [formData, setFormData] = useState({
        profitAmount: "",
        projectId: "",
        isProfitCalculated: false // Add a state to track if profit is calculated
    });

    useEffect(() => {
        // Check if data exists and projectId is set
        if (data && formData.projectId) {
            const selectedProject = data.data.find(project => project._id === formData.projectId);
            // Update isProfitCalculated state based on selected project
            setFormData(prevData => ({
                ...prevData,
                isProfitCalculated: selectedProject ? selectedProject.is_profit_calculated : false
            }));
        }
    }, [data, formData.projectId]);

    const formDataHandler = (event) => {
        const { name, value } = event.target;
    
        if (name === "projectId") {
            // Assuming you have a way to retrieve the investment amount based on the selected project
            const selectedProject = data.data.find(project => project._id === value);
            const totalInvestedAmount = selectedProject ? selectedProject.invested_amount : '';
    
            setFormData(prevData => ({
                ...prevData,
                projectId: value,
                totalInvestedAmount: totalInvestedAmount
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


 const handleCalculateProfit = () => {
        if (isSlowNetwork) {
            // Show error message for slow network
            toast.error("Your internet connection is too slow. Please try again later.");
        } else {
            // Proceed with API call
          
            calculateProfitPercentageForAllUsers({
                projectId: formData.projectId,
                profitAmount: formData.profitAmount,
                totalInvestedAmount: formData.totalInvestedAmount
            }).then((response) => {
                if (response.data) {
                    toast.success(response.data.message);
                    createProfitLossEntry({
                        user_id: userData._id,
                        project_id: formData.projectId,
                        amount: formData.profitAmount
                    });
                } else {
                    toast.error(response.data.error);
                }
            }).catch((error) => {
                console.error(error);
                toast.error("An error occurred. Please try again later.");
            });
        }
    };

    return (
        <>
        <div>
            <Navbar />
            <LeftSideBar />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <PropagateLoader color="#3B82F6" />
                </div>
            ) : (
                <div className='xl:pl-[12rem]'>
                <div className='mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5'>
                    <h2 className='text-bold text-2xl mx-auto w-full text-center py-10'> Calculate Profit / Loss here</h2>
                    <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
                        <label htmlFor="investment-amount" className="font-bold">
                            Select the Project
                        </label>

                        <select
                            name="projectId"
                            onChange={formDataHandler}
                            value={formData.projectId}
                            id="investment-amount"
                            className="sm:ml-2 p-1 my-3 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
                        >
                            <option>Select</option>
                            {data && data.data.map((project) => (
                                <option key={project.id} value={project._id}>{project.project_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="my-4">
                        <label
                            htmlFor="profitAmount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Enter the Profit / Loss
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={formDataHandler}
                                id="profitAmount"
                                name="profitAmount"
                                type="number"
                                autoComplete="profitAmount"
                                required
                                className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <button
    type="submit"
    className={`flex mx-auto w-[9rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${formData.isProfitCalculated && 'cursor-not-allowed opacity-50'}`}
    disabled={isLoading || formData.isProfitCalculated} 
    onClick={handleCalculateProfit}
>
    {formData.isProfitCalculated ? "No Investment Yet" : "Calculate Profit"} {/* Show loading text */}
</button>

                </div>
                </div>

            )}
        </div>
        <div className='xl:pl-[18rem] w-[full] flex justify-center mt-10 mb-10'>
        <table className='w-[90%]'>
  <thead>
    <tr>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Name</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Project Name</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Amount</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Date</th>
    </tr>
  </thead>
  <tbody>
    
    {profitLossEntry && profitLossEntry.entries.map((data, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.user_id.fullName}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.project_id.project_name}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.amount}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.createdAt}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
        </>
    );
};

export default ProfitLoss;
























// import React, { useState, useEffect } from 'react';
// import Navbar from '../dashboard/DashboardComponents/Navbar';
// import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
// import { useGettingAllProjectsQuery, useGetAllProfitLossEntriesQuery, useCalculateProfitPercentageForAllUsersMutation, useCreateProfitLossEntryMutation } from '../Admin side/ApprovingReceiptsApi';
// import { PropagateLoader } from 'react-spinners';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { NetworkStatus } from 'react-network-status';

// const ProfitLoss = () => {
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.user.userData);
//     const [calculateProfitPercentageForAllUsers] = useCalculateProfitPercentageForAllUsersMutation();
//     const [createProfitLossEntry] = useCreateProfitLossEntryMutation();
//     const { data, isLoading, refetch } = useGettingAllProjectsQuery();
//     const { data: profitLossEntry, isLoading: loading, refetch: refetching } = useGetAllProfitLossEntriesQuery();
//     const [isSlowNetwork, setIsSlowNetwork] = useState(false);

//     useEffect(() => {
//         // Check network speed
//         const checkNetworkSpeed = async () => {
//             try {
//                 const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
//                 if (connection) {
//                     const downlinkSpeed = connection.downlink;
//                     setIsSlowNetwork(downlinkSpeed < 0.25); // Assuming 0.25 Mbps as threshold for slow network (2G)
//                 }
//             } catch (error) {
//                 console.error('Error while detecting network speed:', error);
//             }
//         };

//         checkNetworkSpeed();
//     }, []);

//     useEffect(() => {
//         refetch();
//         refetching();
//     }, []);

//     if (profitLossEntry) {
//         console.log(profitLossEntry);
//     }

//     const [formData, setFormData] = useState({
//         profitAmount: "",
//         projectId: "",
//         isProfitCalculated: false // Add a state to track if profit is calculated
//     });

//     useEffect(() => {
//         // Check if data exists and projectId is set
//         if (data && formData.projectId) {
//             const selectedProject = data.data.find(project => project._id === formData.projectId);
//             // Update isProfitCalculated state based on selected project
//             setFormData(prevData => ({
//                 ...prevData,
//                 isProfitCalculated: selectedProject ? selectedProject.is_profit_calculated : false
//             }));
//         }
//     }, [data, formData.projectId]);

//     const formDataHandler = (event) => {
//         const { name, value } = event.target;

//         if (name === "projectId") {
//             // Assuming you have a way to retrieve the investment amount based on the selected project
//             const selectedProject = data.data.find(project => project._id === value);
//             const totalInvestedAmount = selectedProject ? selectedProject.invested_amount : '';

//             setFormData(prevData => ({
//                 ...prevData,
//                 projectId: value,
//                 totalInvestedAmount: totalInvestedAmount
//             }));
//         } else {
//             setFormData(prevData => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         }
//     };
//     console.log(formData);

//     const handleCalculateProfit = () => {
//         if (isSlowNetwork) {
//             // Show error message for slow network
//             toast.error("Your internet connection is too slow. Please try again later.");
//         } else {
//             // Proceed with API call
//             console.log(formData.projectId, formData.profitAmount, formData.totalInvestedAmount);
//             calculateProfitPercentageForAllUsers({
//                 projectId: formData.projectId,
//                 profitAmount: formData.profitAmount,
//                 totalInvestedAmount: formData.totalInvestedAmount
//             }).then((response) => {
//                 console.log(response);
//                 if (response.data) {
//                     toast.success(response.data.message);
//                     createProfitLossEntry({
//                         user_id: userData._id,
//                         project_id: formData.projectId,
//                         amount: formData.profitAmount
//                     });
//                 } else {
//                     toast.error(response.data.error);
//                 }
//             }).catch((error) => {
//                 console.error(error);
//                 toast.error("An error occurred. Please try again later.");
//             });
//         }
//     };

//     return (
//         <>
//             <div>
//                 <Navbar />
//                 <LeftSideBar />
//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-screen">
//                         <PropagateLoader color="#3B82F6" />
//                     </div>
//                 ) : (
//                     <div className='xl:pl-[12rem]'>
//                         <div className='mt-[7.6rem] xl:ml-[17rem] xl:w-[75%] w-[90%] mx-auto shadow-custom min-h-[70vh] p-5'>
//                             <h2 className='text-bold text-2xl mx-auto w-full text-center py-10'> Calculate Profit / Loss here</h2>
//                             <div className="flex sm:flex-row flex-col sm:justify-between mb-4">
//                                 <label htmlFor="investment-amount" className="font-bold">
//                                     Select the Project
//                                 </label>

//                                 <select
//                                     name="projectId"
//                                     onChange={formDataHandler}
//                                     value={formData.projectId}
//                                     id="investment-amount"
//                                     className="sm:ml-2 p-1 my-3 sm:w-[13.2rem] w-full bg-slate-100 rounded-md"
//                                 >
//                                     <option>Select</option>
//                                     {data && data.data.map((project) => (
//                                         <option key={project.id} value={project._id}>{project.project_name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="my-4">
//                                 <label
//                                     htmlFor="profitAmount"
//                                     className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                     Enter the Profit / Loss
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         onChange={formDataHandler}
//                                         id="profitAmount"
//                                         name="profitAmount"
//                                         type="number"
//                                         autoComplete="profitAmount"
//                                         required
//                                         className="focus:outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className={`flex mx-auto w-[9rem] mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${formData.isProfitCalculated && 'cursor-not-allowed opacity-50'}`}
//                                 disabled={isLoading || formData.isProfitCalculated}
//                                 onClick={handleCalculateProfit}
//                             >
//                                 {formData.isProfitCalculated ? "No Investment Yet" : "Calculate Profit"} {/* Show loading text */}
//                             </button>

//                         </div>
//                     </div>

//                 )}
//             </div>
//             <div className='w-[full] flex justify-center mt-10 mb-10'>
//                 <table className='w-[90%]'>
//                     <thead>
//                         <tr>
//                             <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Name</th>
//                             <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Project Name</th>
//                             <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Amount</th>
//                             <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                         {profitLossEntry && profitLossEntry.entries.map((data, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
//                                 <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.user_id.fullName}</td>
//                                 <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.project_id.project_name}</td>
//                                 <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.amount}</td>
//                                 <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.createdAt}</td>
//                                 <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default ProfitLoss;
