import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { authContext } from "../../Context/Context";

const AddNote = () => {
  const { note, setNote } = useContext(authContext);

  return (
    <div>
      <label
        onClick={() => setNote("welllcome")}
        htmlFor="my-modal"
        className="btn btn-square bg-[#2dd4c0] border-0 "
      >
        {" "}
        <FaPlus className="text-3xl" />{" "}
      </label>
    </div>
  );
};

export default AddNote;
