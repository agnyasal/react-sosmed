import {
  Button,
  Image,
  Box,
  Container,
  ButtonGroup,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/slices/usersSlices";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("sosmed_app");
    dispatch(logoutAction());
    toast({
      title: "Logout Success",
      status: "success",
      duration: 1500,
      isClosable: "true",
      position: "top-right",
    });
    navigate("/");
  };
  return (
    <Box shadow="sm">
      <Container
        maxW="7xl"
        border="1 px solid white"
        display="flex"
        justifyContent="space-between"
        py="4"
      >
        <Image
          src="HelloLogo.png"
          alt="Logo"
          boxSize={"30"}
          onClick={() => navigate("/")}
        />
        {user.id ? (
          <Menu>
            <MenuButton>@{user.username}</MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup variant="outline" spacing="2" colorScheme="pink">
            <Button variant="solid" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Register
            </Button>
          </ButtonGroup>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
