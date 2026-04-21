import { useToast } from "@chakra-ui/react";
import { axiosInstance } from "../libs";
import { Controller } from "../types";

export const useDeleteProduct = () => {
  const toast = useToast();

  const onDelete = async (id: number) => {
    try {
      const deleteProduct = await axiosInstance.delete(
        `${Controller.PRODUCT}/${id}`
      );
      toast({
        title: "Product deleted.",
        description: "Product has been deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      return deleteProduct;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleted product.",
        description: "There was an error deleted the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  return { onDelete };
};
