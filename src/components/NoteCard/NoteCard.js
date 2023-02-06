import React, { useContext } from "react";
import cardimg from "../../assets/card.png";
import { FaTrashAlt, FaPencilRuler, FaBell } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authContext } from "../../Context/Context";
const NoteCard = ({ note, index }) => {
  // console.log(note);
  const { refetch, setIsEdit, isedit } = useContext(authContext);
  const { title, description, tagline, _id, pinned } = note;

  const oddClass =
    "card h-[310px] bg-[#06032e] relative text-primary-content shadow-lg ";

  const evenClass =
    "card h-[310px]  bg-black relative text-primary-content shadow-lg ";

  const handleDelete = (id) => {
    const url = `https://notebook-server-flax.vercel.app/notes/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.acknowledged) {
          toast.success(" Note Deleted SuccessFully");
          refetch();
        }
      });
  };

  const handlePinned = (id) => {
    const url = `https://notebook-server-flax.vercel.app/notes/${id}`;
    fetch(url, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(" Note Pinned SuccessFully");
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(`${err.message}`);
        }
      });
  };

  return (
    <div>
      <div className={index % 2 === 0 ? `${evenClass}` : `${oddClass}`}>
        <div className="absolute top-0 right-0">
          <img src={cardimg} alt="svg" />
        </div>

        <div className="card-body mt-12">
          <h2 className="card-title text-[#2dd4c0] font-bold uppercase">
            {title}
          </h2>

          <h3 className="text-2xl font-extrabold text-indigo-50 leading-snug mb-2">
            {tagline}
          </h3>
          <p className="text-indigo-200 h-[73px] ">
            {description.length > 120
              ? `${description.slice(0, 140)}`
              : `${description}`}
          </p>

          <div className="card-actions justify-end">
            {pinned === 0 && (
              <button
                onClick={() => handlePinned(_id)}
                title="pin your Note"
                className="btn btn-outline btn-circle btn-ghost"
              >
                <FaBell className="text-2xl text-white font-bold" />{" "}
              </button>
            )}

            <label
              onClick={() => setIsEdit(note)}
              htmlFor="my-modal"
              title="Edit your Note"
              className="btn btn-outline btn-circle bg-[#2dd4c0]"
            >
              {" "}
              <FaPencilRuler className="text-2xl font-bold" />{" "}
            </label>
            <button
              title="Delete Note"
              className="btn btn-circle btn-outline btn-error"
              onClick={() => handleDelete(_id)}
            >
              {" "}
              <FaTrashAlt className="text-2xl font-bold" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
