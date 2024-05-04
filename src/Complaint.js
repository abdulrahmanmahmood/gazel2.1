import React, { useEffect, useState } from "react";
import Navheader from "./components/Navheader";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import CoplainCom from "./components/CoplainCom";
import axios from "axios";
import { baseUrl } from "./axios/axiosClient";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    getAllComplements();
  }, []);

  // Get user data from redux store
  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  );
  // State variables to store form data
  const [formData, setFormData] = useState({
    senderName: "",
    nationalId: "",
    phoneNumber: "",
    complaintDetails: "",
  });

  // Function to handle changes in form input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Print form data to the console
    axios
      .post(`${baseUrl}/api/Content/AddComplement`, formData)
      .then((res) => {
        console.log("successfully sending complement");
        alert("تم ارسال الشكوى بنجاح");
      })
      .catch((error) => {
        console.log("error in sending complement ", error);
      });
  };

  const getAllComplements = () => {
    axios
      .get(`${baseUrl}/api/Content/GetAllComplements`)
      .then((res) => {
        console.log("fetchComplemnts success =>", res.data);
        setComplaints(res.data);
      })
      .catch((error) => {
        console.log("error in fetching complements", error);
      });
  };
  const deleteComplement = (id) => {
    axios
      .delete(`${baseUrl}/api/Content/DeleteComplement/${id}`)
      .then((res) => {
        console.log("delete the complaint successfully", res.data);
        getAllComplements();
      })
      .catch((error) => {
        console.log("error in deleting complement ", error);
      });
  };

  return (
    <div className=" justify-between flex flex-col bg-[#CEB99E]">
      <Navheader />

      {role === 1 ? (
        <div className="w-[70%] bg-white py-5 px-5 mx-auto mt-5 mb-10 rounded-xl min-h-[80vh]">
          <h3 className="text-center font-[700] text-3xl">جميع الشكاوي</h3>
          {complaints?.map((comp) => (
            <CoplainCom
              complain={comp}
              key={comp.id}
              deleteComplement={deleteComplement}
            />
          ))}
        </div>
      ) : (
        <div className="lg:w-[70%] w-[90%] bg-white py-5 px-5 mx-auto mt-5 mb-10 rounded-xl">
          <h1 className="text-center my-5 text-xl lg:text-3xl font-[600]  ">
            إرسال الشكوى
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-[95%] lg:w-[70%] mx-auto px-5 text-right py-5"
          >
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-5"
                htmlFor="senderName"
              >
                الأسم
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#CEB99E] w-[100%] lg:w-[80%] mx-auto mb-5 text-right"
                placeholder="الأسم "
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-5"
                htmlFor="nationalId"
              >
                رقم الهوية
              </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#CEB99E] w-[100%] lg:w-[80%] mx-auto mb-5 text-right"
                placeholder="رقم الهوية"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-5"
                htmlFor="phoneNumber"
              >
                رقم الهاتف{" "}
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#CEB99E] w-[100%] lg:w-[80%] mx-auto mb-5 text-right"
                placeholder="  رقم الهاتف"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-5"
                htmlFor="complaintDetails"
              >
                تفاصيل الشكوى{" "}
              </label>
              <textarea
                id="complaintDetails"
                name="complaintDetails"
                value={formData.complaintDetails}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none h-[160px] focus:border-[#CEB99E] w-[100%] lg:w-[80%] mx-auto mb-5 text-right"
                placeholder="تفاصيل الشكوى"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#CEB99E]  text-white font-bold py-2 px-12 rounded block justify-center mx-auto "
            >
              إرسال
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Complaint;
