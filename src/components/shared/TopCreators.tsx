import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const TopCreators = () => {
  const {} = useGetUsers(12);
  return <div className=""></div>;
};

export default TopCreators;
