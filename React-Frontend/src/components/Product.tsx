import React from "react";
import { Product as ProductI } from "../types";
import {
  Tr,
  Td,
  HStack,
  Avatar,
  Text,
  Badge,
  Popover,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

export interface ProductProps {
  product: ProductI;
  onSelectProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
  onViewDetail: (id: number) => void;
}

export const Product: React.FC<ProductProps> = ({
  product,
  onSelectProduct,
  onDeleteProduct,
  onViewDetail,
}) => {
  return (
    <Tr>
      <Td>{product.id}</Td>
      <Td>
        <HStack>
          <Avatar
            name={product.name}
            size="sm"
          />
          <Text>{product.name}</Text>
        </HStack>
      </Td>
      <Td>{product.description}</Td>
      <Td>
        <Badge>{product.isInStore ? "Yes" : "No"}</Badge>
      </Td>
      <Td isNumeric>{product.price}</Td>
      <Td>
        <HStack>
          <EditIcon
            boxSize={22}
            color={"blue"}
            cursor={"pointer"}
            onClick={() => onSelectProduct(product.id)}
          />
          <Popover>
            <PopoverTrigger>
              <DeleteIcon
                boxSize={22}
                color={"red"}
                cursor={"pointer"}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>Are you sure to delete this?</PopoverBody>
              <PopoverFooter>
                <Button
                  colorScheme="red"
                  size="sm"
                  float={"right"}
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <ViewIcon
            boxSize={22}
            color={"green"}
            cursor={"pointer"}
            onClick={() => {
              onViewDetail(product.id);
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
};
