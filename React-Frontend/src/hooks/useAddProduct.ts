import { useToast } from "@chakra-ui/react";
import { axiosInstance } from "../libs";
import { Controller, Product } from "../types";

export const useAddProduct = () => {
  const toast = useToast();

  const onSave = async (product: Partial<Product>) => {
    try {
      const newProduct = await axiosInstance.post(Controller.PRODUCT, product);
      toast({
        title: "Product added.",
        description: "Product has been added successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      return newProduct;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error adding product.",
        description: "There was an error adding the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  return { onSave };
};
