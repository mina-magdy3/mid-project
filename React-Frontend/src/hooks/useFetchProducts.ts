import { useEffect, useState } from "react";
import { Controller, Product } from "../types";
import { axiosInstance } from "../libs";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsLoading(true);
    axiosInstance
      .get(Controller.PRODUCT)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
        setError("Error fetching products");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { products, isLoading, error, fetchProducts };
};
