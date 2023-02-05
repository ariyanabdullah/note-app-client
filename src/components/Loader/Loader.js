import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <div className="h-screen">
        <div className="flex justify-center items-center mt-[-30px] h-full">
          <PropagateLoader color="#36d7b7" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Loader;
