import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TaskForm = ({ fetchTasks, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await axios.post("http://127.0.0.1:8000/createtask/", {
        title,
        description,
        deadline,
        completed: false,
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setDeadline("");

      // Close the form after successful submission
      onClose(); // Close the popup immediately
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white shadow-2xl rounded-xl p-6 w-96 border border-gray-200 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition duration-200"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Add New Task
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading} // Disable button while submitting
              className={`px-4 py-2 ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold rounded-lg transition-transform transform`}
            >
              {loading ? "Adding..." : "Add Task"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TaskForm;
