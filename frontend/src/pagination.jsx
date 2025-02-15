import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, prevPage, nextPage, fetchTasks }) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-gray-200">
        {/* Previous Button */}
        <button
          disabled={!prevPage}
          onClick={() => fetchTasks(currentPage - 1)}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
            prevPage
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </button>

        {/* Current Page */}
        <span className="px-6 py-2 text-lg font-semibold bg-gray-100 text-gray-800 rounded-lg shadow">
          Page {currentPage}
        </span>

        {/* Next Button */}
        <button
          disabled={!nextPage}
          onClick={() => fetchTasks(currentPage + 1)}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
            nextPage
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
