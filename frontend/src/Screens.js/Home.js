import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, json, useNavigate } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";
import Categories from "../data/Category";

export default function Home({ fetchQuestion }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [Subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async () => {
    var sub=Categories[category-9].category;
    
     fetchQuestion(category, difficulty);
     navigate(`/quiz/${sub}/${difficulty}`);
  };
  useEffect(()=>{
    var p=JSON.parse(localStorage.getItem("User"))
    if(p){
      setUser(p)
      console.log(p)
    }
  },[])

  return (
    <>
      {user ? (<><div className="container">
        <div className="row">
          <div className="content-quiz col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <h2 className="fw-bold">Please read carefully</h2>
            <ul>
              <li className="fw-bold my-2">You will be asked 10 questions one after another.</li>
              <li className="fw-bold my-2">Points will be awarded for correct answer.</li>
              <li className="fw-bold my-2">Quiz contains 3 types of question (easy,medium,hard).</li>
              <li className="fw-bold my-2"> For easy(1 marks),for medium (2 marks) & for hard (3 marks) you will get for the correct answer.</li>
              <li className="fw-bold my-2">You can't move to the previous question once you click on next.</li>
              <li className="fw-bold my-2"> The result will be declared at the end of the quiz.</li>
            </ul>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="home-form-container">
              <div className="card px-5 py-5">
                <div className=" mt-2">
                  <h2 className="text-center fs-2">
                    <BiSolidLogInCircle className="fs- 4 fw-bold mx-2" />
                    Select Your Quiz
                  </h2>
                </div>
                <hr />
                <div className="mb-3">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2"
                  >
                    <optin value="disable">Choose Category</optin>
                    {Categories.map((cat, idx) => {
                      return (
                        <>
                          <option value={idx + 9}>{cat.category}</option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="p-2"
                  >
                    <option value="disable">Choose Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="    btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div></>):(<><h3 className="mt-5 text-center">Please LogIn First</h3></>)}
    </>
  );
}
