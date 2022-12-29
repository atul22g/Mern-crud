import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Delete
  const deleteProduct = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:5500/api/products/:${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = res.json();
    if (!data || res.status === 400) {
      alert("Product is Not Delete");
    } else {
      alert("Product is Delete");
    }
  };

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
  }, [deleteProduct]);
  return (
    <>
      <div className="App">
        <h1>My Products</h1>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Name</h3>
              </th>
              <th>
                <h3>Price</h3>
              </th>
              <th>
                <h3>Action</h3>
              </th>
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
                  <td>
                    <i className="fa-solid fa-pen-nib me-3"></i>
                    <i
                      className="fa-solid fa-trash ms-3"
                      onClick={() => deleteProduct(product._id)}
                    ></i>
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
