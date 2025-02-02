"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPosition() {
  const [positionName, setPositionName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [positionType, setPositionType] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State for cancel confirmation popup
  const [showSuccess, setShowSuccess] = useState(false); // State for success message popup
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !positionName ||
      !shortDescription ||
      !longDescription ||
      !positionType
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const newPosition = {
      positionName,
      shortDescription,
      longDescription,
      positionType,
    };

    try {
      const response = await fetch("/api/positions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosition),
      });

      if (!response.ok) {
        throw new Error("Failed to add position");
      }

      // Show success popup and redirect after a delay
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/positions");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
    router.push("/positions");
  };

  const handleDismissCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-g3 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-g4 mb-6 text-center">
          Add New Position
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label
              className="block text-base font-medium text-g4 mb-2"
              htmlFor="positionName"
            >
              Position Name
            </label>
            <input
              type="text"
              id="positionName"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
              placeholder="Enter position name"
              required
            />
          </div>

          <div>
            <label
              className="block text-base font-medium text-g4 mb-2"
              htmlFor="shortDescription"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
              placeholder="Enter short description"
              required
            />
          </div>

          <div>
            <label
              className="block text-base font-medium text-g4 mb-2"
              htmlFor="longDescription"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
              placeholder="Enter detailed description"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label
              className="block text-base font-medium text-g4 mb-2"
              htmlFor="positionType"
            >
              Position Type
            </label>
            <select
              id="positionType"
              value={positionType}
              onChange={(e) => setPositionType(e.target.value)}
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
              required
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-g2 text-white py-3 rounded-lg shadow-md hover:bg-g4 transition-transform transform hover:scale-105"
            >
              Add Position
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

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-g4 mb-4 text-center">
              Are you sure you don&apos;t want to add the position?
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

      {/* Success Popup with Animated Ticket */}
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col space-y-4 relative">
            <div className="ticket-animate w-12 h-12 bg-[#62D47A] rounded-full animate-slide-in-down mb-4">
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                ✔
              </div>
            </div>
            <h3 className="text-xl font-semibold text-g4 text-center">
              Position has been added successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
