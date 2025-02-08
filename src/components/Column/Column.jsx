import React, { useState } from "react";
import styles from "./Column.module.css";
import ModalAdd from "../Modal/ModalAddTask.jsx";

const Column = ({ name, tasks, onAddTask, onDropTask, onDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveTask = (title, description) => {
    if (title && description) {
      onAddTask({ title, description });
    }
    setIsModalOpen(false);
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
        <>
          <button className={styles.button} onClick={handleOpenModal}>
            Add new task
          </button>
          <ModalAdd
            open={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveTask}
          />
        </>
      )}
    </div>
  );
};

export default Column;
