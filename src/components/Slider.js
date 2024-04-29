import React from "react";

const Slider = ({ slides }) => {
  const [indes, setindes] = useState(0);
  const gotNext = () => {};
  const gotoPrevios = () => {};
  return <div>
    {slides.map((slide,indes)=>(
      slide
    ))}
  </div>;
};

export default Slider;
