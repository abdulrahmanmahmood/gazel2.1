import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setAuthData } from "./rtk/slices/auth";
import background from "./assets/background.png";
import Navheader from "./components/Navheader";
import Footer from "./components/Footer";
import { baseUrl } from "./axios/axiosClient";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setrole] = useState("Visitor");
  const [showVolunteerDropdown, setShowVolunteerDropdown] = useState(true);
  const [showGovernmentDropdown, setShowGovernmentDropdown] = useState(false);
  const [volunteerCharity, setVolunteerCharity] = useState(0); // Define state variable for volunteer charity
  const [governmentAgency, setGovernmentAgency] = useState(0); // Define state variable for government agency
  const [nationalID, setNationalID] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [charities, setCharities] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
    else if (name === "nationalID")
      setNationalID(value); // Handle changes for national ID
    else if (name === "contactNumber") setContactNumber(value); // Handle changes for contact number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d{2,})(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "يجب الا تقل كلمة المرور عن 8 احرف انجليزيه و حرف كبير ورقمان ورمز خاص"
      );
      return; // Exit the function if password is invalid
    }

    // Construct the userData object
    const userData = {
      id: nationalID, // Add the saudiNationalID field with the appropriate value
      email,
      password,
      number: contactNumber, // Add the contactNumbers field with the appropriate value
      name: username,
      role,
      gender: "MALE",
    };

    if (role == "CHARITY") {
      userData.entityId = parseInt(volunteerCharity);
    } else if (role == "GOVERNMENT") {
      userData.entityId = parseInt(governmentAgency);
    }

    console.log("userData", userData);

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/auth/register`,
        userData
      );
      console.log("Registration successful:", response.data);
      // Handle successful registration, e.g., redirect to login page

      // Display the response message to the user
      alert("تم التسجيل بنجاح!");

      // Navigate to the verify email page
      setInterval(() => {
        navigate("/signin");
      }, 2500);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error.response?.data?.message ? (
          <h2 className="text-red-600">{error.response?.data?.message}</h2>
        ) : (
          <h2 className="text-red-600">{error.message}</h2>
        )
      );
    }
  };

  const handleVolSocietRadioChange = () => {
    setrole("CHARITY");
    setShowVolunteerDropdown(true);
    setShowGovernmentDropdown(false);
  };

  const handleGovernmentRadioChange = () => {
    setrole("GOVERNMENT");
    setShowVolunteerDropdown(false);
    setShowGovernmentDropdown(true);
  };
  const handleThirdPartRadioChange = () => {
    setrole("BUSINESS");
    setShowVolunteerDropdown(false);
    setShowGovernmentDropdown(false);
  };
  const handleUserRadioChange = () => {
    setrole("VISITOR");
    setShowVolunteerDropdown(false);
    setShowGovernmentDropdown(false);
  };

  const handleVolunteerCharityChange = (e) => {
    setVolunteerCharity(e.target.value);
    console.log(e.target.value);
  };

  const handleGovernmentAgencyChange = (e) => {
    setGovernmentAgency(e.target.value);
    console.log(e.target.value);
  };
  const fetchCharities = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/charity/public/all?size=1000&number=1`
      );
      setCharities(response.data.data);
      console.log("sucess fetching the charities data", response.data.data);
    } catch (error) {
      console.error("Error fetching charities data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);
  return (
    <div className="w-full ">
      <div
        className=" w-full  mt-0"
        style={{
          backgroundImage: `url(${background})`, // Adjust the path accordingly
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="opacity-60 mb-10">
          <Navheader />
        </div>
        <div className=" max-md:mt-[20px]   mx-auto  text-center p-3 ">
          <form
            onSubmit={handleSubmit}
            className="mb-[200px] bg-white py-10 rounded-lg flex flex-col max-md:w-[90%] w-[80%]  mx-auto"
          >
            <h3 className="text-[24px] font-[700] ">إنشاء حساب جديد</h3>

            <div className="grid grid-col-1 lg:grid-cols-2">
              <div className="mb-3 flex flex-col text-right">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  عنوان البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="أدخل عنوان بريدك الإلكتروني"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="الاسم المستخدم"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  رقم الهوية{" "}
                </label>
                <input
                  type="text"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="أدخل الهوية الشخصية"
                  name="nationalID"
                  value={nationalID}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  رقم الاتصال{" "}
                </label>
                <input
                  type="tel"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="أدخل رقم الاتصال"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  تأكيد كلمة المرور{" "}
                </label>
                <input
                  type="password"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="أدخل كلمة المرور"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-right mr-[40px] lg:mr-[70px] mb-[10px] text-[20px] font-[400]">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  className="w-[80%] h-[50px] lg:h-[60px] mx-auto border-[1.5px] border-black pr-1 text-right"
                  placeholder="أدخل كلمة المرور"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-row  justify-between max-md:w-[90%]  w-[70%] mx-auto max-md:px-5 lg:pr-[85px] items-center content-between">
              <div className=" ">
                <label
                  className=" text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg  inline-block "
                  htmlFor="flexRadioDefault1"
                >
                  جهة حكومية
                </label>
                <input
                  className="w-[20px] h-[20px] "
                  type="radio"
                  name="isVolunteer"
                  id="flexRadioDefault1"
                  // checked={!isVolunteer}
                  onChange={handleGovernmentRadioChange}
                />
              </div>

              <div className=" ">
                <label
                  className="form-check-label text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg  inline-block "
                  htmlFor="flexRadioDefault2"
                >
                  جمعية أهلية
                </label>
                <input
                  className=" w-[20px] h-[20px]"
                  type="radio"
                  name="isVolunteer"
                  id="flexRadioDefault2"
                  // checked={isVolunteer}
                  onChange={handleVolSocietRadioChange}
                />
              </div>
              <div>
                <label
                  htmlFor="busness"
                  className="form-check-label text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg  inline-block "
                >
                  القطاع الثالث
                </label>
                <input
                  type="radio"
                  className="w-[20px] h-[20px] "
                  name="isVolunteer"
                  id="busness"
                  onChange={handleThirdPartRadioChange}
                />
              </div>

              <div>
                <label
                  htmlFor="user"
                  className="form-check-label text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg  inline-block "
                >
                  زائر
                </label>
                <input
                  type="radio"
                  className="w-[20px] h-[20px] "
                  name="isVolunteer"
                  id="user"
                  onChange={handleUserRadioChange}
                />
              </div>
            </div>

            {showVolunteerDropdown && (
              <div className="text-xl text-center my-2  mx-auto">
                <select
                  name=""
                  id=""
                  className=" mx-auto text-center  border-[1.5px] border-[#000000] px-3 py-2 w-[300px] "
                  onChange={handleVolunteerCharityChange}
                >
                  <option
                    className="p-1 border-[1.5] border-[#000000] text-center"
                    value={null}
                  >
                    {" "}
                    اختر الجمعية الخيرية
                  </option>
                  {charities &&
                    charities.map((charity) => (
                      <option key={charity.id} value={charity.id}>
                        {charity.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {showGovernmentDropdown && (
              <div className="text-xl text-center  mx-auto my-2">
                <select
                  name=""
                  id=""
                  className=" mx-auto text-center  border-[1.5px] border-[#000000] px-3 py-2 w-[300px]"
                  onChange={handleGovernmentAgencyChange}
                >
                  <option
                    className="p-1 border-[1.5] border-[#000000] text-center"
                    value={null}
                  >
                    اختر الجهة الحكومية
                  </option>
                  <option
                    className="p-1 border-[1.5] border-[#000000] text-center"
                    value="1"
                  >
                    محافظة بيشة{" "}
                  </option>
                  <option
                    value="2"
                    className="p-3 border-[1.5] border-[#000000] text-center"
                  >
                    وزارة الصحة
                  </option>
                  <option
                    value="3"
                    className="p-1 border-[1.5] border-[#000000] text-center"
                  >
                    وزارة المواردة البشرية والتنمية الاجتماعية
                  </option>
                  <option
                    value="4"
                    className="p-1 border-[1.5] border-[#000000] text-center"
                  >
                    وزارة العدل
                  </option>
                  <option
                    value="5"
                    className="p-1 border-[1.5] border-[#000000] text-center"
                  >
                    وزارة الشئون البلدية والقروية والاسكان
                  </option>
                </select>
              </div>
            )}

            <div className="mx-auto text-center my-3">
              <button
                className="text-[20px] font-[600] px-1 lg:px-4 max-md:px-8 py-3 text-center bg-[#CEB99E] w-full lg:w-[350px]  mx-auto my-3 hover:bg-[#CEB99E] hover:text-white transition-all duration-300"
                type="submit"
              >
                {" "}
                إنشاء حساب جديد
              </button>
              <p className="forgot-password text-center">{error}</p>
              <p>
                {" "}
                مسجل بالفعل؟ <Link to="/signin">تسجيل الدخول؟</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
