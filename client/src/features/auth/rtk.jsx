import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from 'axios';
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),
    login: builder
      .mutation({
        query: ({ email, password,otp_value }) => ({
          url: `loginPage`,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          credentials: 'include',
          body: { email, password,otp_value },
        }),
        invalidatesTags: ["signins"],
      }),
    signUp: builder
      .mutation({
        query: ({ email, password, role = "Member",mobileNumber,cnicNumber,fullName,fatherName,optionalMobileNumber,gender ,kinName, kinCnic,kinMobileNumber,kinAnotherNumber,secondkinName, secondkinCnic,secondkinMobileNumber,secondkinAnotherNumber  }) => ({
          url: `signUp`,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          credentials: 'include',
          body: { email, password, role ,mobileNumber,cnicNumber,fullName,fatherName,optionalMobileNumber,gender ,kinName, kinCnic,kinMobileNumber,kinAnotherNumber,secondkinName, secondkinCnic,secondkinMobileNumber,secondkinAnotherNumber},
        }),
        invalidatesTags: ["signins"],
      }),
      
      resetPassword: builder
      .mutation({
        query: ({ email,oldPassword, password,confirmPassword }) => ({
          url: `resetPassword`,
          method: "POST",
          body: { email,oldPassword, password,confirmPassword },
        }),
        invalidatesTags: ["signins"],
      }),

      forgotPassword: builder
      .mutation({
        query: ({ email , cnicNumber , password,confirmPassword}) => ({
          url: `forgotPassword`,
          method: "POST",
          body: { email , cnicNumber , password,confirmPassword},
        }),
        invalidatesTags: ["signins"],
      }),

  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useFetchUserQuery,
} = authApi;

const checkUserExistence = async (userId) => {
  try {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend API
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkUser/${userId}`);
    console.log(response)
    // return response.data.exists; // Assuming the backend API returns { exists: true/false }
  } catch (error) {
    // Handle errors here, such as network errors or server errors
    console.error('Error checking user existence:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default checkUserExistence;