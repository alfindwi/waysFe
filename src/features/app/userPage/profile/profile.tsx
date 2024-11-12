import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { Navbar } from "../../../navbar/navbar";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { getOrder } from "../../../../store/order/async";

export function Profile() {
  return (
    <Box>
      <Navbar />
      <ProfileContent />
    </Box>
  );
}

export function ProfileContent() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder()); 
  }, [dispatch]);
  return (
    <Flex>
      <Box ml="20px" width="500px" maxWidth="100%" mt="20px" height="100%">
        <Text color="#613D2B" fontWeight="bold" fontSize="26px">
          My Profile
        </Text>
        <Flex
          ml="2%"
          mt={4}
          gap={2}
          wrap="wrap"
          justifyContent="flex-start"
          height="100%"
        >
          <Flex>
            <Box mt={2} w="250px">
              <Img
                src={user?.image}
                w="500px"
                h="340px"
                objectFit="cover"
                borderTopRadius="md"
              />
            </Box>
            <Box mt={2} ml={5} maxW="300px">
              <Box mb={3}>
                <Text color="#613D2B" fontWeight="bold" fontSize="20px">
                  Name
                </Text>
                <Text color="#613D2B" fontSize="15px">
                  {user?.name}
                </Text>
              </Box>
              <Box mb={3}>
                <Text color="#613D2B" fontWeight="bold" fontSize="20px">
                  Email
                </Text>
                <Text color="#613D2B" fontSize="15px">
                  {user?.email}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box ml="100px" maxW="100%" mt="20px" height="100%">
        <Text color="#F74D4D" fontWeight="bold" fontSize="26px">
          My Transaction
        </Text>
        <Flex direction="column" w="570px" maxW="100%" h="100%" p={4}>
          {orders.map((order) => (
            <Box bgColor="#F6E6DA" p={4} position="relative" mb={2}>
              <Img
                src="/src/assets/icon.png"
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
                  src={order.OrderItems[0].product.image}
                  w="70px"
                  h="100px"
                  objectFit="cover"
                />
                <Box ml={4} flex="1">
                  <Text fontWeight="bold" color="#613D2B" fontSize="13px">
                    {order.OrderItems[0].product.name}
                  </Text>
                  <Text fontWeight="bold" color="#613D2B" fontSize="9px">
                    Saturday,{" "}
                    <span style={{ fontWeight: "lighter" }}>5 March 2020</span>
                  </Text>
                  <Text
                    fontWeight="normal"
                    mt="5%"
                    color="#613D2B"
                    fontSize="10px"
                  >
                    Price <span>: Rp {order.OrderItems[0].product.price}</span>
                  </Text>
                  <Text fontWeight="normal" color="#613D2B" fontSize="10px">
                    Qty <span>: {order.OrderItems[0].quantity}</span>
                  </Text>
                  <Text fontWeight="bold" color="#613D2B" fontSize="11px">
                    Sub Total <span>: Rp {order.totalAmount}</span>
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
