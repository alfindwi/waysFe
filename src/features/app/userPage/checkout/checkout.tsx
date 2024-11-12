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
} from "@chakra-ui/react";
import { IoMdAttach } from "react-icons/io";
import { Navbar } from "../../../navbar/navbar";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { getCart } from "../../../../store/cart/async";
import {
  createOrder,
  getOrder,
  updatePayemntStatus,
} from "../../../../store/order/async";

export function Checkout() {
  return (
    <Box>
      <Navbar />
      <CartPage />
    </Box>
  );
}

export function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, id: cartId } = useAppSelector((state) => state.cart);
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handlePayment = async () => {
    if (!cart || cart.length === 0) {
      console.log("No cart items to process.");
      return;
    }

    try {
      const { token } = await dispatch(
        createOrder({ cartId: cartId ?? 0 })
      ).unwrap();

      if (!token) {
        throw new Error("Transaction Token is undefined");
      }

      window.snap.pay(token, {
        onSuccess: async function (result: any) {
          console.log("Payment success");
          try {
            await dispatch(
              updatePayemntStatus({
                orderId: result.order_id,
                status: "SUCCESS",
              })
            );
          } catch (error) {
            console.log("Error updating payment status:", error);
          }
        },
        onPending: async function (result: any) {
          console.log("Transaction pending");
          try {
            await dispatch(
              updatePayemntStatus({
                orderId: result.order_id,
                status: "PENDING",
              })
            );
          } catch (error) {
            console.log("Error updating payment status:", error);
          }
        },
        onError: async function (result: any) {
          console.log("Payment failed");
          try {
            await dispatch(
              updatePayemntStatus({
                orderId: result.order_id,
                status: "CANCEL",
              })
            );
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.log("Payment error:", error);
    }
  };
  return (
    <Box padding="5%">
      <Text color="#613D2B" fontWeight="bold" fontSize="25px" mb={4}>
        Shipping
      </Text>

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
          />
          <Input
            type="email"
            mb={4}
            padding="25px 10px"
            placeholder="Email"
            w="100%"
            _placeholder={{ color: "#613D2B" }}
            bg="#613D2B40"
            border="2px solid #613D2B"
            color="black"
          />
          <Input
            type="number"
            mb={4}
            padding="25px 10px"
            placeholder="Phone"
            w="100%"
            _placeholder={{ color: "#613D2B" }}
            bg="#613D2B40"
            border="2px solid #613D2B"
            color="black"
          />
          <Input
            type="number"
            mb={4}
            padding="25px 10px"
            placeholder="Pos Code"
            w="100%"
            _placeholder={{ color: "#613D2B" }}
            bg="#613D2B40"
            border="2px solid #613D2B"
            color="black"
          />
          <Textarea
            padding="25px 10px"
            placeholder="Address"
            w="100%"
            _placeholder={{ color: "#613D2B" }}
            bg="#613D2B40"
            border="2px solid #613D2B"
            color="black"
            mb={4}
          />
          <FormControl w="100%" mb={4}>
            <Input type="file" display="none" id="file-upload" />
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
                <Text color="#613D2B">Attach of Transaction</Text>
                <Icon as={IoMdAttach} fontSize="30px" color="#613D2B" />
              </Flex>
            </label>
          </FormControl>
        </Flex>

        {/* Right Section */}
        <Flex direction="column" w="45%" h="100%" p={4}>
          {cart?.map((item) => (
            <Box
              bgColor="#F6E6DA"
              p={4}
              key={item.id}
              position="relative"
              mb={2}
            >
              <Img
                src="src/assets/icon.png"
                w="60px"
                h="30px"
                mr={2}
                position="absolute"
                top="10px"
                right="10px"
              />

              {/* Konten */}
              <Flex alignItems="center">
                <Img
                  src={item.product?.image}
                  w="70px"
                  h="100px"
                  objectFit="cover"
                />
                <Box ml={4} flex="1">
                  <Text fontWeight="bold" color="#613D2B" fontSize="13px">
                    {item.product?.name}
                  </Text>
                  <Text fontWeight="bold" color="#613D2B" fontSize="9px">
                    {orders[0]?.createdAt
                      ? new Date(orders[0].createdAt).toDateString()
                      : ""}
                  </Text>
                  <Text
                    fontWeight="normal"
                    mt="5%"
                    color="#613D2B"
                    fontSize="10px"
                  >
                    Price <span>: Rp {item.productPrice}</span>
                  </Text>
                  <Text fontWeight="normal" color="#613D2B" fontSize="10px">
                    Qty <span>: 2</span>
                  </Text>
                  <Text fontWeight="bold" color="#613D2B" fontSize="11px">
                    Sub Total <span>: Rp {item.totalPrice}</span>
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}

          {cart && cart.length > 0 && (
            <Button
              w={"20%"}
              mb={5}
              mt={2}
              ml={"72%"}
              bgColor={"#F74D4D"}
              _hover={{ bgColor: "#D63C3C" }}
              onClick={handlePayment}
              disabled={!cartId}
            >
              Pay
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
