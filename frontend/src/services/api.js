// services/api.js

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


export const submitApplication = async (applicationData) => {
  const endpoint = `${API_BASE_URL}/applications/rica-import-permit`;


  console.log(" Submitting to API Endpoint:", endpoint);
  console.log("Payload being sent:", JSON.stringify(applicationData, null, 2));

  try {
    const response = await axios.post(endpoint, applicationData);
    console.log(" API Success Response:", response.data);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    // This block now provides much more detailed error information.
    console.error(" API submission failed. Details below.");
    if (error.response) {
     
      console.error("Server Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
      return {
        success: false,
        message: error.response.data.message || "An error occurred on the server.",
        errors: error.response.data.errors || [],
      };
    } else if (error.request) {
      
      console.error("No response received from the server. This often means the server crashed.", error.request);
      return {
        success: false,
        message: "Network Error: Could not connect to the server. Please check if the backend is running.",
        errors: [],
      };
    } else {
      
      console.error("Error setting up the request:", error.message);
      return {
        success: false,
        message: `An unexpected error occurred: ${error.message}`,
        errors: [],
      };
    }
  }
};



export const getProvinces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/provinces`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};


export const getDistricts = async (provinceId) => {
  if (!provinceId) return [];
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/districts/${provinceId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching districts for province ${provinceId}:`, error);
    return [];
  }
};


export const getAllDistricts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/districts/all`);
    return response.data.data;
  } catch (error)
  {
    console.error("Error fetching all districts:", error);
    return [];
  }
};



export const getNationalities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/nationalities`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching nationalities:", error);
    return [];
  }
};


export const getCountryCodes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/country-codes`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching country codes:", error);
    return [];
  }
};