// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { nanoid } from "nanoid";
// import Column from "../Column/Column.jsx";
// import styles from "./Board.module.css";

// const Board = ({ searchQuery }) => {
//   const [columns, setColumns] = useState([
//     {
//       name: "ToDo",
//       tasks: [],
//     },
//     {
//       name: "In Progress",
//       tasks: [],
//     },
//     {
//       name: "Done",
//       tasks: [],
//     },
//   ]);

//   const addTaskToColumn = (columnName, task) => {
//     const newTask = { ...task, id: nanoid(), columnName };
//     setColumns((prevColumns) =>
//       prevColumns.map((column) =>
//         column.name === columnName
//           ? { ...column, tasks: [...column.tasks, newTask] }
//           : column
//       )
//     );
//   };

//   const handleEditTask = (updatedTask) => {
//     setColumns((prevColumns) =>
//       prevColumns.map((column) => ({
//         ...column,
//         tasks: column.tasks.map((task) =>
//           task.id === updatedTask.id ? updatedTask : task
//         ),
//       }))
//     );
//   };

//   const handleDeleteTask = (taskId) => {
//     setColumns((prevColumns) =>
//       prevColumns.map((column) => ({
//         ...column,
//         tasks: column.tasks.filter((task) => task.id !== taskId),
//       }))
//     );
//   };

//   const handleDropTask = (task, targetColumnName) => {
//     setColumns((prevColumns) =>
//       prevColumns.map((column) => {
//         if (column.name === targetColumnName) {
//           return {
//             ...column,
//             tasks: [...column.tasks, { ...task, columnName: targetColumnName }],
//           };
//         }
//         if (column.name === task.columnName) {
//           return {
//             ...column,
//             tasks: column.tasks.filter((t) => t.id !== task.id),
//           };
//         }
//         return column;
//       })
//     );
//   };

//   const handleDragStart = (event, task) => {
//     event.dataTransfer.setData(
//       "task",
//       JSON.stringify({ ...task, columnName: task.columnName }) // Додаємо columnName
//     );
//   };

//   const filteredColumns = columns.map((column) => {
//     const filteredTasks = column.tasks.filter((task) =>
//       searchQuery.trim() === ""
//         ? true
//         : task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           task.id.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return { ...column, tasks: filteredTasks };
//   });

//   return (
//     <div className={styles.box}>
//       {filteredColumns.map((column) => (
//         <Column
//           key={column.name}
//           name={column.name}
//           tasks={column.tasks}
//           onAddTask={(task) => addTaskToColumn(column.name, task)}
//           onEditTask={handleEditTask}
//           onDeleteTask={handleDeleteTask}
//           onDropTask={handleDropTask}
//           onDragStart={handleDragStart}
//         />
//       ))}
//     </div>
//   );
// };

// export default Board;

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
    dispatch(addTask(newTask)); // ✅ Використовуємо Redux для додавання таску
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
