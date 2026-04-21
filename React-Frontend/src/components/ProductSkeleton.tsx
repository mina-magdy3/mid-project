import {
  Flex,
  Heading,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Avatar,
  Box,
  Badge,
  Text,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <Box
      shadow={"md"}
      rounded={"md"}
      m={32}
    >
      <Flex
        px="5"
        mb={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>
          <Skeleton>Products</Skeleton>
        </Heading>
        <Button>
          <Skeleton>Add Product</Skeleton>
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Skeleton>ID</Skeleton>
              </Th>
              <Th>
                <Skeleton>Name</Skeleton>
              </Th>
              <Th>
                <Skeleton>Description</Skeleton>
              </Th>
              <Th>
                <Skeleton>Is In Store?</Skeleton>
              </Th>
              <Th isNumeric>
                <Skeleton>Price</Skeleton>
              </Th>
              <Th>
                <Skeleton>Actions</Skeleton>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Tr key={index}>
                  <Td>01</Td>
                  <Td>
                    <HStack>
                      <Avatar
                        name={"AD"}
                        size="sm"
                      />
                      <Text>Product name</Text>
                    </HStack>
                  </Td>
                  <Td>Product description</Td>
                  <Td>
                    <Badge>Yes</Badge>
                  </Td>
                  <Td isNumeric>123</Td>
                  <Td>
                    <HStack>
                      <SkeletonCircle>1</SkeletonCircle>
                      <SkeletonCircle>1</SkeletonCircle>
                      <SkeletonCircle>1</SkeletonCircle>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
