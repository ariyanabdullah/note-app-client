import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { authContext } from "../../Context/Context";

const EditModal = () => {
  const { isedit, refetch, setIsEdit } = useContext(authContext);
  const { title, description, tagline, _id, pinned } = isedit;

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value || isedit?.title;
    const tagline = form.tag.value || isedit?.tagline;
    const message = form.message.value || isedit?.description;
    const id = _id;
    const noteInfo = {
      title: title,
      tagline: tagline,
      description: message,
    };

    const url = `https://notebook-server-flax.vercel.app/notes/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        tagline: tagline,
        description: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          setIsEdit(null);
          toast.success(" Note Pinned SuccessFully");
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          setIsEdit(null);
          toast.error(`${err.message}`);
        }
      });
  };

  return (
    <div>
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
                  placeholder={title}
                  className=" input rounded-none p-0 mb-2 border-t-0 border-x-0 border-black focus:outline-none  focus:border-[#2dd4c0] w-full "
                />

                <input
                  type="text"
                  name="tag"
                  minLength={10}
                  maxLength={35}
                  placeholder={tagline}
                  className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-black focus:outline-none  focus:border-[#2dd4c0] w-full "
                />

                <textarea
                  type="text"
                  name="message"
                  minLength={120}
                  placeholder={description}
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

export default EditModal;
