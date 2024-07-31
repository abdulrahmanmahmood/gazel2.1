import React, { useEffect, useState } from "react";
import Navheader from "./components/Navheader";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import CoplainCom from "./components/CoplainCom";
import axios from "axios";
import { baseUrl } from "./axios/axiosClient";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [myComplaints, setMyComplaints] = useState([]);

  // Get user data from redux store
  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (role == "VISITOR") {
      getMyComplements();
    } else {
      getAllComplements();
    }
  }, []);

  // State variables to store form data
  const [formData, setFormData] = useState({
    description: "",
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
      .post(`${baseUrl}/api/v1/complain`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${baseUrl}/api/v1/management/complain/all?page=0&size=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("fetchComplemnts success =>", res.data.data.content);
        setComplaints(res.data.data.content);
      })
      .catch((error) => {
        console.log("error in fetching complements", error);
      });
  };
  const deleteComplement = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/management/complain/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("delete the complaint successfully", res.data);
        getAllComplements();
      })
      .catch((error) => {
        console.log("error in deleting complement ", error);
      });
  };

  const getMyComplements = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/complain/all?page=0&size=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("my Complaints ", response.data.data.content);
      setMyComplaints(response.data.data.content);
    } catch (error) {
      console.log("error in fetching my complements", error);
    }
  };

  return (
    <div className=" justify-between flex flex-col bg-[#CEB99E] min-h-screen">
      <Navheader />

      {role === "GOVERNMENT" || role === "ADMIN" ? (
        <div className="w-[70%] bg-white py-5 px-5 mx-auto mt-5 mb-10 rounded-xl min-h-[80vh]">
          <h3 className="text-center font-[700] text-3xl">جميع الشكاوي</h3>
          {complaints.length ? (
            complaints.map((comp) => (
              <CoplainCom
                complain={comp}
                key={comp.id}
                deleteComplement={deleteComplement}
              />
            ))
          ) : (
            <h2 className="text-center my-10 font-semibold text-2xl">
              {" "}
              ✅ لا يوجد شكاوي بعد
            </h2>
          )}
        </div>
      ) : (
        <div className="lg:w-[70%] w-[90%] bg-white py-5 px-5 mx-auto mt-5 mb-10 rounded-xl">
          {myComplaints > 0 && (
            <h3 className="text-center font-[700] text-3xl my-3">
              شكاوي القديمة
            </h3>
          )}
          {myComplaints.length > 0 &&
            myComplaints.map((comp) => (
              <div id={comp.id}>
                <p className="text-center">{comp.description}</p>
              </div>
            ))}

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
                htmlFor="description"
              >
                تفاصيل الشكوى{" "}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
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
