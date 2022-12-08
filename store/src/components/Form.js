import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/form.css";
import Result from "./Result";
const URL = "http://localhost:5000/api/v1/products";
const companyList = ["ikea", "liddy", "caressa", "marcos"];

const Form = () => {
  const [form, setForm] = useState({
    featured: false,
    name: "",
    company: "",
    nameSort: "",
    priceSort: "",
    page: 0,
  });
  const [pageResponse, setPageRes] = useState([]);
  const [response, setResponse] = useState([]);

  const { featured, company, name, nameSort, priceSort, page } = form;

  const sort = nameSort + "," + priceSort;
  const pageNumber = pageResponse?.length / 10;
  console.log(Math.ceil(pageNumber));

  useEffect(
    () => async () => {
      try {
        const res = await axios.get(URL);
        setPageRes(res.data.msg);
      } catch (error) {
        console.log(error.response);
      }
    },
    []
  );
  const handleCheckbox = (event) => {
    setForm((formValues) => ({ ...formValues, featured: !featured }));
  };

  const handleSelect = (event) => {
    const { value } = event.target;
    setForm((formValues) => ({ ...formValues, company: value }));
  };

  const handleName = (event) => {
    const { value } = event.target;
    setForm((formValues) => ({ ...formValues, name: value }));
  };

  const handlePage = (e, i) => {
    e.preventDefault();
    setForm((formValues) => ({ ...formValues, page: i }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `${URL}?featured=${featured}&company=${company}&name=${name}&sort=${sort}&page=${page}`
      );
      setResponse(res.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <p>{nameSort}</p>
      <p>{priceSort}</p>
      <form className="form">
        {/* ----------------------------INPUTS---------------------------------------- */}
        <div className="formContainer">
          <div className="form-row-container">
            <label>Company : </label>
            <div className="form-row">
              <select onChange={handleSelect}>
                {companyList.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row-container">
            <label>name : </label>
            <div className="form-row">
              <input onChange={handleName} />
            </div>
          </div>
          <div className="form-row-container">
            <label>Featured : </label>
            <div className="form-row">
              <input
                type="checkbox"
                value={featured}
                onChange={handleCheckbox}
              />
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {/* ----------------------------SORTS---------------------------------------- */}
        <div className="formContainer">
          <div className="form-row-container">
            <label>Sort by name : </label>
            <div className="form-row">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  return setForm((formValues) => ({
                    ...formValues,
                    nameSort: "name",
                  }));
                }}
              >
                A to Z
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  return setForm((formValues) => ({
                    ...formValues,
                    nameSort: "-name",
                  }));
                }}
              >
                Z to A
              </button>
            </div>
          </div>
          <div className="form-row-container">
            <label>Sort by Price</label>
            <div className="form-row">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  return setForm((formValues) => ({
                    ...formValues,
                    priceSort: "-price",
                  }));
                }}
              >
                High to Low
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  return setForm((formValues) => ({
                    ...formValues,
                    priceSort: "price",
                  }));
                }}
              >
                Low to High
              </button>
            </div>
          </div>
        </div>
        {/* ---------------------------PAGINATION---------------------------------------- */}
        <div className="pagination-container">
          {response.map((a, i) => (
            <button key={i} onClick={(e) => handlePage(e, i)}>
              {i}
            </button>
          ))}
        </div>
      </form>
      <div>
        {response.map((result, i) => (
          <Result key={i} result={result} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Form;
