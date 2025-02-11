import React from "react";
import styles from "./SearchTask.module.css";

export const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === "") {
      alert("Please enter search term!");
      return;
    }
    onSubmit(topic);
    form.reset();
  };
  return (
    <div className={styles.box}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="topic"
          placeholder="Enter a task ID or title here"
        />
        <button className={styles.button}>Load</button>
      </form>
    </div>
  );
};
export default SearchForm;
