import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GiCoffeeBeans } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";

export function NavbarAdmin() {

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
      <Flex alignItems="center" ml={5} as={Link} to={"/admin"}>
        <Image src="/src/assets/icon.png" alt="Logo" width="100px" zIndex={2} />
      </Flex>

      <Flex gap={2} mr={9} alignItems="center">

        <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Avatar src="/src/assets/cat.jpg" />
          </MenuButton>
          <MenuList bgColor={"white"}>
            <MenuItem as={Link} bgColor={"white"} to="/admin/product">
              <GiCoffeeBeans style={{ marginRight: "10px", color: "#613D2B" }} />
              Add Product
            </MenuItem>
            <Divider borderColor={"2px solid #613D2B"}></Divider>
            <MenuItem onClick={handleLogout} bgColor={"white"}>
              <ImExit style={{ marginRight: "10px", color: "red" }} />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
