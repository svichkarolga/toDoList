import React, { useState } from "react";
import { nanoid } from "nanoid";
import Column from "../Column/Column.jsx";
import styles from "./Board.module.css";

const Board = ({ searchQuery }) => {
  const [columns, setColumns] = useState([
    {
      name: "ToDo",
      tasks: [],
    },
    {
      name: "In Progress",
      tasks: [],
    },
    {
      name: "Done",
      tasks: [],
    },
  ]);

  const addTaskToColumn = (columnName, task) => {
    const newTask = { ...task, id: nanoid(), columnName };
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.name === columnName
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  const handleDropTask = (task, targetColumnName) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.name === targetColumnName) {
          return {
            ...column,
            tasks: [...column.tasks, { ...task, columnName: targetColumnName }],
          };
        }
        if (column.name === task.columnName) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== task.id),
          };
        }
        return column;
      })
    );
  };

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData(
      "task",
      JSON.stringify({ ...task, columnName: task.columnName }) // Додаємо columnName
    );
  };

  const filteredColumns = columns.map((column) => {
    const filteredTasks = column.tasks.filter((task) =>
      searchQuery.trim() === ""
        ? true
        : task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { ...column, tasks: filteredTasks };
  });

  return (
    <div className={styles.box}>
      {filteredColumns.map((column) => (
        <Column
          key={column.name}
          name={column.name}
          tasks={column.tasks}
          onAddTask={(task) => addTaskToColumn(column.name, task)}
          onDropTask={handleDropTask}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default Board;
