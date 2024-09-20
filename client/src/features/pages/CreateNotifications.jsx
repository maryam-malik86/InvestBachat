import React, { useState } from "react";
import Navbar from "../dashboard/DashboardComponents/Navbar";
import LeftSideBar from "../dashboard/DashboardComponents/LeftSideBar";
import { toast } from "react-toastify";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Notification sent successfully.");
  };
  return (
    <div>
      <Navbar />
      <LeftSideBar />
      <div className="xl:pl-[12rem]">
        <div className="bg-white shadow-lg rounded-lg p-10 mt-[7.6rem] xl:ml-[17rem] xl:w-[45%] w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Notification
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Investment
              </label>
              <select
                id="type"
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm  text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                required
              >
                <option value="1">Monthly</option>
                <option value="6">By Annually</option>
                <option value="12">Annually</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm  text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm  text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="mt-3 w-[42%] bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notification;
