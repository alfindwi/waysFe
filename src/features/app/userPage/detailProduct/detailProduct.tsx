import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../../../../store/product/async";
import { createCart } from "../../../../store/cart/async";

export function Detail() {
  return (
    <Box>
      <Navbar />
      <DetailProduct />
    </Box>
  );
}

export function DetailProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddCart = (productId : number) => {
    dispatch(createCart({ productId }))
    .then(() => {
      navigate("/cart")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return 
  }

  return (
    <Flex flexDirection="column" alignItems="center" mt={5}>
      <Box
        borderRadius={"md"}
        h={"87%"}
        w={"87%"}
        maxW={"100%"}
        display="flex"
        position="relative"
        key={product.id}
      >
        <Flex>
          <Image
            borderRadius={"20px"}
            w={"600px"}
            h={"430px"}
            objectFit={"cover"}
            mr={8}
            p={4}
            src={product.image}
          />

          <Box
            color={"white"}
            display="flex"
            maxH={"400px"}
            flexDirection="column"
            mt={2}
            w="100%"
          >
            <Text fontSize="30px" color={"#613D2B"} fontWeight="bold">
              {product.name}
            </Text>
            <Text
              fontSize="14px"
              fontWeight={"medium"}
              mb={5}
              mt={2}
              color={"#613D2B"}
            >
              Stok : {product.stok}
            </Text>
            <Box paddingRight={3}>
              <Text
                fontWeight={"medium"}
                color={"#613D2B"}
                fontSize={"15px"}
                mt={5}
                w={"100%"}
                maxW={"95%"}
                textAlign={"justify"}
              >
                {product.description}
              </Text>
            </Box>

            <Text
              fontSize="25px"
              position="absolute"
              bottom={4}
              right={4}
              color={"#613D2B"}
              fontWeight="bold"
            >
              Rp.{product.price}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Button
        mt={6}
        w={"50%"}
        bgColor={"#613D2B"}
        color={"white"}
        _hover={{ bgColor: "#613D2B" }}
        ml={"38%"}
        mb={8}
        onClick={() => handleAddCart(product.id)}
      >
        Add to Cart
      </Button>
    </Flex>
  );
}
