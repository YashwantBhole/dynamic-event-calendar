import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";

const EventModal = ({ isOpen, onClose, selectedDate }) => {
  const { dispatch } = useEventContext();
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_EVENT",
      payload: {
        id: Date.now(),
        date: selectedDate,
        ...formData,
      },
    });

    setFormData({ name: "", startTime: "", endTime: "", description: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105"
      >
        <h3 className="text-lg font-bold mb-4 text-gray-800">Add Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 transition duration-300"
        />
        <input
          type="time"
          value={formData.startTime}
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
          required
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-500 transition duration-300"
        />
        <input
          type="time"
          value={formData.endTime}
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
          required
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 transition duration-300"
        />
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 transition duration-300"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 p-2 hover:text-gray-700 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventModal;
