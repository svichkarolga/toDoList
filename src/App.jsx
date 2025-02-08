import { React, useState } from "react";
import Board from "./components/Board/Board.jsx";
import SearchTask from "./components/SearchTask/SearchTask.jsx";
import "./App.css";

const App = () => {
  const [topic, setTopic] = useState("");
  const handleSearch = async (newTopic) => {
    setTopic(newTopic);
  };

  return (
    <div>
      <h1>Task board</h1>
      <SearchTask onSubmit={handleSearch} />
      <Board searchQuery={topic} />
    </div>
  );
};

export default App;
