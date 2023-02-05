import React, { useContext } from "react";
import { authContext } from "../../Context/Context";
import Loader from "../Loader/Loader";
import NoteCard from "../NoteCard/NoteCard";

const NoteList = () => {
  const { allnote, refetch, pages, page, setPage, isLoading } =
    useContext(authContext);

  const handlePagination = (num) => {
    setPage(num);
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allnote?.result?.map((note, index) => {
          return (
            <NoteCard key={index} index={index} note={note}>
              {" "}
            </NoteCard>
          );
        })}
      </div>

      <div className="text-center my-4">
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            className={
              page === number
                ? " btn-circle btn-active bg-[#2dd4c0] text-white text-2xl font-bold mr-2 "
                : " btn btn-circle btn-ghost bg-black text-white text-2xl font-bold mr-2"
            }
            onMouseEnter={() => setPage(number)}
            onClick={() => handlePagination(number)}
          >
            {" "}
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
