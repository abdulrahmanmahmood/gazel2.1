import React from "react";
import { Link } from "react-router-dom";

const MapHeader = () => {
  return (
    <div className="w-[80%] mx-auto bg-white h-[100px] rounded mt-1">
      <ul className="flex flex-row justify-between text-2xl my-auto text-center p-7 font-semibold ">
        <li>
          <Link to={"/map1"}>كافة الجمعيات الخيرية والفرص التطوعية</Link>
        </li>
        <li>
          <Link to={"/allcases"}>كافة الحالات</Link>
        </li>
        <li>
          <Link to={"/addOpport"}> فرصة تطوعية</Link>اضافة
        </li>
        <li>
          <Link to={"/registercase"}>تسجيل حالة</Link>
        </li>
        <li>
          <Link to={"/addcharity"}>إضافة جمعية خيرية</Link>
        </li>
      </ul>
    </div>
  );
};

export default MapHeader;
