"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PositionsPage() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await fetch("/api/positions");
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPositions();
  }, []);

  return (
    <div className="min-h-screen bg-g3 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-g4 tracking-wide">
            Positions
          </h1>
          <button
            onClick={() => router.push("/positions/add")}
            className="bg-g2 text-white px-6 py-3 rounded-lg shadow-xl hover:bg-g4 transition duration-300 transform hover:scale-105"
          >
            Add Position
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-16 h-16 border-4 border-t-g2 border-gray-300 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position) => (
              <Link href={`/positions/${position._id}`} key={position._id}>
                <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer h-60 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-g4 mb-2">
                      {position.positionName}
                    </h2>
                    <p className="text-sm text-g4">
                      {position.shortDescription.length > 100
                        ? position.shortDescription.substring(0, 100) + "..."
                        : position.shortDescription}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-g4">View Details</span>
                    <span className="text-sm text-g2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
