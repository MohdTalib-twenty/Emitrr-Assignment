import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../Components/QuestionCard";
export default function Quiz({score,setScore,questions,setQuestions}) {
  const {sub,difficulty}=useParams();
  const [currentNo, setCurrentNo] = useState(0);
  const [options, setOptions] = useState();
  const [count,setCount]=useState(0)
  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currentNo]?.correct_answer,
          ...questions[currentNo]?.incorrect_answers,
        ])
    );
  }, [currentNo, questions]);



  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <h4 className="text-center">Welcome</h4>

          <div className="my-5 d-flex flex-row">
            <p className="fw-bold">Subject:{sub}({difficulty})</p>
            <p className="fw-bold ms-auto">Score:{score}</p>
          </div>
          {questions && <QuestionCard
            currentNo={currentNo}
            setCurrentNo={setCurrentNo}
            questions={questions}
            options={options}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            correct={questions[currentNo]?.correct_answer}
            difficulty={difficulty}
            count={count}
            setCount={setCount}
            sub={sub}
          />}
        </div>
      </div>
    </>
  );
}
