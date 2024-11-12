import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../../navbar/navbar";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getProducts } from "../../../../store/product/async";
import { useEffect } from "react";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Card />
    </Box>
  );
}

export function Card() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box p={7} ml={"7%"}>
      <Image src="src/assets/imageHome.png" />
      <Flex mt={4} gap={5} wrap={"wrap"} justifyContent={"flex-start"}>
        {products.map((product) => (
          <Box
            bgColor={"#F6E6DA"}
            mt={2}
            borderRadius="md"
            w={"250px"}
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            transition="transform 0.5s ease, box-shadow 0.2s ease"
            gap={"20px"}
            as={Link}
            to={`detail/${product.id}`}
          >
            <Image
              src={product.image}
              w={"100%"}
              h={"280px"}
              objectFit={"cover"}
              borderTopRadius="md"
            />
            <Box mt={4} ml={3}>
              <Text
                mt={2}
                color={"#613D2B"}
                fontWeight={"bold"}
                fontSize={"20px"}
                wordBreak="break-word"
              >
                {product.name}
              </Text>
              <Text color={"#974A4A"} fontWeight={"normal"}>
                Rp. {product.price}
              </Text>
              <Text
                fontSize={"14px"}
                color={"#974A4A"}
                mr={2}
                fontWeight={"normal"}
              >
                Stock: <span>{product.stok}</span>
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
