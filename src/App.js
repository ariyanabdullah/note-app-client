import { useContext } from "react";
import AddNote from "./components/AddNote/AddNote";
import AddNoteModal from "./components/AddNote/AddNoteModal";
import NoteList from "./components/NoteList/NoteList";
import { authContext } from "./Context/Context";

function App() {
  const { note, setNote } = useContext(authContext);

  return (
    <div>
      <div className=" ml-[1%] mr-[2%] ">
        <div className="mt-1">
          <div className="grid grid-cols-1  md:grid-cols-6 lg:grid-cols-6 gap-x-2">
            <div className="place-self-start justify-self-end ">
              <h1 className="font-extrabold text-3xl py-2 text-[#2dd4c0] uppercase touch-pan-up ">
                Your Note
              </h1>
            </div>
            <div className="col-span-5"></div>
          </div>
          <div className="grid grid-cols-12 gap-x-2">
            <div className="place-self-start justify-self-end ">
              <AddNote />
            </div>
            <div className="col-span-11">
              <NoteList />
            </div>
          </div>

          {note && <AddNoteModal></AddNoteModal>}
        </div>
      </div>
    </div>
  );
}

export default App;
