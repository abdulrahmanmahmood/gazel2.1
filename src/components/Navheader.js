import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import charit from "../assets/charity.jpg";
import gover from "../assets/Emblem_of_Saudi_Arabia_(2).svg.png";
import logo from "../assets/logo.jpg";
import logo2 from "../assets/logo2.jpg";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import { Link } from "react-router-dom";

export default function Navheader() {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the visibility of the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from
  const profileImage = role === 1 ? gover : charit;

  return (
    <nav className="bg-[#9d9273] border-gray-200 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <a href="#" className="flex items-center">
          <img src={logo2} className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
          <span className="max-md:text-xs self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Gazel
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            <span />
          </div>
          <span className="mx-2 max-md:hidden ">{displayName}</span>

          <Menu as="div" className="relative ml-3">
            <Menu.Button>
              <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
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
              <Menu.Items className="absolute right-0 z-[1000] mt-2 w-48 origin-top-right rounded-md bg-[#c0bc9d] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"/profilePage"}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-900 no-underline"
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>

                {/* <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-[#3f4934] no-underline"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item> */}

                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/sign-in"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-900 no-underline"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "" : "hidden"
          } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li
              className={`bg-[#554b30] p-1 rounded text-white my-2 lg:my-0 lg:px-4 hover:bg-[#554b30] ${
                window.location.pathname === "/home"
                  ? "bg-[#554b30] "
                  : "bg-[#a39776] "
              }`}
            >
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 text-center text-white  rounded lg:bg-transparent  lg:p-0 dark:text-white"
              >
                جميع الحالات{" "}
              </Link>
            </li>
            <li
              className={`bg-[#554b30] p-1 rounded text-white my-2 lg:my-0 lg:px-4 hover:bg-[#554b30] ${
                window.location.pathname === "/setAddress"
                  ? "bg-[#554b30] "
                  : "bg-[#a39776] "
              }`}
            >
              <Link
                to="/setAddress"
                className="block  text-center py-2 pl-3 pr-4  border-b border-gray-100 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                إضافة حالة جديد
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "Set New Address", href: "/setAddress", current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// export default function Example() {
//   const { role, token, email, displayName } = useSelector(
//     (state) => state.auth
//   ); // Access user role from Redux

//   /*
//   console.log(
//     `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
//   );
//   */

//   // Determine which image to display based on the user's

//   return (
//     <Disclosure as="nav" className="bg-[#9d9273] text-white w-full">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex  flex-shrink-0 items-center ml-9">
//                   <img
//                     className="h-13 rounded-full w-[80px]"
//                     src={logo2}
//                     alt="Your Company"
//                   />
//                 </div>

//                 <div className="hidden sm:ml-6 sm:block items-baseline my-auto">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           window.location.pathname === item.href
//                             ? "bg-[#554b30] text-white no-underline"
//                             : "text-white hover:bg-[#554b30] no-underline hover:text-white",
//                           "rounded-md px-3 py-2 text-sm font-medium"
//                         )}
//                         aria-current={
//                           window.location.pathname === item.href
//                             ? "page"
//                             : undefined
//                         }
//                       >
//                         {item.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <Menu.Button>
//                     <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src={profileImage}
//                         alt=""
//                       />
//                     </div>
//                   </Menu.Button>

//                   <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <Menu.Item>
//                       {({ active }) => (
//                         <a
//                           href="#"
//                           className={classNames(
//                             active ? "bg-gray-100" : "",
//                             "block px-4 py-2 text-sm text-gray-700"
//                           )}
//                         >
//                           Edit
//                         </a>
//                       )}
//                     </Menu.Item>
//                     <Menu.Item>
//                       {({ active }) => (
//                         <a
//                           href="#"
//                           className={classNames(
//                             active ? "bg-gray-100" : "",
//                             "block px-4 py-2 text-sm text-gray-700"
//                           )}
//                         >
//                           View
//                         </a>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>

//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-[1000] mt-2 w-48 origin-top-right rounded-md bg-[#c0bc9d] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-900 no-underline"
//                             )}
//                           >
//                             Your Profile
//                           </a>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-[#3f4934] no-underline"
//                             )}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="/sign-in"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-900 no-underline"
//                             )}
//                           >
//                             Sign out
//                           </a>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//                 <span className="mx-2">{displayName}</span>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </Disclosure>
//   );
// }
