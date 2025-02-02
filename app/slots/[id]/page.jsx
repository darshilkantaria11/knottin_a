// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import moment from "moment";

// export default function UpdateSlotPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [slot, setSlot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showCancelConfirm, setShowCancelConfirm] = useState(false);
//   //   const [updating, setUpdating] = useState(false);
//   //   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     async function fetchSlot() {
//       try {
//         const response = await fetch(`/api/slots/fetch/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch slot data.");
//         const data = await response.json();
//         setSlot(data);
//       } catch (error) {
//         console.error("Error fetching slot:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSlot();
//   }, [id]);

//   const handleToggle = (time) => {
//     setSlot((prevSlot) => ({
//       ...prevSlot,
//       slots: {
//         ...prevSlot.slots,
//         [time]: !prevSlot.slots[time], // Toggle slot availability
//       },
//     }));
//   };

//   const handleUpdate = async () => {
//     setUpdating(true);
//     try {
//       const response = await fetch(`/api/slots/update/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ date: slot.date, slots: slot.slots }),
//       });

//       if (response.ok) {
//         setShowSuccess(true);
//         setTimeout(() => {
//           router.push("/slots");
//         }, 2000);
//       } else {
//         alert("Failed to update slot.");
//       }
//     } catch (error) {
//       console.error("Update failed:", error);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this slot?")) return;

//     setDeleting(true);
//     try {
//       const response = await fetch(`/api/deleteslot/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Slot deleted successfully!");
//         router.push("/slots");
//       } else {
//         alert("Failed to delete slot.");
//       }
//     } catch (error) {
//       console.error("Delete failed:", error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-g3 p-8 flex flex-col items-center">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         {loading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="w-16 h-16 border-4 border-t-g2 border-gray-300 border-solid rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <>
//             <h1 className="text-3xl font-bold text-g4 mb-4 text-center">
//               Update Slots for {moment(slot.date).format("MMMM Do, YYYY")}
//             </h1>

//             {/* Slot Checkboxes */}
//             <div className="grid grid-cols-2 gap-4">
//               {Object.entries(slot.slots).map(([time, isAvailable]) => (
//                 <label
//                   key={time}
//                   className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer transition hover:bg-gray-200"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={isAvailable}
//                     onChange={() => handleToggle(time)}
//                     className="mr-3 w-5 h-5"
//                   />
//                   <span className="text-lg text-gray-800">{time}</span>
//                 </label>
//               ))}
//             </div>

//             <div className="flex mt-6 justify-between">
//               <button
//                 type="submit"
//                 className="w-full bg-g2 text-white py-3 rounded-lg shadow-md hover:bg-g4 transition-transform transform hover:scale-105"
//               >
//                 Update Position
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowConfirm(true)}
//                 className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
//               >
//                 Delete Position
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCancelConfirm(true)}
//                 className="w-full bg-gray-400 text-white py-3 rounded-lg shadow-md hover:bg-gray-500 transition-transform transform hover:scale-105"
//               >
//                 Cancel
//               </button>
//             </div>

//             {showConfirm && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
//                   <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
//                   <p className="mb-6 text-gray-600">
//                     Are you sure you want to delete this position? This action
//                     cannot be undone.
//                   </p>
//                   <div className="flex justify-center gap-4">
//                     <button
//                       onClick={handleDelete}
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => setShowConfirm(false)}
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Success Popup */}
//             {showSuccess && (
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col space-y-4 relative animate-slide-in-down">
//                   <div className="ticket-animate w-12 h-12 bg-[#62D47A] rounded-full flex items-center justify-center text-white text-xl font-bold animate-pop-in">
//                     ✔
//                   </div>
//                   <h3 className="text-xl font-semibold text-g4 text-center">
//                     Position has been updated successfully!
//                   </h3>
//                 </div>
//               </div>
//             )}

//             {showCancelConfirm && (
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//                   <h3 className="text-xl font-semibold text-g4">
//                     Are you sure you want to cancel and go back?
//                   </h3>
//                   <div className="flex justify-center gap-4 mt-4">
//                     <button
//                       onClick={() => router.push("/positions")}
//                       className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
//                     >
//                       Yes, Cancel
//                     </button>
//                     <button
//                       onClick={() => setShowCancelConfirm(false)}
//                       className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500"
//                     >
//                       No, Stay
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import moment from "moment";

export default function UpdateSlotPage() {
  const router = useRouter();
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    async function fetchSlot() {
      try {
        const response = await fetch(`/api/slots/fetch/${id}`);
        if (!response.ok) throw new Error("Failed to fetch slot data.");
        const data = await response.json();
        setSlot(data);
      } catch (error) {
        console.error("Error fetching slot:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSlot();
  }, [id]);

  const handleToggle = (time) => {
    setSlot((prevSlot) => ({
      ...prevSlot,
      slots: {
        ...prevSlot.slots,
        [time]: !prevSlot.slots[time],
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/slots/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: slot.date, slots: slot.slots }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/slots");
        }, 2000);
      } else {
        alert("Failed to update slot.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deleteslot/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/slots");
      } else {
        alert("Failed to delete slot.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-g3 p-8 flex flex-col items-center">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-16 h-16 border-4 border-t-g2 border-gray-300 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-g4 mb-6 text-center">
              Update Slots for {moment(slot.date).format("MMMM Do, YYYY")}
            </h1>

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(slot.slots).map(([time, isAvailable]) => (
                <label
                  key={time}
                  className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer transition hover:bg-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={() => handleToggle(time)}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg text-gray-800 font-medium">
                    {time}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex mt-8 justify-between gap-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="w-full bg-g2 text-white py-3 rounded-lg shadow-md hover:bg-g4 transition-transform transform hover:scale-105"
              >
                Update Slot
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Delete Slot
              </button>
              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="w-full bg-gray-400 text-white py-3 rounded-lg shadow-md hover:bg-gray-500 transition-transform transform hover:scale-105"
              >
                Cancel
              </button>
            </div>

            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                  <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                  <p className="mb-6 text-gray-600">
                    Are you sure you want to delete all slots for this date?
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col space-y-6 relative animate-slide-in-down w-96">
                  <div className="w-16 h-16 bg-[#62D47A] rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pop-in">
                    ✔
                  </div>
                  <h3 className="text-2xl font-semibold text-g4 text-center">
                    Slots updated successfully!
                  </h3>
                </div>
              </div>
            )}

            {showCancelConfirm && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
                  <h3 className="text-2xl font-semibold text-g4">
                    Are you sure you want to cancel and go back?
                  </h3>
                  <div className="flex justify-center gap-6 mt-6">
                    <button
                      onClick={() => router.push("/slots")}
                      className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600"
                    >
                      Yes, Cancel
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="bg-gray-400 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-500"
                    >
                      No, Stay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
