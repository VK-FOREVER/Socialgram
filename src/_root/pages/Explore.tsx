import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            height={24}
            width={24}
          />
          <Input
            type="text"
            placeholder="Search here..."
            className="explore-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full  max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Explore what's trending</h3>
        <div className="flex-center gap-3 "></div>
      </div>
    </div>
  );
};

export default Explore;
