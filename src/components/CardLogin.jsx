import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { baseUrl } from "../utils/config";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slices/usersSlices";
YupPassword(yup);

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username or Email can not be empty"),
  password: yup
    .string()
    .required("Password can not be empty")
    .min(6)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1),
});

const CardLogin = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { usernameOrEmail, password } = values;
        const { data } = await axios.post(baseUrl + "/users/login", {
          usernameOrEmail,
          password,
        });
        localStorage.setItem("sosmed_app", data.token);
        dispatch(loginAction(data.data));

        toast({
          title: "Login Success",
          status: "success",
          duration: 1500,
          isClosable: "true",
          position: "top-right",
        });

        navigate("/");
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 1500,
          isClosable: "true",
          position: "top-right",
        });
      }
    },
  });
  return (
    <Box
      rounded={"xl"}
      boxShadow={"dark-lg"}
      mx={"auto"}
      w="400px"
      marginTop={10}
      py={12}
      px={6}
    >
      <Stack spacing={4}>
        <Text fontWeight="bold" fontSize={"28px"}>
          Sign in
        </Text>
        <Text>
          Not have account ?{" "}
          <Text display="inline" color="pink.500">
            <Link to="/register">Register now</Link>
          </Text>
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={Boolean(
              formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
            )}
          >
            <FormLabel>Username / Email</FormLabel>
            <Input
              type="text"
              name="usernameOrEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usernameOrEmail}
            />
            <FormErrorMessage>{formik.errors.usernameOrEmail}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(
              formik.errors.password && formik.touched.password
            )}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Center mt="4">
            <Button type="submit" colorScheme="pink">
              Login
            </Button>
          </Center>
        </form>
      </Stack>
    </Box>
  );
};

export default CardLogin;
