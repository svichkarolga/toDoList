import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "./components/Board/Board.jsx";
import SearchTask from "./components/SearchTask/SearchTask.jsx";
import { fetchTask } from "./redux/tasks/operations";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const handleSearch = async (newTopic) => {
    setTopic(newTopic);
  };
  useEffect(() => {
    dispatch(fetchTask()); // Завантажуємо таски при запуску
  }, [dispatch]);
  return (
    <div>
      <h1>Task board</h1>
      <SearchTask onSubmit={handleSearch} />
      <Board searchQuery={topic} />
    </div>
  );
};

export default App;
