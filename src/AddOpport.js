import React, { useState } from "react";
import Navheader from "./components/Navheader";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import redIcon from "./assets/location.png";
import greenIcon from "./assets/gps.png";
import OrangeIcon from "./assets/placeholder.png";
// import backgroundImage from "../src/WhatsApp Image 2024-04-09 at 00.07.33_f0270ff5.jpg";
import { Icon } from "leaflet";
import axios from "axios"; // Import Axios for HTTP requests
import MapHeader from "./components/MapHeader";
import Footer from "./components/Footer";
const AddOpport = () => {
  const position = [19.999208860791935, 42.60094642639161]; // Default position

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  );

  // State variables for form data and selected position
  const [formData, setFormData] = useState({
    availableCount: 0,
    contactNumber: "",
    opportunityType: "",
    implementingEntity: "",
    saudiNationalID: "",
  });
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Event listener to capture click events on the map
  const LocationFinder = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng); // Update selected position
      },
    });
    return null;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        availableCount: formData.availableCount,
        contactNumber: formData.contactNumber,
        opportunityType: formData.opportunityType,
        longitude: selectedPosition.lng,
        latitude: selectedPosition.lat,
        implementingEntity: formData.implementingEntity,
      };
      console.log("Sending data:", dataToSend);

      // Send the form data to the endpoint using Axios
      const response = await axios.post(
        "http://gazl.runasp.net/api/Opportunity",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
          },
        }
      );

      console.log("Data sent successfully:", response.data);

      // Reset form data and selected position after successful submission
      setFormData({ name: "", contactNumber: "", opportunityType: "" });

      setSelectedPosition(null);
      alert("تم إضافة الحالة بنجاح 👍");
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle errors here
      alert("خطأ في ", error.message ? error.message : error);
    }
  };

  // Function to get marker icon based on data
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
    }
  };

  return (
    <div className="w-full bg-[#ceb99c]  min-h-screen p-0 m-0">
      <Navheader />
      <MapHeader />
      <div className=" justify-between gap-3 flex flex-col-reverse  lg:flex-row  mx-auto mt-4 pl-3 mb-12">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <LocationFinder />
          {selectedPosition && (
            <Marker
              position={selectedPosition}
              icon={getMarkerIcon("تم المعالجة")} // Change marker icon based on data
            >
              <Popup>Selected Position</Popup>
            </Marker>
          )}
        </MapContainer>

        <div className="w-full lg:max-w-md mx-auto  p-4 border bg-[#9d9273]  border-gray-300 rounded-md">
          {selectedPosition ? (
            <form
              onSubmit={handleSubmit}
              style={
                {
                  // backgroundImage: `url(${backgroundImage})`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                }
              }
              className="text-right "
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  العدد المتاح
                </label>
                <input
                  type="number"
                  id="name"
                  name="name"
                  value={formData.availableCount}
                  onChange={(e) =>
                    setFormData({ ...formData, availableCount: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-white"
                >
                  رقم الاتصال
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="opportunityType"
                  className="block text-sm font-medium text-white"
                >
                  نوع الفرصة
                </label>
                <input
                  type="text"
                  id="opportunityType"
                  name="opportunityType"
                  value={formData.opportunityType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      opportunityType: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="implementingEntity"
                  className="block text-sm font-medium text-white"
                >
                  الجهة المنفذة
                </label>
                <input
                  type="text"
                  id="implementingEntity"
                  name="implementingEntity"
                  value={formData.implementingEntity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      implementingEntity: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#b8b39c] text-white py-2 px-4 rounded-md hover:bg[#b8b39c]                "
              >
                إضافة حالة
              </button>{" "}
            </form>
          ) : (
            <div className="mt-[15%] my-auto  lg:mt-[40%] pb-16 text-center">
              <h1 className="my-auto  text-white text-2xl  font-[800]">
                إختر مكان الفرصة التطوعية <br />
                <br />
                <br /> ثم ادخل البيانات{" "}
              </h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AddOpport;
