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
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTask()); // Завантажуємо таски при завантаженні сторінки
  }, [dispatch]);

  const addTaskToColumn = (columnName, task) => {
    const newTask = { ...task, columnName };
    dispatch(addTask(newTask));
  };

  const handleEditTask = (updatedTask) => {
    if (!updatedTask.id) {
      console.error("Помилка: відсутній `id` у таску для оновлення.");
      return;
    }
    dispatch(
      updateTask({
        taskId: updatedTask.id,
        updatedData: {
          title: updatedTask.title,
          description: updatedTask.description,
          columnName: updatedTask.columnName,
        },
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDropTask = (task, targetColumnName) => {
    console.log(`Переміщення таску ${task._id} у колонку ${targetColumnName}`);
    if (!task?._id) {
      console.error("Помилка: відсутній `_id` у таску при перетягуванні.");
      return;
    }
    const updatedData = { columnName: targetColumnName }; // 🔥 Передаємо тільки зміни
    dispatch(
      updateTask({
        taskId: task._id,
        updatedData: { columnName: targetColumnName },
      })
    );
  };

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("application/json", JSON.stringify(task)); // 🔥 Тип "application/json"
  };

  const filteredTasks = tasks.filter((task) =>
    searchQuery
      ? (task.title &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task._id && task._id === searchQuery)
      : true
  );
  const columns = [
    {
      name: "ToDo",
      tasks: filteredTasks.filter((task) => task.columnName === "ToDo"),
    },
    {
      name: "In Progress",
      tasks: filteredTasks.filter((task) => task.columnName === "In Progress"),
    },
    {
      name: "Done",
      tasks: filteredTasks.filter((task) => task.columnName === "Done"),
    },
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
