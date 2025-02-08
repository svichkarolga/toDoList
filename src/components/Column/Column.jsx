// import React, { useState } from "react";
// import styles from "./Column.module.css";
// import ModalAdd from "../Modal/ModalAddTask.jsx";

// const Column = ({ name, tasks, onAddTask, onDropTask, onDragStart }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [newTask, setNewTask] = useState({ title: "", description: "" });

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   const handleSaveTask = (title, description) => {
//     if (title && description) {
//       onAddTask({ title, description });
//     }
//     setIsModalOpen(false);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const taskData = event.dataTransfer.getData("task");
//     if (!taskData) return;
//     const task = JSON.parse(taskData);
//     onDropTask(task, name);
//   };

//   return (
//     <div className={styles.box} onDragOver={handleDragOver} onDrop={handleDrop}>
//       <h2 className={styles.nameOfColumns}>{name}</h2>
//       {tasks.map((task) => (
//         <div
//           className={styles.itemBox}
//           key={task.id}
//           draggable
//           onDragStart={(e) => onDragStart(e, task)}
//         >
//           <h4 className={styles.title}>Title: {task.title}</h4>
//           <p className={styles.description}>Description: {task.description}</p>
//           <p className={styles.description}>Id: {task.id}</p>
//         </div>
//       ))}
//       {name === "ToDo" && (
//         <>
//           <button className={styles.button} onClick={handleOpenModal}>
//             Add new task
//           </button>
//           <ModalAdd
//             open={isModalOpen}
//             onClose={handleCloseModal}
//             onSave={handleSaveTask}
//           />
//         </>
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
  onDropTask,
  onDragStart,
  onEditTask,
  onDeleteTask,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Відкрити модалку додавання
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // Відкрити модалку редагування
  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  // Відкрити модалку видалення
  const handleOpenDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (title, description) => {
    if (title.trim() && description.trim()) {
      onAddTask({ title, description });
    }
    setIsAddModalOpen(false);
  };

  const handleSaveEditedTask = (updatedTask) => {
    if (onEditTask) {
      onEditTask(updatedTask);
      handleCloseEditModal();
    } else {
      console.error("onEditTask is not defined");
    }
  };

  const handleDragOver = (event) => event.preventDefault();
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

      {/* Модалка редагування */}
      {selectedTask && (
        <ModalEdit
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onSave={handleSaveEditedTask}
        />
      )}

      {/* Модалка видалення */}
      {selectedTask && (
        <ModalDelete
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          task={selectedTask}
          onDelete={() => {
            onDeleteTask(selectedTask.id);
            handleCloseDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default Column;
