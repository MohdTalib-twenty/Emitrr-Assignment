import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function Results({ score }) {
    const Navigate=useNavigate()
  const { sub,difficulty, count } = useParams();
  const [user, setUser] = useState();
  var tp = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
  var check = count > 3 ? true : false;
  var result=check?"Pass":"Fail";
    const handleSubmit=async()=>{
        const incorrect=10-count;
        const correct=count;
        //console.log(sub,difficulty,correct,incorrect,score,result)
        const token = JSON.parse(localStorage.getItem("Token"));
        var response = await fetch("http://localhost:8000/api/user/submitResult",{
            method:"POST",
            body: JSON.stringify({sub,difficulty,correct,incorrect,score,result}),
            headers:{
                'Content-Type':'application/json',
                "Authorization": "Bearer " + token,
            }
        })
       var p= await response.json();
        if(p.success){
            alert(p.message);
            Navigate("/");
        }else{
            alert(p.message)
        }
        
    }

  useEffect(() => {
    var p = JSON.parse(localStorage.getItem("User"));
    if (p) {
      setUser(p);
    }
  }, []);
 
  return (
    <>
      <div className="form-container">
        <div className="result-card">
          <h3 className="text-center my-2 fw-bold">Result</h3>
          <div className="my-5">

            <div className="d-flex flex-row my-2">
              <p className="fw-bold">Total Quiz Points:</p>
              <p className="fw-bold ms-auto">{tp}</p>
            </div>
            <div className="d-flex flex-row my-2">
              <p className="fw-bold">Total Questions:</p>
              <p className="fw-bold ms-auto">10</p>
            </div>
            <div className="d-flex flex-row my-2">
              <p className="fw-bold">Total correct:</p>
              <p className="fw-bold ms-auto">{count}</p>
            </div>
            <div className="d-flex flex-row my-2">
              <p className="fw-bold">Total Incorrect:</p>
              <p className="fw-bold ms-auto">{10 - count}</p>
            </div>
            <div className="d-flex flex-row my-2">
              <p className="fw-bold">Total Earn Points:</p>
              <p className="fw-bold ms-auto">{score}</p>
            </div>
            <div className="d-flex flex-row my-2">
              <p className="fw-bold"> Quiz Result:</p>
              {check ? (
                <p className="fw-bold ms-auto text-success">Pass</p>
              ) : (
                <p className="fw-bold ms-auto text-warning">Fail</p>
              )}
            </div>
            <button className="btn btn-primary my-3 w-100" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
