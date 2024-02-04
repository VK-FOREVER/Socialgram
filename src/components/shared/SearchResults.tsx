import { Models } from "appwrite";
import React from "react";
import Loader from "./Loader";
import GridPost from "./GridPost";

type SearchTypesProps = {
  searching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({ searching, searchedPosts }: SearchTypesProps) => {
  if (searching) {
    return <Loader />;
  }
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPost posts={searchedPosts.documents} />;
  }
  return (
    <div className="w-full text-center mt-10">
      <p className="text-2xl text-light-4 font-bold">No Results Found!</p>
    </div>
  );
};

export default SearchResults;
