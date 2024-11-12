import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync } from "../../../store/auth/async";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store";
import { loginSchema, LoginSchema } from "../../../validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const res = await dispatch(loginAsync(data));

    if (loginAsync.fulfilled.match(res)) {
      toast({
        title: "Welcome.",
        description: "Welcome to DumbMerch.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      reset({
        email: "",
        password: "",
      });

      const role = res.payload.user.role;
      navigate(role === "ADMIN" ? "/admin" : "/");
    } else if (loginAsync.rejected.match(res) && error) {
      toast({
        title: "Login Failed",
        description: "invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="grey"
      color="white"
    >
      <Box
        flex="1"
        maxW="400px"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Text fontSize="3xl" fontWeight={"bold"} color="#613D2B" mb={6}>
          Login
        </Text>
        <form onClick={handleSubmit(onSubmit)}>
          <FormControl mb={5} isInvalid={!!errors.email}>
            <Input
              type="email"
              padding={"25px 10px"}
              placeholder="email"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border={"2px solid #613D2B"}
              color="black"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={10} isInvalid={!!errors.password}>
            <Input
              type="password"
              padding={"25px 10px"}
              placeholder="password"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border={"2px solid #613D2B"}
              color="black"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            width="full"
            padding={"25px 10px"}
            bgColor={"#613D2B"}
            color={"white"}
            _hover={{ bgColor: "#DBB699", color: "#613D2B" }}
            fontWeight={"bold"}
            type="submit"
          >
            {loading ? <Spinner color="white" /> : "Login"}
          </Button>
        </form>
        <Text mt={4} textAlign={"center"} color={"#613D2B"}>
          Don't have an account ? Klik{" "}
          <Link to="/register">
            <span style={{ color: "#613D2B", fontWeight: "bold" }}>Here</span>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
