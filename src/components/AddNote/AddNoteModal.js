import React, { useContext, useState } from "react";
import { authContext } from "../../Context/Context";
import { FaRegBell, FaBell } from "react-icons/fa";
import { toast } from "react-hot-toast";
const AddNoteModal = () => {
  const { setNote, refetch } = useContext(authContext);

  const [pinned, setPinned] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const tagline = form.tag.value;
    const message = form.message.value;

    // {
    //   title: title,
    //   tagline: tagline,
    //   description: message,
    //   pinned: 0,
    // }

    // post data from here

    const url = "http://localhost:5000/notes";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        tagline: tagline,
        description: message,
        pinned: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setNote(null);
          refetch();
          toast.success("Note Added Successfully");
        }
      })
      .catch((err) => {
        if (err) {
          setNote(null);
          refetch();
          toast.error("Failed to add Note . Try Again");
        }
      });
  };

  return (
    <div>
      {" "}
      <div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal ">
          <div className="modal-box w-[450px]">
            <div className="relative">
              <h1 className="text-center my-3 text-xl font-bold text-black">
                Add Your <span className="text-[#2dd4c0]">Information</span>
              </h1>

              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Add a title"
                  className=" input rounded-none p-0 mb-2 border-t-0 border-x-0 border-black focus:outline-none  focus:border-[#2dd4c0] w-full "
                />

                <input
                  type="text"
                  name="tag"
                  minLength={17}
                  maxLength={24}
                  placeholder="Add a tagline"
                  required
                  className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-black focus:outline-none  focus:border-[#2dd4c0] w-full "
                />

                <textarea
                  type="text"
                  required
                  name="message"
                  minLength={120}
                  placeholder="Take A Note"
                  className=" input p-0 rounded-none mb-2  border-t-0 border-x-0 border-black focus:outline-none  focus:border-[#2dd4c0] w-full "
                />

                <button
                  type="submit"
                  className="btn btn-sm btn-ghost bg-[#2dd4c0] border-[#2dd4c0] btn-dark"
                >
                  submit
                </button>
                <label htmlFor="my-modal" className="btn btn-sm  ml-2  ">
                  cencel
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
