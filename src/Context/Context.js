import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

export const authContext = createContext();

const Context = ({ children }) => {
  const [note, setNote] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);

  const {
    data: allnote = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allnote"],
    queryFn: async () => {
      const url = `http://localhost:5000/notes?page=${page}&size=${size}`;
      const res = await fetch(url);
      const data = await res.json();
      setCount(data.count);
      return data;
    },
  });
  const pages = Math.ceil(count / size);

  const allInfo = {
    note,
    setNote,
    refetch,
    allnote,
    count,
    setCount,
    page,
    setPage,
    size,
    setSize,
    isLoading,
    pages,
  };

  return (
    <div>
      <authContext.Provider value={allInfo}>{children}</authContext.Provider>
    </div>
  );
};

export default Context;
