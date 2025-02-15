import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import Pagination from "./Pagination";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchTasks = (page = 1) => {
    fetch(`http://127.0.0.1:8000/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.results);
        setCurrentPage(page);
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/deletetasks/${id}/delete/`, {
        method: "DELETE",
      });
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/updatetasks/${id}/update/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...taskToUpdate, completed: true }),
        }
      );
      if (response.ok) {
        fetchTasks(currentPage);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          Task Manager 🚀
        </h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddTaskForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
          >
            + Add Task
          </button>
        </div>

        {showAddTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <AddTaskForm
                onClose={() => {
                  setShowAddTaskForm(false);
                  fetchTasks(currentPage);
                }}
              />
            </div>
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          fetchTasks={fetchTasks}
        />
      </div>
    </div>
  );
};

export default TaskManager;
