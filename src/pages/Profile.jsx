import React, { useEffect } from "react";
import { getAccountInfo } from "../redux/Actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import MapComponent from "../components/MapComponent";

const Profile = () => {
  const state = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.accountInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);

  if (state.loading || !agency) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  const coordinates = [
    agency.location.coordinates[1],
    agency.location.coordinates[0],
  ];

  return (
    <div className="w-full flex flex-col mb-20 items-center justify-center h-full scroll-smooth bg-gray-100">
      <div className="w-full flex flex-col items-center gap-y-10 justify-center">

        {/* Titile */}
        <div className="text-4xl overflow-hidden mt-2 lg:text-4xl font-bold text-indigo-700 text-center">
          Welcome To {agency.name} Profile
        </div>

        {/* top box with edit profile button div */}
        <div className="w-full md:w-11/12 lg:w-7/12 xl:w-6/12 flex flex-col md:flex-row sm:flex-col items-center justify-between rounded-md border border-gray-300 bg-white p-6 md:p-8 shadow-md">
          {/* Name and email div */}
          <div className="flex flex-col items-start justify-center gap-y-4">
            <div className="font-semibold text-lg text-gray-700">
              Name: {agency.name}
            </div>
            <div className="font-semibold text-lg text-gray-700">
              Email: {agency.email}
            </div>
          </div>

          {/* Edit profile button section */}
          <div
            className="flex flex-row gap-x-2 items-center mt-4 md:mt-0 justify-center text-white font-bold md:text-xl sm:text-xs sm:px-2 py-2
            transition-all duration-200 border md:px-4 md:py-2 rounded-full bg-indigo-500 hover:bg-indigo-600"
          >
            <Link to={"/update-profile"}>
              <button className="text-white">Update Profile</button>
            </Link>
            <FiEdit2 className="text-white" />
          </div>
        </div>

        {/* Mid div Container for MapComponent */}
        <div className="w-full md:w-10/12 lg:w-9/12 xl:w-8/12 flex md:flex-row sm:flex-col gap-x-6 sm:gap-y-6 overflow-hidden items-center justify-center">
          {/* Address div */}
          <div className="w-full md:w-1/2 border border-gray-300 shadow-md rounded-md p-6 md:p-10">
            <p className="font-semibold text-lg text-gray-700">
              Where We Are Located
            </p>
            <div className="text-gray-700 mt-2">
              <p>Street: {agency.contact.address.street}</p>
              <p>City: {agency.contact.address.city}</p>
              <p>State: {agency.contact.address.state}</p>
              <p>Country: {agency.contact.address.country}</p>
              <p>Postal Code: {agency.contact.address.postalCode}</p>
            </div>
            <div
              className="flex flex-row gap-x-2 items-center justify-center text-white font-bold md:text-xl sm:text-xs sm:px-2 py-2
            transition-all duration-200 mt-4 border md:px-4 md:py-2 rounded-full bg-indigo-500 hover:bg-indigo-600"
            >
              <Link to={"/update-profile"}>
                <button className="text-white">Update Location</button>
              </Link>
              <FiEdit2 className="text-white" />
            </div>
          </div>

          {/* Map div */}
          <div className="w-full md:w-1/2 sm:w-full">
            <MapComponent coordinates={coordinates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
