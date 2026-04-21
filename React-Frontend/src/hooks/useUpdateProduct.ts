import { useToast } from "@chakra-ui/react";
import { axiosInstance } from "../libs";
import { Controller, Product } from "../types";

export const useUpdateProduct = () => {
  const toast = useToast();

  const onUpdate = async (id: number, product: Partial<Product>) => {
    try {
      const updateProduct = await axiosInstance.put(
        `${Controller.PRODUCT}/${id}`,
        product
      );
      toast({
        title: "Product updated.",
        description: "Product has been updated successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      return updateProduct;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updated product.",
        description: "There was an error updated the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  return { onUpdate };
};
