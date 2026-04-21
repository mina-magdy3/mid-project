import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Input,
  Textarea,
  Text,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddProduct, useUpdateProduct } from "../hooks";
import { Product } from "../types";

export interface ProductFormProps {
  isOpen: boolean;
  updateProduct: Product | null;
  onClose: () => void;
  fetchProducts: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  updateProduct,
  onClose,
  fetchProducts,
}) => {
  const [product, setProduct] = useState({
    id: updateProduct?.id ?? 0,
    name: updateProduct?.name ?? "",
    description: updateProduct?.description ?? "",
    price: updateProduct?.price ?? 0,
    isInStore: updateProduct?.isInStore ?? false,
  });
  const { onSave } = useAddProduct();
  const { onUpdate } = useUpdateProduct();

  const handleOnSave = async () => {
    try {
      await onSave(product);
      fetchProducts();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnUpdate = async () => {
    try {
      await onUpdate(updateProduct?.id!, product);
      fetchProducts();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              gap={4}
              alignItems={"self-start"}
            >
              <Input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Product Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <Text>Is in store?</Text>
              <Switch
                isChecked={product.isInStore}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    isInStore: e.target.checked,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            {updateProduct ? (
              <Button
                colorScheme="blue"
                onClick={handleOnUpdate}
              >
                Update
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                onClick={handleOnSave}
              >
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
