import React, { useEffect, useState } from "react";
import Navheader from "./components/Navheader";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import redIcon from "./assets/location.png";
import greenIcon from "./assets/gps.png";
import OrangeIcon from "./assets/placeholder.png";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import axios from "axios"; // Import Axios for HTTP requests
import MapHeader from "./components/MapHeader";
import Footer from "./components/Footer";
import { baseUrl } from "./axios/axiosClient";

const AllCases = () => {
  const position = [20.02297427233029, 42.624228087923576]; // Default position
  const [persons, setPersons] = useState([]); // State variable to hold persons data

  const fetchPersons = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Content`);
      setPersons(response.data);
      console.log("sucess fetching the data", response.data);
    } catch (error) {
      console.error("Error fetching persons data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    fetchPersons();
    return () => {
      // Cleanup function to remove markers when component unmounts
      // setPersons([]); // Clear persons state
    };
  }, []);

  const getMarkerIcon = (data) => {
    if (data === "لم يتم المعالجة") {
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "تم المعالجة") {
      return new Icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "جاري المعالجة") {
      return new Icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Red") {
      console.log("It Match the Red icon");
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Green") {
      console.log("It Match the Green icon");
      return new Icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Orange") {
      console.log("It Match the Orange icon");
      return new Icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    } else {
      console.log("Nothing Match the icons");
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    }
  };
  const handleDelete = async (id) => {
    if (typeof window !== "undefined") {
      try {
        await axios.delete(`${baseUrl}/api/Content/${id}`);
        console.log("Person deleted successfully!");
        // Update state or refetch data if necessary
        fetchPersons();
      } catch (error) {
        console.error("Error deleting person:", error);
        // Handle errors here
      }
    }
  };
  const handleUpdate = async (longitude, latitude, id, color) => {
    let caseType = 0;
    switch (color) {
      case "Red":
        caseType = 1;
        break;
      case "Green":
        caseType = 2;
        break;
      case "Orange":
        caseType = 0;
        break;
      default:
        // Handle default case if color doesn't match any of the specified cases
        break;
    }

    const data = {
      longitude: `${longitude}`,
      latitude: `${latitude}`,
      caseType: caseType,
    };
    console.log(data);

    try {
      await axios.put(`${baseUrl}/api/Content/UpdateGoverrateAgency`, data);
      console.log("Person updated successfully!");
      fetchPersons();
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from Redux state
  console.log(
    `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
  );

  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

  const limeOptions = { color: "red" };

  const polyline = [
    [42.606719991000126, 20.010043473306567],
    [42.60843559357457, 19.995029904781568],
    [42.58810570306765, 20.007926687340927],
  ];

  return (
    <div className="w-full bg-[#ceb99c]  p-0 m-0 ">
      <Navheader />
      <MapHeader />
      <h1 className="text-2xl font-bold text-center my-8 text-black ">
        كافة الحالات{" "}
      </h1>
      <div className="w-[90%] h-[70vh] mx-auto  border-2 border-blue-500">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />{" "}
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <Polyline positions={polyline} />
          {persons &&
            persons.map((person, index) => (
              <Marker
                key={index}
                position={[person.latitude, person.longitude]}
                icon={getMarkerIcon(person.color)}
              >
                <Popup>
                  <table className="table-auto border-[1.5px] border-black text-right w-[200px] h-[150px]">
                    <tbody className="border-[1.5px] border-black">
                      <tr className="border-[1.5px] border-black">
                        <td className="border-[1.5px] border-black p-1">
                          {person.name || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          الاسم:
                        </td>
                      </tr>
                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.executingEntity || "N/A"}
                        </td>

                        <td className="border-[1.5px] border-black p-1">
                          الجهة المنفذة
                        </td>
                      </tr>
                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.requestType || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          :نوع الحالة
                        </td>
                      </tr>

                      <tr>
                        <td
                          className={`border-[1.5px] border-black p-1 ${
                            person.color === "Red"
                              ? "bg-red-500"
                              : person.color === "Orange"
                              ? "bg-orange-500"
                              : person.color === "Green"
                              ? "bg-green-500"
                              : "" // Default case
                          }`}
                        ></td>
                        <td className="border-[1.5px] border-black p-1">
                          :النطاق
                        </td>
                      </tr>

                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.contactNumbers || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          :رقم الاتصال
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center">
                    <button
                      className="text-blue-500 cursor-pointer p-1 m-1 "
                      onClick={() =>
                        handleUpdate(
                          person.longitude,
                          person.latitude,
                          person.id,
                          person.color
                        )
                      }
                    >
                      تعديل هذه الحالة
                    </button>
                    <button
                      className="text-red-500 cursor-pointer ml-4 p-1 m-1"
                      onClick={() => handleDelete(person.id)}
                    >
                      مسح هذه الحالة
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="flex flex-row gap-4 lg:w-[50%]  md:mx-auto mt-3 pb-10 h-[10vh] lg:ml-20 pl-12">
        <div className="flex flex-row items-baseline gap-2 text-white my-auto  text-center outline rounded p-3 outline-[#2C4C36]">
          لم ينفذ{" "}
          <div className="bg-red-700 rounded-full w-[15px] h-[15px] my-auto" />
        </div>
        <div className="flex flex-row items-baseline gap-2 text-white my-auto  text-center outline rounded p-3 outline-[#2C4C36]">
          جاري التنفيذ{" "}
          <div className="bg-green-600 rounded-full w-[15px] h-[15px] my-auto" />
        </div>
        <div className="flex flex-row items-baseline gap-2 text-white my-auto  text-center outline rounded p-3 outline-[#2C4C36] ">
          تم التنفيذ{" "}
          <div className="bg-orange-300 rounded-full w-[15px] h-[15px] my-auto" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCases;
