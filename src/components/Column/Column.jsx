import React from "react";
import styles from "./Column.module.css";

const Column = ({ name, tasks, onAddTask, onDropTask, onDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    const title = prompt("Add new task");
    const description = prompt("Enter the description of task");
    if (title && description) {
      onAddTask({ title, description });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData("task");
    if (!taskData) return;
    const task = JSON.parse(taskData);
    onDropTask(task, name);
  };

  return (
    <div className={styles.box} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2 className={styles.nameOfColumns}>{name}</h2>
      {tasks.map((task) => (
        <div
          className={styles.itemBox}
          key={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, task)}
        >
          <h4 className={styles.title}>Title: {task.title}</h4>
          <p className={styles.description}>Description: {task.description}</p>
          <p className={styles.description}>Id: {task.id}</p>
        </div>
      ))}
      {name === "ToDo" && (
        <button className={styles.button} onClick={handleAddTask}>
          Add new task
        </button>
      )}
    </div>
  );
};

export default Column;
