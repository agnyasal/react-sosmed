import { Container } from "@chakra-ui/react";
import CardLogin from "../components/CardLogin";

const Login = () => {
  return (
    <Container
      maxW="7xl"
      display="flex"
      justifyContent="center"
      mt={{ base: "10", md: "20" }}
    >
      <CardLogin />
    </Container>
  );
};

export default Login;
