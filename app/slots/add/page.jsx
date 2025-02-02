"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSlot() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState({}); // Stores time slots as key-value pairs
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSlotChange = (time, available) => {
    setSlots((prevSlots) => ({
      ...prevSlots,
      [time]: available,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || Object.keys(slots).length === 0) {
      setError("Please select a date and at least one slot.");
      return;
    }

    const newSlot = { date, slots };

    console.log(newSlot);

    try {
      const response = await fetch("/api/slots/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSlot),
      });

      if (!response.ok) {
        throw new Error("Failed to add slot");
      }

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/slots");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
    router.push("/slots");
  };

  const handleDismissCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-g3 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-g4 mb-6 text-center">
          Add New Slot
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-base font-medium text-g4 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-g4 mb-2">
              Select Slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm"].map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={slots[time] || false}
                    onChange={(e) => handleSlotChange(time, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-g2"
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-g2 text-white py-3 rounded-lg shadow-md hover:bg-g4 transition-transform transform hover:scale-105"
            >
              Add Slot
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-g4 mb-4 text-center">
              Are you sure you want to cancel?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Yes, Cancel
              </button>
              <button
                onClick={handleDismissCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col space-y-4 relative">
            <div className="w-12 h-12 bg-[#62D47A] rounded-full animate-slide-in-down mb-4 flex items-center justify-center text-white text-xl font-bold">
              ✔
            </div>
            <h3 className="text-xl font-semibold text-g4 text-center">
              Slot has been added successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
