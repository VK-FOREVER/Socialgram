import GridPost from "@/components/shared/GridPost";
import { Models } from "appwrite";

type LikedPostProps = {
  likedPosts: Models.Document[];
};

const LikedPosts = ({ likedPosts }: LikedPostProps) => {
  return (
    <>
      <GridPost
        posts={likedPosts}
        showUser={true}
        showStats={false}
        lowWidth={true}
      />
    </>
  );
};

export default LikedPosts;
