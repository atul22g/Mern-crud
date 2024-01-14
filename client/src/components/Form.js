import React, { useState } from "react";
const BackendURL = process.env.REACT_APP_BackendURL;

const Form = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getProject = async (e) => {
    e.preventDefault();
    const res = await fetch(BackendURL+"/api/products", {
      method: "POST",
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
      alert("Form Not Submit");
    } else {
      alert("Form Submit");
    }
  };
  return (
    <section className="container mt-5">
      <h1>Post Data</h1>
      <div className="mt-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Enter Product Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="exampleFormControlInput1"
          placeholder="Enter The Product Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Enter Product Price
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter The Price"
        />
        <div className="col-12 mt-4">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={getProject}
          >
            Submit form
          </button>
        </div>
      </div>
    </section>
  );
};

export default Form;
