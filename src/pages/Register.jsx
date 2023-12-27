import { Container } from "@chakra-ui/react";
import CardRegister from "../components/CardRegister";

const Register = () => {
  return (
    <Container
      maxW="7xl"
      display="flex"
      justifyContent="center"
      mt={{ base: "10", md: "20" }}
    >
      <CardRegister />
    </Container>
  );
};

export default Register;
