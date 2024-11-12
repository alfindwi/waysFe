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
import { registerAsync } from "../../../store/auth/async";
import {
  registerSchema,
  RegisterSchema,
} from "../../../validations/registerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../store";

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const res = await dispatch(registerAsync(data));

    if (registerAsync.fulfilled.match(res)) {
      toast({
        title: "Account created.",
        description: "Successfully created account.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      reset({
        name: "",
        email: "",
        password: "",
      });
    }

    navigate("/login");
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
          Register
        </Text>
        <form onClick={handleSubmit(onSubmit)}>
          <FormControl mb={5} isInvalid={!!errors.email}>
            <Input
              type="email"
              padding={"25px 10px"}
              placeholder="Email"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border={"2px solid #613D2B"}
              color="black"
              {...register("email")}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={!!errors.password}>
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
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={10} isInvalid={!!errors.name}>
            <Input
              type="text"
              padding={"25px 10px"}
              placeholder="Full Name"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              {...register("name")}
              border={"2px solid #613D2B"}
              color="black"
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <Button
            width="full"
            padding={"25px 10px"}
            bgColor={"#613D2B"}
            color={"white"}
            _hover={{ bgColor: "#DBB699", color: "#613D2B" }}
            fontWeight={"bold"}
            type="submit"
            isLoading={loading}
          >
            {loading ? <Spinner color="white" /> : "Register"}
          </Button>
        </form>

        <Text mt={4} textAlign={"center"} color={"#613D2B"}>
          Already have an account ? Klik{" "}
          <Link to="/login">
            <span style={{ color: "#613D2B", fontWeight: "bold" }}>Here</span>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
