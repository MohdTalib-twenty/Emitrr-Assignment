import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Screens.js/Register";
import LogIn from "./Screens.js/LogIn";

import Home from "./Screens.js/Home";
import Navbar from "./Components/Navbar";
import Quiz from "./Screens.js/Quiz";
import { useState } from "react";
import axios from "axios";
import Results from "./Screens.js/Results";

function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category, difficulty) => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    console.log(data.results);
    setQuestions(data.results);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home fetchQuestion={fetchQuestions} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/quiz/:sub/:difficulty"
          element={
            <Quiz
              score={score}
              setScore={setScore}
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        />
        <Route path="/result/:sub/:difficulty/:count" element={<Results score={score} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
