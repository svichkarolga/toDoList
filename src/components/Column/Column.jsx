// // import React, { useState } from "react";
// // import styles from "./Column.module.css";
// // import ModalAdd from "../Modal/ModalAddTask.jsx";
// // import ModalEdit from "../Modal/ModalEdit.jsx";
// // import ModalDelete from "../Modal/ModalDelete.jsx";

// // const Column = ({
// //   name,
// //   tasks,
// //   onAddTask,
// //   onDropTask,
// //   onDragStart,
// //   onEditTask,
// //   onDeleteTask,
// // }) => {
// //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [selectedTask, setSelectedTask] = useState(null);

// //   // Відкрити модалку додавання
// //   const handleOpenAddModal = () => setIsAddModalOpen(true);
// //   const handleCloseAddModal = () => setIsAddModalOpen(false);

// //   // Відкрити модалку редагування
// //   const handleOpenEditModal = (task) => {
// //     setSelectedTask(task);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleCloseEditModal = () => {
// //     setIsEditModalOpen(false);
// //     setSelectedTask(null);
// //   };

// //   // Відкрити модалку видалення
// //   const handleOpenDeleteModal = (task) => {
// //     setSelectedTask(task);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const handleCloseDeleteModal = () => {
// //     setIsDeleteModalOpen(false);
// //     setSelectedTask(null);
// //   };

// //   const handleSaveTask = (title, description) => {
// //     if (title.trim() && description.trim()) {
// //       onAddTask({ title, description });
// //     }
// //     setIsAddModalOpen(false);
// //   };

// //   const handleSaveEditedTask = (updatedTask) => {
// //     if (onEditTask) {
// //       onEditTask(updatedTask);
// //       handleCloseEditModal();
// //     } else {
// //       console.error("onEditTask is not defined");
// //     }
// //   };

// //   const handleDragOver = (event) => event.preventDefault();
// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const taskData = event.dataTransfer.getData("task");
// //     if (!taskData) return;
// //     const task = JSON.parse(taskData);
// //     onDropTask(task, name);
// //   };

// //   return (
// //     <div className={styles.box} onDragOver={handleDragOver} onDrop={handleDrop}>
// //       <h2 className={styles.nameOfColumns}>{name}</h2>

// //       {tasks.map((task) => (
// //         <div
// //           className={styles.itemBox}
// //           key={task.id}
// //           draggable
// //           onDragStart={(e) => onDragStart(e, task)}
// //         >
// //           <h4 className={styles.title}>Title: {task.title}</h4>
// //           <p className={styles.description}>Description: {task.description}</p>
// //           <p className={styles.id}>Id: {task.id}</p>

// //           <button
// //             className={styles.editButton}
// //             onClick={() => handleOpenEditModal(task)}
// //           >
// //             Edit
// //           </button>
// //           <button
// //             className={styles.deleteButton}
// //             onClick={() => handleOpenDeleteModal(task)}
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       ))}

// //       {name === "ToDo" && (
// //         <>
// //           <button className={styles.button} onClick={handleOpenAddModal}>
// //             Add New Task
// //           </button>
// //           <ModalAdd
// //             open={isAddModalOpen}
// //             onClose={handleCloseAddModal}
// //             onSave={handleSaveTask}
// //           />
// //         </>
// //       )}

// //       {/* Модалка редагування */}
// //       {selectedTask && (
// //         <ModalEdit
// //           open={isEditModalOpen}
// //           onClose={handleCloseEditModal}
// //           task={selectedTask}
// //           onSave={handleSaveEditedTask}
// //         />
// //       )}

// //       {/* Модалка видалення */}
// //       {selectedTask && (
// //         <ModalDelete
// //           open={isDeleteModalOpen}
// //           onClose={handleCloseDeleteModal}
// //           task={selectedTask}
// //           onDelete={() => {
// //             onDeleteTask(selectedTask.id);
// //             handleCloseDeleteModal();
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Column;

// import React, { useState } from "react";
// import styles from "./Column.module.css";
// import ModalAdd from "../Modal/ModalAddTask.jsx";
// import ModalEdit from "../Modal/ModalEdit.jsx";
// import ModalDelete from "../Modal/ModalDelete.jsx";

// const Column = ({
//   name,
//   tasks,
//   onAddTask,
//   onEditTask,
//   onDeleteTask,
//   onDropTask,
//   onDragStart,
// }) => {
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   const handleOpenAddModal = () => setIsAddModalOpen(true);
//   const handleCloseAddModal = () => setIsAddModalOpen(false);

//   const handleOpenEditModal = (task) => {
//     setSelectedTask(task);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedTask(null);
//   };

//   const handleOpenDeleteModal = (task) => {
//     setSelectedTask(task);
//     setIsDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setSelectedTask(null);
//   };

//   const handleSaveTask = (task, description) => {
//     onAddTask({ task, description, columnName: name });
//     setIsAddModalOpen(false);
//   };

//   const handleSaveEditedTask = (updatedTask) => {
//     onEditTask(updatedTask);
//     handleCloseEditModal();
//   };

//   return (
//     <div
//       className={styles.box}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => onDropTask(e)}
//     >
//       <h2 className={styles.nameOfColumns}>{name}</h2>

//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className={styles.itemBox}
//           draggable
//           onDragStart={(e) => onDragStart(e, task)}
//         >
//           <h4 className={styles.title}>Title: {task.title}</h4>
//           <p className={styles.description}>Description: {task.description}</p>

//           <button
//             className={styles.editButton}
//             onClick={() => handleOpenEditModal(task)}
//           >
//             Edit
//           </button>
//           <button
//             className={styles.deleteButton}
//             onClick={() => handleOpenDeleteModal(task)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       {name === "ToDo" && (
//         <>
//           <button className={styles.button} onClick={handleOpenAddModal}>
//             Add New Task
//           </button>
//           <ModalAdd
//             open={isAddModalOpen}
//             onClose={handleCloseAddModal}
//             onSave={handleSaveTask}
//           />
//         </>
//       )}

//       {selectedTask && (
//         <ModalEdit
//           open={isEditModalOpen}
//           onClose={handleCloseEditModal}
//           task={selectedTask}
//           onSave={handleSaveEditedTask}
//         />
//       )}

//       {selectedTask && (
//         <ModalDelete
//           open={isDeleteModalOpen}
//           onClose={handleCloseDeleteModal}
//           task={selectedTask}
//           onDelete={() => {
//             onDeleteTask(selectedTask.id);
//             handleCloseDeleteModal();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Column;

import React, { useState } from "react";
import styles from "./Column.module.css";
import ModalAdd from "../Modal/ModalAddTask.jsx";
import ModalEdit from "../Modal/ModalEdit.jsx";
import ModalDelete from "../Modal/ModalDelete.jsx";

const Column = ({
  name,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
  onDragStart,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleOpenDeleteModal = (taskId) => {
    setSelectedTask(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (title, description) => {
    onAddTask({ title, description, columnName: name });
    setIsAddModalOpen(false);
  };

  const handleSaveEditedTask = (updatedTask) => {
    onEditTask(updatedTask);
    handleCloseEditModal();
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData("task");
    if (!taskData) return;
    const task = JSON.parse(taskData);
    onDropTask(task, name);
  };

  return (
    <div className={styles.box} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2 className={styles.nameOfColumns}>{name}</h2>

      {tasks.map((task) => (
        <div
          key={task._id} // Унікальний ключ для кожного завдання
          className={styles.itemBox}
          draggable
          onDragStart={(e) => onDragStart(e, task)}
        >
          <h4 className={styles.title}>Title: {task.title}</h4>
          <p className={styles.description}>Description: {task.description}</p>

          <button
            className={styles.editButton}
            onClick={() => handleOpenEditModal(task)}
          >
            Edit
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleOpenDeleteModal(task)}
          >
            Delete
          </button>
        </div>
      ))}

      {name === "ToDo" && (
        <>
          <button className={styles.button} onClick={handleOpenAddModal}>
            Add New Task
          </button>
          <ModalAdd
            open={isAddModalOpen}
            onClose={handleCloseAddModal}
            onSave={handleSaveTask}
          />
        </>
      )}

      {selectedTask && (
        <ModalEdit
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onSave={handleSaveEditedTask}
        />
      )}

      {selectedTask && (
        <ModalDelete
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          task={selectedTask}
          onDelete={() => {
            onDeleteTask(selectedTask._id);
            handleCloseDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default Column;
