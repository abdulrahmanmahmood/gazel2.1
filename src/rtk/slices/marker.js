import { createSlice } from "@reduxjs/toolkit";

const markersSlice = createSlice({
  name: "markers",
  initialState: [
    {
      position: [19.984701088274022, 42.64470151140049], // besha1
      popup: "Riyadh",
      data: "لم يتم المعالجة",
      name: "الحج محمد الشهري",
      contactNumbers: "011223423432",
      executingEntity: "جمعية رجال من اجل النساء",
      requestType: "مقبولة",
    },
    {
      position: [20.006824179975645, 42.60595448715381], // Jeddah
      popup: "Jeddah",
      data: "تم المعالجة",
      name: "الحج عبدالله الشمراني",
      contactNumbers: "011223423432",
      executingEntity: "جمعية عايشين بكرم الله ",
      requestType: "جيدة",
    },
    {
      position: [19.99674858831157, 42.60153434796344], // Dammam
      popup: "Dammam",
      data: "جاري المعالجة",
      name: "الحج علي السدحان",
      contactNumbers: "011223423432",
      executingEntity: "جمعية كلنا اخوة",
      requestType: "جامد طحن",
    },
  ],
  reducers: {
    addMarker: (state, action) => {
      const newMarker = action.payload;
      state.push(newMarker);
    },
    updateMarker: (state, action) => {
      const { index, updatedMarker } = action.payload;
      state[index] = updatedMarker;
    },
    deleteMarker: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addMarker, updateMarker, deleteMarker } = markersSlice.actions;
export const selectMarkers = (state) => state.markers;
export default markersSlice.reducer;
