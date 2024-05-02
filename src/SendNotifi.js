import React, { useState } from "react";
import Navheader from "./components/Navheader";
import axios from "axios";
import { baseUrl } from "./axios/axiosClient";

const SendNotifi = () => {
  const [note, setNote] = useState("");
  const sendNotifi = () => {
    axios
      .post(`${baseUrl}/api/Notification`,
        {
          message: note,
        }
      )
      .then((res) => {
        console.log("successful send notification", res.data);
        alert("تم ارسال الاشعار بنجاح");
      })
      .catch((error) => {
        console.error("خطأ في ارسال الاشعار", error);
        alert("خطأ في ارسال الاشعار");
      });
  };
  return (
    <div className=" justify-between flex flex-col bg-[#CEB99E] min-h-screen f">
      <div>
        <Navheader />
        <h1 className="text-center text-white my-3 text-3xl font-[700]">
          ارسال الاشعارات
        </h1>
        <div className="w-[70%] bg-white py-10 px-5 mx-auto mt-5  rounded-xl ">
          <div>
            <label
              htmlFor="not"
              className="text-center mx-auto block mb-6 text-3xl font-[500]"
            >
              رسالة التنبيه
            </label>
            <input
              type="text"
              id="not"
              className="border-2 block mx-auto w-[90%] h-[120px] text-[20px] text-right pr-3"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
            <button
              className="block mx-auto my-6 px-14 py-4 bg-[#CEB99E] text-white rounded hover:bg-[#8f6f46] text-xl"
              onClick={sendNotifi}
            >
              إرسال التنبيه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotifi;
