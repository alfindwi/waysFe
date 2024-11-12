import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NavbarAdmin } from "../../../navbar/navbarAdmin";

export function TransactionAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <TransactionContent />
    </Box>
  );
}

export function TransactionContent() {
  return (
    <Box h={"100vh"} bg={"white"} p={9}>
      <Text color={"#613D2B"} mb={5} fontSize={"25px"} fontWeight={"bold"}>
        Income Transaction
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead bg={"grey"}>
            <Tr>
              <Th color={"black"}>Transaction Id</Th>
              <Th color={"black"}>Customer Name</Th>
              <Th color={"black"}>Address</Th>
              <Th color={"black"}>Post Code</Th>
              <Th color={"black"}>Products Order</Th>
              <Th color={"black"}>Status</Th>
              <Th color={"black"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            <Tr>
              <Td>1</Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                dbwb
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                PANDAWARA COFFE
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                9999
              </Td>
              <Td> dwoqd</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
