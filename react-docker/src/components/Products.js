import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Edit
  const [ename, setEname] = useState("");
  const [eprice, setEprice] = useState("");

  const editProduct = () => {};
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
      {/* Edit Form */}
      <div
        className="modal fade"
        id="editBtn"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Edit the Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section>
                <div className="mt-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Enter Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={ename}
                    onChange={(e) => setEname(e.target.value)}
                    id="exampleFormControlInput1"
                    placeholder="Enter The Product Name"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Enter Product Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="price"
                    value={eprice}
                    onChange={(e) => setEprice(e.target.value)}
                    placeholder="Enter The Price"
                  />
                  <div className="col-12 mt-4">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={editProduct}
                    >
                      Submit form
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Product */}
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
                  {/* <div key={product._id}> */}
                  <td>
                    <h4>{product.name}</h4>
                  </td>
                  <td>
                    <h4>{product.price}</h4>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen-nib me-3"
                      data-bs-target="#editBtn"
                      data-bs-toggle="modal"
                    ></i>
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
