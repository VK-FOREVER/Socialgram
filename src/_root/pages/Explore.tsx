import GridPost from "@/components/shared/GridPost";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState("");
  const debounceValue = useDebounce(searchTerm, 888);
  // Mutations
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchedPosts, isFetching: searching } =
    useSearchPosts(debounceValue);

  // Show the Results when user searched something
  const showResults = searchTerm !== "";
  // Show the Posts when user searched and post is true
  const showPosts =
    !showResults && posts?.pages.every((post) => post?.documents.length === 0);

  useEffect(() => {
    if (inView && !searchTerm) {
      fetchNextPage();
    }
    console.log({
      hasNextPage,
      showResults,
      showPosts,
      searchTerm,
      inView,
      ref,
    });
  }, [inView, searchTerm]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="w-full flex items-center justify-start">
          <img
            src="/assets/icons/search.svg"
            alt="saved-post"
            className="w-8 h-8"
          />
          <h2 className="h3-bold md:h2-bold w-full"> Search Posts</h2>
        </div>
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
        {showResults ? (
          <SearchResults searching={searching} searchedPosts={searchedPosts} />
        ) : showPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            End of the Posts.
          </p>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPost key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchTerm ? (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      ) : (
        <p className="text-light-2 text-base text-center">End of the Posts</p>
      )}
    </div>
  );
};

export default Explore;
