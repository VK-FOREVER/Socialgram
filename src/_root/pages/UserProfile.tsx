import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  return <div>UserProfile id is {id}</div>;
};

export default UserProfile;
