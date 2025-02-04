"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";

export default function SlotsPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await fetch("/api/slots");
        const data = await response.json();
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, []);

  return (
    <div className="min-h-screen bg-g3 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-g4 tracking-wide">
            Available Slots
          </h1>
          <button
            onClick={() => router.push("/slots/add")}
            className="bg-g2 text-white px-6 py-3 rounded-lg shadow-xl hover:bg-g4 transition duration-300 transform hover:scale-105"
          >
            Add Slot
          </button>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-16 h-16 border-4 border-t-g2 border-gray-300 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {slots.map((slot) => (
              <Link
                href={`/slots/${slot._id}`}
                key={slot._id}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
              >
                {/* Date Section */}
                <h2 className="text-2xl font-semibold text-g4 mb-2 text-center">
                  {moment(slot.date).format("MMMM Do, YYYY")}{" "}
                  {/* Example: January 30, 2025 */}
                </h2>
                {/* Time Slots */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {Object.entries(slot.slots).map(([time, isAvailable]) => {
                    const isBooked = slot.bookedSlots.includes(time);

                    return (
                      <div key={time} className="relative">
                        <button
                          className={`text-sm px-4 py-2 rounded-md border w-full ${isAvailable
                              ? "bg-g2 text-white"
                              : isBooked
                                ? "bg-g2 text-white cursor-not-allowed"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                          disabled={!isAvailable}
                        >
                          {time}
                        </button>
                        {isBooked && (
                          <p className="absolute top-4 right-0 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-red-600">
                            ✓
                          </p>
                        )}
                      </div>
                    );
                  })}

                </div>

                {/* <div className="flex justify-center mt-6">
                  <span className="text-sm text-g4 hover:underline">
                    View Details
                  </span>
                </div> */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
