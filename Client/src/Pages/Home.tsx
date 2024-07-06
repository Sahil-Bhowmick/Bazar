import { useLoaderData } from "react-router-dom";
import Banner from "../Components/Banner";
import Products from "../Components/Products";
import { useEffect, useState } from "react";
import { Product } from "../Components/Interfaces";

interface LoaderData {
  data: Product[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const data = useLoaderData() as LoaderData;
  useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);
    }
  }, [data]);

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
