import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(12);
  if (loading) {
    return <Loader />;
  }
  //   console.log(creators);

  return <div className=""></div>;
};

export default TopCreators;
