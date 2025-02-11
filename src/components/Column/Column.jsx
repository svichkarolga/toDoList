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
    if (!updatedTask._id) {
      console.error("Помилка: відсутній `id`");
      return;
    }
    onEditTask({
      id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      columnName: updatedTask.columnName,
    });
    handleCloseEditModal();
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData("application/json");
    console.log(taskData);
    if (!taskData) return;
    const task = JSON.parse(taskData);
    onDropTask(task, name);
  };

  return (
    <div className={styles.box} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2 className={styles.nameOfColumns}>{name}</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          className={styles.itemBox}
          draggable
          onDragStart={(e) => onDragStart(e, task)}
        >
          <h4 className={styles.title}>Title: {task.title}</h4>
          <p className={styles.description}>Description: {task.description}</p>
          <p className={styles.text}>Task ID: {task._id}</p>

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
