import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export const userDataSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    error: null,
    loading:true
  },
  reducers: {
    signUpSuccess: (state, action) => {
        state.userData = action.payload;
        state.error = null; // Clear any previous errors
        state.loading = false
      },
      signUpFailure: (state, action) => {
        state.error = action.payload.message;
        state.loading = false
      },
      setUserData: (state, action) => {
        state.userData = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setToNull:(state)=>{
        state.userData = null;
      }
  },
});

export const checkUserExistence = async (userId) => {
  try {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkUser/${userId}`);
    return response.data.exists
    // return response.data.exists; // Assuming the backend API returns { exists: true/false }
  } catch (error) {
    // Handle errors here, such as network errors or server errors
    console.error('Error checking user existence:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


export const { signUpSuccess, signUpFailure,setUserData,setLoading ,setToNull } = userDataSlice.actions;
export default userDataSlice.reducer;

