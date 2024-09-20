import React,{useEffect,useState} from 'react'
import Navbar from '../dashboard/DashboardComponents/Navbar';
import LeftSideBar from '../dashboard/DashboardComponents/LeftSideBar';
import {useSubtractAmountFromDonationMutation,useGetAllDonationsQuery} from '../Admin side/ApprovingReceiptsApi'
import { PropagateLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
const ApprovingMemberDonation = () => {
  const navigate = useNavigate();
  const{data,isLoading,refetch} = useGetAllDonationsQuery()
  useEffect(()=>{
    refetch()
  },[])
  
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);


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

  useEffect(() => {
      checkNetworkSpeed();
  }, []);


  const [subtractAmountFromDonation, { loading }] = useSubtractAmountFromDonationMutation();

    return (
        <div className="z-[0] min-h-[10rem] ">
          <Navbar />
          <LeftSideBar />
    
          <div className="">
            <div className="xl:pl-[16rem] mx-auto xl:w-[96%] w-[95%] mt-[7.8rem]">
              {isLoading ? (
                <div className="flex justify-center items-center h-[full]">
                  <PropagateLoader color="#3B82F6" />
                </div>
              ) : (
                <div>
  {data && data.length > 0 ? (
    data.map((approveDonations) => (
      <div className="my-4" key={approveDonations._id}>
        <div className="flex md:flex-row flex-col  md:justify-between md:gap-0 gap-5 md:py-0 sm:py-1 py-3 items-center px-3 bg-gray-200 w-[100%] rounded-lg">
          <div className="md:w-[60%] flex md:flex-row flex-col w-full md:gap-0 gap-3 text-center justify-between">
            <div>{approveDonations.user_id.fullName}</div>
            <div className=""> <span className=' md:invisible visible'>Donation amount : </span> {approveDonations.donation_amount}</div>
          </div>

          <div className="flex gap-2">
            <button
              className="h-[3rem] w-[5rem] bg-indigo-500 text-white rounded-lg"
              onClick={async () => {
                await checkNetworkSpeed()
                if (isSlowNetwork) {
                  // Show error message for slow network
                  toast.error("Your internet connection is too slow. Please try again later.");
              } else {
                subtractAmountFromDonation({
                  donation_amount: approveDonations.donation_amount,
                  user_id: approveDonations.user_id._id,
                  donation_id: approveDonations._id,
                }).then((response)=>{
                  if(response.data){
                    toast.success("Donation approved successfully")
                    refetch()
                  }
                
                }).catch((error)=>{
                  toast.error("Network issue ")
                })
               
              }}}
              disabled={loading}
            >
             {loading ? 'Loading...' : 'Approve'}
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="flex flex-col justify-center items-center h-screen text-2xl font-bold text-indigo-500 space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-12 w-12 text-indigo-500"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      No pending left
    </div>
  )}
</div>

              )}
            </div>
          </div>
        </div>
      );
}

export default ApprovingMemberDonation
