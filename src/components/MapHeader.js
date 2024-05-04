import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state

const MapHeader = () => {
  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  );
  if (role == 1)
    return (
      <div className=" lg:w-[80%] overflow-auto mx-auto bg-white h-[100px] rounded mt-1">
        <ul className="flex flex-row pr-3 text-nowrap mx-2 justify-between  lg:text-2xl my-auto text-center p-7 font-semibold ">
          <li
            className={`mx-3  ${
              window.location.pathname === "/map1"
                ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                : ""
            }`}
          >
            <Link to={"/map1"}>كافة الجمعيات الخيرية والفرص التطوعية</Link>
          </li>
          <li
            className={`mx-3  ${
              window.location.pathname === "/allcases"
                ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                : ""
            }`}
          >
            <Link to={"/allcases"}>كافة الحالات</Link>
          </li>
          <li
            className={`mx-3  ${
              window.location.pathname === "/addOpport"
                ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                : ""
            }`}
          >
            <Link to={"/addOpport"}> اضافة فرصة تطوعية</Link>
          </li>
          <li
            className={`mx-3  ${
              window.location.pathname === "/registercase"
                ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                : ""
            }`}
          >
            <Link to={"/registercase"}>تسجيل حالة</Link>
          </li>
          <li
            className={`mx-3  ${
              window.location.pathname === "/addcharity"
                ? "text-[#a39776] underline underline-offset-[9px] decoration-[#a39776] decoration-4 "
                : ""
            }`}
          >
            <Link to={"/addcharity"}>إضافة جمعية خيرية</Link>
          </li>
        </ul>
      </div>
    );
};

export default MapHeader;
