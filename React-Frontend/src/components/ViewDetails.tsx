import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  HStack,
  Avatar,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Product } from "../types";

interface ViewDetailsProps {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
}

export const ViewDetails: React.FC<ViewDetailsProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View Detail {product.name}</DrawerHeader>

          <DrawerBody>
            <HStack alignItems={"center"}>
              <Avatar
                name={product.name}
                size={"sm"}
              />
              <Heading fontSize={16}>{product.name}</Heading>
            </HStack>
            <VStack
              alignItems={"center"}
              marginTop={12}
            >
              <Text>{product.description}</Text>
              <Heading
                fontSize={20}
                marginTop={5}
              >
                ${product.price}
              </Heading>
            </VStack>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
