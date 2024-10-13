import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchInvestmentProfilesMutation } from '../dashboard/dashboardApi'; // Adjust the path based on your structure
import { toast } from 'react-toastify';

const UserProfilesforProject = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [fetchInvestmentProfiles, { data: investmentProfiles, error, isLoading }] = useFetchInvestmentProfilesMutation();

  useEffect(() => {
    // Fetch investment profiles for the specific project when the component mounts
    fetchInvestmentProfiles(id);
  }, [fetchInvestmentProfiles, id]);

  // Handle error if it occurs
  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch investment profiles');
    }
  }, [error]);

  return (
    <div className="user-profiles-container">
      <h1>User Profiles for Project ID: {id}</h1>
      {isLoading && <p>Loading...</p>}
      {investmentProfiles && investmentProfiles.length === 0 && <p>No profiles found for this project.</p>}
      {investmentProfiles && investmentProfiles.length > 0 && (
        <ul>
          {investmentProfiles.map((profile) => (
            <li key={profile._id}>
              <h2>{profile.user_name}</h2>
              <p>Invested Amount: Rs {profile.invested_amount}</p>
              {/* Add more profile details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfilesforProject;
