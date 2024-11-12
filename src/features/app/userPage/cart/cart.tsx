import { Navbar } from "../../../navbar/navbar";
import { Box, Button, Divider, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { cartItems } from "../../../../types/cart";
import { deleteCart, getCart, updateCart } from "../../../../store/cart/async";
import { useEffect } from "react";

export function Cart() {
  return (
    <Box>
      <Navbar />
      <CartPage />
    </Box>
  );
}

export function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, totalAmount, loading } = useAppSelector((state) => state.cart);

  const handleUpdateCart = async (cartItem: cartItems, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItem = { cartItemId: cartItem.id, newQuantity };

    try {
      await dispatch(updateCart(updatedItem)).unwrap();
      dispatch(getCart());
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCart(id));
  };
  
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

 

  return (
    <Box padding="5%">
      <Text color="#613D2B" fontWeight="bold" fontSize="25px" mb={4}>
        My Cart
      </Text>

      <Flex justify="space-between" mt={"2%"} w="100%">
        <Box w="55%">
          <Text color="#613D2B" fontWeight="bold" fontSize="20px" mb={4}>
            Review Your Order
          </Text>
          <Divider borderColor="gray.400" mb={4} />
          {cart.map((carts) => (
            <Flex align="center" mb={4} w="100%" key={carts.id}>
              <Img src={carts.product?.image} boxSize="65px" mr={4} />

              <Box flex="1">
                <Text fontWeight="bold">{carts.product?.name}</Text>
                <Flex mt={2} align="center">
                  <Button
                    size="sm"
                    color="#613D2B"
                    fontSize="xl"
                    onClick={() =>
                      handleUpdateCart(carts, Math.max(carts.quantity - 1, 1))
                    }
                  >
                    -
                  </Button>
                  <Text
                    mx={2}
                    bgColor="#F6E6DA"
                    fontSize="sm"
                    pr={2}
                    pl={2}
                    borderRadius="md"
                  >
                    {carts.quantity}
                  </Text>
                  <Button
                    size="sm"
                    color="#613D2B"
                    fontSize="xl"
                    onClick={() => handleUpdateCart(carts, carts.quantity + 1)}
                  >
                    +
                  </Button>
                </Flex>
              </Box>

              <Box textAlign="right">
                <Text fontWeight="thin" mb={2} fontSize="md" color="#974A4A">
                  Rp. {carts.totalPrice}
                </Text>
                <Button bgColor={"transparent"} onClick={() => handleDelete(carts.id)} _hover={{ bgColor: "transparent" }}>
                <Icon as={FaTrashAlt} cursor="pointer" color="#974A4A" />
                </Button>
              </Box>
            </Flex>
          ))}

          <Divider borderColor="gray.400" my={4} />
        </Box>

        <Box w="35%" textAlign="right">
          <Divider borderColor="gray.400" mb={4} />

          <Flex justify="space-between" fontWeight="bold" fontSize="lg">
            <Text>Sub Total:</Text>
            <Text>Rp. {totalAmount}</Text>
          </Flex>

          <Flex justify="space-between" mt={2}>
            <Text>Qty:</Text>
            <Text>{totalQuantity}</Text>
          </Flex>

          <Divider borderColor="gray.400" my={4} />

          <Flex justify="space-between" fontWeight="bold" fontSize="lg">
            <Text>Total:</Text>
            <Text>Rp. {loading ? "-" : totalAmount}</Text>
          </Flex>

          <Link to="/checkout">
            <Button
              bgColor="#613D2B"
              _hover={{ bgColor: "#613D2B" }}
              color="white"
              mt={"10%"}
              w="50%"
            >
              Proceed To Checkout
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
