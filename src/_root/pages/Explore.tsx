import GridPost from "@/components/shared/GridPost";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const posts = [];
  const showResults = searchTerm !== "";
  const showPosts = !showResults && posts.length;
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
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium max-h-fullbase-medium text-light-2 ">
            All
          </p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            height={20}
            width={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {/* {
          showResults ? (
            <SearchResults />
          ) : showPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">
              End of the Posts.
            </p>
          ) : posts.pages.map((item, index) => (
            <GridPost key={`page-${index}`}  posts={item.document}/>
          ))
        } */}
      </div>
    </div>
  );
};

export default Explore;
