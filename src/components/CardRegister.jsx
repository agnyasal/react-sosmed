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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { baseUrl } from "../utils/config";
import axios from "axios";
YupPassword(yup);

const validationSchema = yup.object().shape({
  username: yup.string().required("Username can not be empty"),
  email: yup
    .string()
    .email("invalid email address")
    .required("Email can not be empty"),
  password: yup
    .string()
    .required("Password can not be empty")
    .min(6)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must maatch")
    .required("Password can not be empty")
    .min(6)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1),
});

const CardRegister = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(baseUrl + "/users/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        alert("Register Success");
        navigate("/login");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
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
          Welcome to Hello.ID
        </Text>
        <Text>
          Already have an account ?{" "}
          <Text display="inline" color="pink.500">
            <Link to="/login">Login now</Link>
          </Text>
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={Boolean(
              formik.errors.username && formik.touched.username
            )}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(formik.errors.email && formik.touched.email)}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
          <FormControl
            isInvalid={Boolean(
              formik.errors.confirmPassword && formik.touched.confirmPassword
            )}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter Confirm password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Center mt="4">
            <Button type="submit" colorScheme="pink">
              Register
            </Button>
          </Center>
        </form>
      </Stack>
    </Box>
  );
};

export default CardRegister;
