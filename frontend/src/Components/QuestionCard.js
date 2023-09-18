import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionCard({sub,count,setCount,difficulty,score,setScore,questions,setQuestions,currentNo,setCurrentNo,correct,options}) {
    const [selectedOption,setSelectOption]=useState()   
    const Navigate=useNavigate()
    const handleSubmitNext=()=>{
        if(selectedOption===correct){
           if(difficulty==="easy") setScore(score+1);
           if(difficulty==="medium") setScore(score+2);
           if(difficulty==="hard") setScore(score+3);
           setCount(count+1)
        }
       if(currentNo>8){
        Navigate(`/result/${sub}/${difficulty}/${count}`)
       }else{
        setCurrentNo(currentNo+1);
       }
        
    }
   
  return (
    <>
      <div class="card" >
        <h2 class="card-title text-center mt-5">Question:{currentNo+1}-{questions[currentNo].question}</h2>
        
        <div class="card-body my- 3">
          <div >
            {options && options.map((op)=>{
                return(<>
                    <div class="form-check my-5">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value= {op}
                onClick={(e)=>setSelectOption(e.target.value)}
              />
              <label class="form-check-label fw-bold fs-5" for="exampleRadios1">
              {op}
              </label>
            </div>
                </>)
            })}
           
          </div>
          <div className="my-3 d-flex flex-row">
          <button className="btn btn-warning px-5 ">Prev</button>
          <p className="ms-auto w-25"><button className="btn btn-success " onClick={handleSubmitNext}>Submit & Next</button></p>

          </div>
        </div>
      </div>
    </>
  );
}
