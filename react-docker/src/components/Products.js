import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Edit
  const editProduct = async (id) => {
    let name = prompt("Enter Product Name");
    let price = prompt("Enter Product Price");
    const res = await fetch(`http://localhost:5500/api/products/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
      }),
    });
    const data = res.json();
    if (!data || res.status === 400) {
      alert("Product is Not Update");
    } else {
      alert("Product is Update");
    }
  };
  // Delete
  const deleteProduct = async (id) => {
    const res = await fetch(`http://localhost:5500/api/products/${id}`, {
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

  // Get All Projects
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
        <table className="mt-3">
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
                  <td>
                    <h4>{product.name}</h4>
                  </td>
                  <td>
                    <h4>{product.price}</h4>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen-nib me-3 c-pointer"
                      onClick={() => editProduct(product._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash ms-3 c-pointer"
                      onClick={() => deleteProduct(product._id)}
                    ></i>
                  </td>
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
