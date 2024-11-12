import {
  Badge,
  Box,
  Flex,
  Icon,
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRegUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { useAppSelector } from "../../store";


export function Navbar() {
  const location = useLocation();
  const {cart} = useAppSelector((state) => state.cart);
  const {user} = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login"; 
  };

  return (
    <Flex
      as="nav"
      bg="white"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
    >
      <Flex alignItems="center" ml={5} as={Link} to={"/"}>
        <Image src="/src/assets/icon.png" alt="Logo" width="100px" zIndex={2} />
      </Flex>

      <Flex gap={2} mr={9} alignItems="center">
        {/* Ikon Keranjang */}
        <Link to={"/cart"}>
          <Box position="relative" display="inline-block" mr={4}>
            <Icon
              as={BsCart4}
              fontSize="24px"
              color={location.pathname === "/cart" ? "#F74D4D" : "#613D2B"}
              _hover={{ color: "#613D2B" }}
              cursor="pointer"
            />
            {cart && cart.length > 0 && (
              <Badge
              position="absolute"
              top="-1"
              right="-2"
              bg="#F74D4D"
              color="white"
              borderRadius="full"
              fontSize="10px"
              w="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 4px rgba(0, 0, 0, 0.5)"
            >
              {cart.length}
            </Badge>
            )}
            
          </Box>
        </Link>

        <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Avatar src={user?.image} />
          </MenuButton>
          <MenuList bgColor={"white"}>
            <MenuItem as={Link} bgColor={"white"} to="/profile">
              <FaRegUser style={{ marginRight: "10px", color: "#613D2B" }}/>Profile
            </MenuItem>
            <Divider borderColor={"2px solid #613D2B"}></Divider>
            <MenuItem onClick={handleLogout} bgColor={"white"}> <ImExit style={{ marginRight: "10px", color: "red" }}/>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
