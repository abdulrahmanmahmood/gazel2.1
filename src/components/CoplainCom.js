import axios from "axios";
import React, { useState } from "react";

const CoplainCom = ({ complain, deleteComplement }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse justify-between px-3 py-3">
        <p className="font-Cairo font-[700] text-[20px] text-right">
          {complain.userName}
        </p>
        <p className="font-Cairo font-[700] text-[20px] text-right"></p>
        <div className="flex flex-row-reverse gap-8">
          <button
            className="p-3 bg-[#CEB99E] rounded text-white"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails === true ? "إخفاء التفاصيل" : "عرض الشكوى"}
          </button>
          <button
            className="px-9 py-3 bg-[#F5F5F5] rounded text-black"
            onClick={() => deleteComplement(complain.id)}
          >
            حذف
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="min-h-[20vh]  border-4  p-5 shadow-lg w-[98%] mx-auto text-right">
          <div className="flex flex-row justify-between mb-3 px-3">
            <p className="font-Cairo font-[400] text-[20px] text-right">
              رقم الهوية: {complain.userId}
            </p>
            <p className="font-Cairo font-[400] text-[20px] text-right">
              رقم الجوال: {complain.phone}
            </p>
          </div>
          {complain.description}
        </div>
      )}
    </div>
  );
};

export default CoplainCom;
