import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/form.css";
const URL = "http://localhost:5000/api/v1/products";
const companyList = ["ikea", "liddy", "caressa", "marcos"];

const Form = () => {
  const [form, setForm] = useState({
    featured: false,
    company: "ikea",
  });
  const [res, setRes] = useState([]);

  const { featured, company } = form;

  const handleCheckbox = (event) => {
    setForm((formValues) => ({ ...formValues, featured: !featured }));
  };

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setForm((formValues) => ({ ...formValues, company: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${URL}?featured=${featured}&company=${company}`
      );
      setRes(response.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div>
          <label>Company : </label>{" "}
          <select onChange={handleSelect}>
            {companyList.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Featured : </label>
          <input type="checkbox" value={featured} onChange={handleCheckbox} />
        </div>
        <button>Submit</button>
      </form>
      <div>
        {res.map((result) => {
          const { name, price, featured, rating, createdAt, company } = result;
          return <p>{name}</p>;
        })}
      </div>
    </div>
  );
};

export default Form;
