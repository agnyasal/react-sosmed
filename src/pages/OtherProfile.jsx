import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/config";
import { useEffect, useState } from "react";
// import { Container } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const OtherProfile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.id);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(baseUrl + `/users/${params.id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id == userId) {
      navigate("/profile");
    }
  }, [navigate, params.id, userId]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      {params.id}
      <h1>{user?.username}</h1>
    </Layout>
  );
};

export default OtherProfile;
