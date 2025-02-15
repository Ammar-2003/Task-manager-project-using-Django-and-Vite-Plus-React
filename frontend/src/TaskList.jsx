import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ tasks, handleComplete, handleDelete }) => {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`p-4 border rounded-lg shadow-md flex justify-between items-center transition-all ${
              task.completed ? "bg-green-100 border-green-400" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3 flex-1">
              {task.completed && (
                <span className="text-green-500 text-xl">✅</span>
              )}
              <div>
                <span
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <p className="text-gray-700 text-sm">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Deadline: {task.deadline}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              {!task.completed && (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
