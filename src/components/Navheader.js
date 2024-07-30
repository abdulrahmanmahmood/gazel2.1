import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import charit from "../assets/charity.jpg";
import gover from "../assets/Emblem_of_Saudi_Arabia_(2).svg.png";
import logo from "../assets/logo.jpg";
import logo1 from "../assets/baseLogo.png";
import logo2 from "../assets/AseerLogo.png";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import { Link, useNavigate } from "react-router-dom";
import userImage from "../assets/Ellipse 2.png";
import Bell from "../assets/Bell.png";
import axios from "axios";
import { baseUrl } from "../axios/axiosClient";
import { CharityiesImages, governementImages } from "./ProfileImages";
import theThirdAndVisitor from "../assets/الزائر والقطاع الثالث.jpeg";
import { clearAuthData } from "../rtk/slices/auth";

export default function Navheader() {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotfications] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch hook

  // Function to toggle the visibility of the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { role, token, email, displayName, foundation } = useSelector(
    (state) => state.auth
  ); // Access user role from
  // console.log("name in header", displayName);
  let profileImage = userImage;

  if (email && role === "CHARITY") {
    // If user is logged in and role is 1 (charity)
    const index = Math.min(CharityiesImages.length - 1, foundation); // Ensure index doesn't exceed array length
    profileImage = CharityiesImages[index];
  } else if (role === "GOVERNMENT") {
    // If role is 0 (government)
    const index = Math.min(governementImages.length - 1, foundation); // Ensure index doesn't exceed array length

    profileImage = governementImages[index]; // Use the first image from the government images array
  } else {
    profileImage = theThirdAndVisitor;
  }

  const handleNotificationsClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document body
    setShowNotifications(!showNotifications);
  };
  const fetchAllNotifications = () => {
    axios
      .get(`${baseUrl}/api/Notification`)
      .then((res) => {
        // console.log("fetch notificaions succefully", res.data);
        setNotfications(res.data);
      })
      .catch((error) => {
        console.log("error in fetching notificatins", error);
      });
  };
  useEffect(() => {
    // fetchAllNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        !event.target.closest(".notifications") &&
        !event.target.closest(".bell-icon")
      ) {
        setShowNotifications(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  const handleLogout = () => {
    navigate("/first");
    dispatch(clearAuthData());
  };

  return (
    <nav className="bg-white border-b-[3px]  border-[#0000004D] py-2 w-full">
      <div className="flex flex-wrap items-center justify-between  px-[1%]  mx-auto ">
        <div className="flex flex-row   lg:-order-1">
          <img
            src={logo1}
            className="  max-sm:w-[60px] max-sm:h-[50px] sm:w-[100px]  max-md:w-20 max-md:h-20  lg:w-[90px] mr-5 sm:h-20"
            alt="Landwind Logo"
          />
          <img
            src={logo2}
            className="max-sm:w-[90px] max-sm:h-[50px] sm:w-[100px]  max-md:w-22 max-md:h-20 lg:w-[120px]  sm:h-20"
            alt="Landwind Logo"
          />
        </div>
        <div className="flex flex-row ">
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block ">
              <span />
            </div>

            <button
              className={`lg:mx-3 mx-2 ${
                window.location.pathname === "/first" ||
                window.location.pathname === "/signin" ||
                window.location.pathname === "/signup"
                  ? "hidden"
                  : "block"
              }`}
              onClick={handleNotificationsClick}
            >
              <img src={Bell} className="max-sm:w-3 max-sm:h-4  w-5 h-7" />
            </button>
            {displayName ? (
              <p className="max-sm:text-[13px] text-black  lg:text-[20px]  lg:mx-1">
                {displayName}
              </p>
            ) : (
              <p
                className="max-lg:hidden text-black text-[24px] font-[700] mx-1"
                onClick={handleLogout}
              >
                تسجيل الدخول
              </p>
            )}

            <Menu
              as="div"
              className={`  ml-3 ${
                window.location.pathname === "/first" ||
                window.location.pathname === "/signin" ||
                window.location.pathname === "/signup"
                  ? "hidden"
                  : "relative"
              } `}
            >
              <Menu.Button>
                <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className=" block max-sm:w-5 max-sm:h-5 h-10 w-10 lg:h-15 lg:w-12 "
                    src={profileImage}
                    alt=""
                  />
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute flex flex-col right-0 z-[1000] mt-2 w-48 origin-top-right rounded-md bg-[#c0bc9d] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={"/profilePage"}
                        className={` hover:bg-white text-center my-2
                          ${active} ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-900 no-underline"`}
                      >
                        الصفحة الشخصية
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signin"
                        className={`hover:bg-white text-center my-2
                          ${active} ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-900 no-underline"`}
                      >
                        تسجيل الخروج
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <ButtonT toggleMobileMenu={toggleMobileMenu} />
          </div>

          <div>
            <ul className="hidden lg:flex mt-4  lg:flex-row  lg:mt-0 text-[22px] lg:font-[550] ">
              {role === 1 && (
                <li
                  className={`p-1 rounded my-2 lg:my-0 lg:px-2 hover:text-black ${
                    window.location.pathname === "/sendnotifi"
                      ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                      : "text-black "
                  }`}
                >
                  <Link
                    to="/sendnotifi"
                    className="block py-2 pl-3 pr-4 text-center  rounded lg:bg-transparent  lg:p-0 "
                  >
                    ارسال اشعار
                  </Link>
                </li>
              )}
              <li
                className={`p-1 rounded my-2 lg:my-0 lg:px-2 hover:text-black ${
                  window.location.pathname === "/complaint"
                    ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                    : "text-black "
                }`}
              >
                <Link
                  to="/complaint"
                  className="block py-2 pl-3 pr-4 text-center  rounded lg:bg-transparent  lg:p-0 "
                >
                  الشكاوى
                </Link>
              </li>
              <li
                className={`text-black p-1 rounded my-2 lg:my-0 lg:px-2 hover:text-black ${
                  window.location.pathname === "/map1" ||
                  window.location.pathname === "/allcases" ||
                  window.location.pathname === "/addOpport" ||
                  window.location.pathname === "/registercase" ||
                  window.location.pathname === "/addcharity"
                    ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                    : "text-black "
                }`}
              >
                <Link
                  to="/map1"
                  className="block py-2 pl-3 pr-4 text-center   rounded lg:bg-transparent  lg:p-0 "
                >
                  الخريطة التفاعلية
                </Link>
              </li>{" "}
              <li
                className={`text-black p-1 rounded my-2 lg:my-0 lg:px-2 hover:text-black ${
                  window.location.pathname === "/News"
                    ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                    : "text-black "
                }`}
              >
                <Link
                  to="/News"
                  className="block py-2 pl-3 pr-4 text-center   rounded lg:bg-transparent  lg:p-0 "
                >
                  الاخبار{" "}
                </Link>
              </li>
              <li
                className={`text-black p-1 rounded  my-2 lg:my-0 lg:px-2 hover:text-black ${
                  window.location.pathname === "/"
                    ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                    : "text-black "
                }`}
              >
                <Link
                  to="/"
                  className="block  text-center py-2 pl-2 pr-2  border-b border-gray-100 lg:hover:bg-transparent lg:border-0  lg:p-0 "
                >
                  الرئيسية
                </Link>
              </li>
              <li
                className={`text-black p-1 rounded  my-2 lg:my-0 lg:px-4 hover:text-black lg:hidden  `}
              >
                <p className="text-black text-[24px] font-[700] mx-1">
                  <Link to="/first">تسجيل الدخول</Link>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "" : "hidden"
          } items-center justify-between w-full lg:hidden lg:w-auto lg:order-2 right-0`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col-reverse mt-1   text-[18px] font-[600]">
            {role === 1 && (
              <li
                className={`p-1 rounded my-1 lg:my-0 lg:px-4 hover:text-black ${
                  window.location.pathname === "/sendnotifi"
                    ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                    : "text-black "
                }`}
              >
                <Link
                  to="/sendnotifi"
                  className="block py-1 pl-3 pr-4 text-center  rounded lg:bg-transparent  lg:p-0 "
                >
                  ارسال اشعار
                </Link>
              </li>
            )}
            <li
              className={`p-1 rounded my-1 lg:my-0 lg:px-4 hover:text-black ${
                window.location.pathname === "/complaint"
                  ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                  : "text-black "
              }`}
            >
              <Link
                to="/complaint"
                className="block py-1 pl-3 pr-4 text-center  rounded lg:bg-transparent  lg:p-0 "
              >
                الشكاوى
              </Link>
            </li>
            <li
              className={`text-black p-1 rounded my-1 lg:my-0 lg:px-4 hover:text-black ${
                window.location.pathname === "/map1" ||
                window.location.pathname === "/allcases" ||
                window.location.pathname === "/addOpport" ||
                window.location.pathname === "/registercase" ||
                window.location.pathname === "/addcharity"
                  ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                  : "text-black "
              }`}
            >
              <Link
                to="/map1"
                className="block py-1 pl-3 pr-4 text-center   rounded lg:bg-transparent  lg:p-0 "
              >
                الخريطة التفاعلية
              </Link>
            </li>{" "}
            <li
              className={`text-black p-1 rounded my-1 lg:my-0 lg:px-4 hover:text-black ${
                window.location.pathname === "/News"
                  ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                  : "text-black "
              }`}
            >
              <Link
                to="/News"
                className="block py-1 pl-3 pr-4 text-center   rounded lg:bg-transparent  lg:p-0 "
              >
                الاخبار{" "}
              </Link>
            </li>
            <li
              className={`text-black p-1 rounded  my-1 lg:my-0 lg:px-4 hover:text-black ${
                window.location.pathname === "/"
                  ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                  : "text-black "
              }`}
            >
              <Link
                to="/"
                className="block  text-center py-1 pl-3 pr-4  border-b border-gray-100 lg:hover:bg-transparent lg:border-0  lg:p-0 "
              >
                الرئيسية
              </Link>
            </li>
            {!displayName && (
              <li
                className={`text-black p-1 rounded  my-1 lg:my-0 lg:px-4 hover:text-black lg:hidden  `}
              >
                <p className="text-black text-[24px] font-[700] mx-1">
                  <Link
                    to="/first"
                    className="block  text-center py-1 pl-3 pr-4  border-b border-gray-100 lg:hover:bg-transparent lg:border-0  lg:p-0 "
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
      {showNotifications && (
        <div className="absolute top-[90px] right-[15%] px-1 py-1 w-[250px] rounded bg-[#a39776]">
          {notifications?.map(
            (
              notifi,
              index // Add index as second argument
            ) => (
              <h4
                key={index} // Use index as key
                className=" mx-auto text-center my-3 p-2 rounded-lg hover:bg-white"
              >
                {notifi.message}
              </h4>
            )
          )}
        </div>
      )}
    </nav>
  );
}

const ButtonT = ({ toggleMobileMenu }) => {
  return (
    <button
      onClick={toggleMobileMenu}
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 "
      aria-controls="mobile-menu-2"
      aria-expanded="true"
    >
      <span className="sr-only">Open main menu</span>
      {/* Conditional rendering based on the state of isMobileMenuOpen */}

      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
