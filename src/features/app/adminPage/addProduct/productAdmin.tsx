import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Img,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { IoMdAttach } from "react-icons/io";
import { NavbarAdmin } from "../../../navbar/navbarAdmin";
import { createProduct } from "../../../../store/product/async";
import { useState } from "react";
import { useAppDispatch } from "../../../../store";

export function ProductAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <ProductContent />
    </Box>
  );
}

export function ProductContent() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [name, setName] = useState("");
  const [description, seDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stok", stok);
    if (image) {
      formData.append("image", image);
    }

    try {
      const resultAction = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(resultAction)) {
        toast({
          title: "Product added.",
          description: "Your product has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box padding="5%">
      <Text color="#613D2B" fontWeight="bold" fontSize="25px" mb={4}>
        Add Product
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex justify="space-between" mt="2%">
          <Flex direction="column" w="50%" p={4}>
            <Input
              type="text"
              mb={4}
              padding="25px 10px"
              placeholder="Name"
              w="100%"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border="2px solid #613D2B"
              color="black"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              mb={4}
              padding="25px 10px"
              placeholder="Stock"
              w="100%"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border="2px solid #613D2B"
              color="black"
              onChange={(e) => setStok(e.target.value)}
            />
            <Input
              type="number"
              mb={4}
              padding="25px 10px"
              placeholder="Price"
              w="100%"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border="2px solid #613D2B"
              color="black"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Textarea
              padding="25px 10px"
              placeholder="Description"
              w="100%"
              _placeholder={{ color: "#613D2B" }}
              bg="#613D2B40"
              border="2px solid #613D2B"
              color="black"
              mb={4}
              h={"110px"}
              resize="none"
              onChange={(e) => seDesc(e.target.value)}
            />

            <FormControl w="100%" mb={4}>
              <Input type="file" display="none" id="file-upload" onChange={handleFileChange} />
              <label htmlFor="file-upload">
                <Flex
                  p={4}
                  borderRadius="md"
                  bg="#613D2B40"
                  border="2px solid #613D2B"
                  color="black"
                  alignItems="center"
                  justifyContent="space-between"
                  w="100%"
                  cursor="pointer"
                >
                  <Text color="#613D2B">Photo Product</Text>
                  <Icon as={IoMdAttach} fontSize="30px" color="#613D2B" />
                </Flex>
              </label>
            </FormControl>
            <Button
              bg="#613D2B"
              type="submit"
              color="white"
              _hover={{ bg: "#613D2B" }}
              mt={4}
            >
              Add Product
            </Button>
          </Flex>

          <Flex direction="column" w="45%" h="10%" p={4}>
            <Img
              src="../src/assets/kopi.png"
              h="5%"
              w="80%"
              maxW={"80%"}
              maxH={"80%"}
            />
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
