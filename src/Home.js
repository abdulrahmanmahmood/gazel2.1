import React, { useEffect, useState } from "react";
import Navheader from "./components/Navheader";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import redIcon from "./assets/location.png";
import greenIcon from "./assets/gps.png";
import OrangeIcon from "./assets/placeholder.png";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import axios from "axios"; // Import Axios for HTTP requests

const Home = () => {
  const position = [19.999208860791935, 42.60094642639161]; // Default position
  const [persons, setPersons] = useState([]); // State variable to hold persons data

  const fetchPersons = async () => {
    try {
      const response = await axios.get(
        "http://jazlhelp.runasp.net/api/content"
      );
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
      setPersons([]); // Clear persons state
    };
  }, []);

  const markers = [
    {
      position: [19.999837518893063, 42.60807025928232], // besha1
      popup: "Riyadh",
      data: "لم يتم المعالجة",
      name: "مواطن فلان الفلان",
      contactNumbers: "0500000000",
      executingEntity: "الجمعية الصحية الانسانية",
      requestType: "احتياج الى سرير متحرك لذوي الاحتياجات الخاصة",
    },
    {
      position: [20.014159268682786, 42.61439655478464], // Jeddah
      popup: "Jeddah",
      data: "تم المعالجة",
      name: "مواطن فلان الفلان",
      contactNumbers: "0500000000",
      executingEntity: "جمعية عايشين بكرم الله ",
      requestType: "يحتاج الى مصروف شهري",
    },
    {
      position: [19.99760046123814, 42.58951891442223], // Dammam
      popup: "Dammam",
      data: "جاري المعالجة",
      name: "مواطن فلان الفلان",
      contactNumbers: "0500000000",
      executingEntity: "جمعية  البر",
      requestType: "يحتاج الى اثاث منزلي",
    },
  ];

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
        await axios.delete(`http://jazlhelp.runasp.net/api/content/${id}`);
        console.log("Person deleted successfully!");
        // Update state or refetch data if necessary
        fetchPersons();
      } catch (error) {
        console.error("Error deleting person:", error);
        // Handle errors here
      }
    }
  };

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from Redux state
  // console.log(
  //   `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
  // );

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };
  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

  return (
    <div className="w-full bg-[#ceb99c] h-[100vh] p-0 m-0 ">
      <Navheader />
      <h1 className="text-4xl font-bold text-center my-6">جميع الحالات</h1>
      <div className="w-[90%] h-[70vh] mx-auto  border-2 border-blue-500">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "520px", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />{" "}
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
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
                            person.color == "Red" ? "bg-red-500" : ""
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
                    <button className="text-blue-500 cursor-pointer p-1 m-1 ">
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={getMarkerIcon(marker.data)}
            >
              <Popup>
                <table className="table-auto border-[1.5px] border-black text-right w-[200px] h-[150px]">
                  <tbody className="border-[1.5px] border-black">
                    <tr className="border-[1.5px] border-black">
                      <td className="border-[1.5px] border-black p-1">
                        {marker.name || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        الاسم:
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.executingEntity || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        الجهة المنفذة
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.requestType || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        :نوع الحالة
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.contactNumbers || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        :رقم الاتصال
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center">
                  <button className="text-blue-500 cursor-pointer p-1 m-1">
                    تعديل هذه الحالة
                  </button>
                  <button
                    className="text-red-500 cursor-pointer ml-4 p-1 m-1"
                    onClick={() => handleDelete(marker.id)}
                  >
                    مسح هذه الحالة
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          {/* <LocationFinderDummy /> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
