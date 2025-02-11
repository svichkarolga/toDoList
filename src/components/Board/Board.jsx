import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTask,
  addTask,
  updateTask,
  deleteTask,
} from "../../redux/tasks/operations";
import { selectTasks } from "../../redux/tasks/selectors";
import Column from "../Column/Column.jsx";
import styles from "./Board.module.css";

const Board = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks); // Отримуємо таски з Redux

  useEffect(() => {
    dispatch(fetchTask()); // Завантажуємо таски при завантаженні сторінки
  }, [dispatch]);

  const addTaskToColumn = (columnName, task) => {
    const newTask = { ...task, columnName };
    dispatch(addTask(newTask));
  };

  const handleEditTask = (updatedTask) => {
    dispatch(updateTask({ taskId: updatedTask.id, updatedData: updatedTask }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDropTask = (task, targetColumnName) => {
    const updatedTask = { ...task, columnName: targetColumnName };
    dispatch(updateTask({ taskId: task.id, updatedData: updatedTask }));
  };

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  // Фільтрація тасків за колонками
  const columns = [
    { name: "ToDo", tasks: tasks.filter((task) => task.columnName === "ToDo") },
    {
      name: "In Progress",
      tasks: tasks.filter((task) => task.columnName === "In Progress"),
    },
    { name: "Done", tasks: tasks.filter((task) => task.columnName === "Done") },
  ];

  return (
    <div className={styles.box}>
      {columns.map((column) => (
        <Column
          key={column.name}
          name={column.name}
          tasks={column.tasks}
          onAddTask={(task) => addTaskToColumn(column.name, task)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onDropTask={handleDropTask}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default Board;
