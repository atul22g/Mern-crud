import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("http://localhost:5500/api/products");
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <div className="App">
        <h1>My Products</h1>
        <table>
          <thead>
            <tr>
              <th><h3>Name</h3></th>
              <th><h3>Price</h3></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  {/* <div key={product._id}> */}
                  <td>
                    <h4>{product.name}</h4>
                  </td>
                  <td>
                    <h4>{product.price}</h4>
                  </td>
                  {/* </div> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
