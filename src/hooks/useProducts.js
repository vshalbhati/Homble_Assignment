import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../axios'; 

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getProducts();
      console.log('Fetched products:', response.data); 
      setProducts(response.data);
    } catch (err) {
      setError('Something went wrong.');
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, setProducts, isLoading, error, refetch: fetchProducts };
};
