import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/form.css";
import Result from "./Result";
const URL = "http://localhost:5000/api/v1/products";
let companyList = [];

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
  const [range, setRange] = useState(3);

  const { featured, company, name, nameSort, priceSort, page } = form;

  const sort = nameSort + "," + priceSort;
  const pageNumber = Math.ceil(pageResponse.length / 10);
  //   (response?.length != 0 ? response : pageResponse)?.length / 10
  // );

  const pageURL = `${URL}?featured=${featured}&company=${company}&name=${name}`;

  const pagefn = async () => {
    try {
      const res = await axios.get(pageURL);
      setPageRes(() => res.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };
  // const ratingVal = "4";
  const datafn = async () => {
    try {
      const res = await axios.get(
        `${URL}?featured=${featured}&company=${company}&name=${name}&sort=${sort}&page=${page}&numericFilters=rating>${range}`
      );
      setResponse(() => res.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };

  const companyOptionfn = async () => {
    try {
      const res = await axios.get(URL);

      companyList = [
        ...new Set(res.data.companyOptions.map((res) => res.company)),
      ];
      companyList.unshift("");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    pagefn();
    return () => {
      console.log("DONE");
    };
  }, [response]);

  useEffect(() => {
    companyOptionfn();
    return () => {
      console.log("DONE");
    };
  }, []);

  const handleCheckbox = (event) => {
    setForm((formValues) => ({ ...formValues, featured: !featured }));
  };

  const handleSelect = (event) => {
    const { value } = event.target;
    setForm((formValues) => ({ ...formValues, company: value }));
  };

  const handleName = (event) => {
    const { value } = event.target;
    setTimeout(() => {
      setForm((formValues) => ({ ...formValues, name: value }));
    }, 1000);
  };

  const handlePage = (e, i) => {
    e.preventDefault();
    setForm((formValues) => ({ ...formValues, page: i + 1 }));
  };

  const handleRange = (e) => {
    // console.log();
    setRange(e.target.value);
  };

  useEffect(() => {
    setForm((formValues) => ({ ...formValues, page: 0 }));

    datafn();

    return () => {
      console.log("DONE");
    };
  }, [featured, company, name, sort, page, range]);

  return (
    <div>
      <form className="form-container">
        <div className="form">
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
              <label>Sort by range of rating : </label>
              <div className="form-row">
                <div className="slidecontainer">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    className="slider"
                    id="myRange"
                    onChange={handleRange}
                    title="value"
                    value={range}
                  />
                </div>
                <span>{range}</span>
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
        </div>
        {/* ---------------------------PAGINATION---------------------------------------- */}
        {response.length !== 0 && (
          <div className="pagination-container">
            {Array.from(Array(pageNumber), (_, i) => (
              <button key={i} onClick={(e) => handlePage(e, i)}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </form>
      <div className="result-notes">
        {response.map((result, i) => (
          <Result key={i} result={result} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Form;
