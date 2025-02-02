"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PositionDetailPage() {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosition() {
      try {
        const response = await fetch(`/api/positions/fetch/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch position");
        }
        const data = await response.json();
        setPosition(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPosition();
  }, [id]);

  // Update position handler
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/positions/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(position),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/positions");
        }, 2000);
      } else {
        setError("Failed to update position");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete position handler
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/positions/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/positions");
      } else {
        setError("Failed to delete position");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  if (!position)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-g2 border-gray-300 border-solid rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-g3 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-g4 mb-6 text-center">
          Position Details
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
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
              value={position.positionName}
              onChange={(e) =>
                setPosition({ ...position, positionName: e.target.value })
              }
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
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
              value={position.shortDescription}
              onChange={(e) =>
                setPosition({ ...position, shortDescription: e.target.value })
              }
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2"
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
              rows="5"
              value={position.longDescription}
              onChange={(e) =>
                setPosition({ ...position, longDescription: e.target.value })
              }
              className="w-full px-4 py-3 border border-g2 rounded-lg focus:outline-none focus:ring-2 focus:ring-g2 resize-none"
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
              value={position.positionType}
              onChange={(e) =>
                setPosition({ ...position, positionType: e.target.value })
              }
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
              Update Position
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              Delete Position
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-400 text-white py-3 rounded-lg shadow-md hover:bg-gray-500 transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this position? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col space-y-4 relative animate-slide-in-down">
            <div className="ticket-animate w-12 h-12 bg-[#62D47A] rounded-full flex items-center justify-center text-white text-xl font-bold animate-pop-in">
              ✔
            </div>
            <h3 className="text-xl font-semibold text-g4 text-center">
              Position has been updated successfully!
            </h3>
          </div>
        </div>
      )}

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-g4">
              Are you sure you want to cancel and go back?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => router.push("/positions")}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
