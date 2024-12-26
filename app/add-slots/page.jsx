'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSlotsPage() {
  const [form, setForm] = useState({
    date: '',
    slots: {
      '10am-11am': false,
      '11am-12pm': false,
      '12pm-1pm': false,
      '1pm-2pm': false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [slots, setSlots] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== 'admin-token') {
      router.push('/'); // Redirect to login if token doesn't match
    }
  }, [router]);

  // Fetch slots when the component mounts and when needed
  const fetchSlots = async () => {
    try {
      const response = await fetch('/api/slots');
      const data = await response.json();
      if (response.ok) {
        setSlots(data);
      } else {
        setError(data.message || 'Failed to fetch slots.');
      }
    } catch (err) {
      setError('Error fetching slots.');
    }
  };

  useEffect(() => {
    fetchSlots(); // Call fetch slots on mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setForm({
        ...form,
        slots: {
          ...form.slots,
          [name]: e.target.checked,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(isUpdating ? `/api/updateslot/${updateId}` : '/api/addslot', {
        method: isUpdating ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setForm({
          date: '',
          slots: {
            '10am-11am': false,
            '11am-12pm': false,
            '12pm-1pm': false,
            '1pm-2pm': false,
          },
        });
        setIsUpdating(false);
        setUpdateId(null);
        fetchSlots(); // Refetch slots after adding/updating
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setLoading(false);
      setError('Error submitting the form.');
    }
  };

  const handleUpdate = (slot) => {
    setForm({
      date: slot.date,
      slots: slot.slots,
    });
    setIsUpdating(true);
    setUpdateId(slot._id); // Store the ID for updating
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this slot?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/deleteslot/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchSlots(); // Refresh slots after deletion
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete slot.');
        }
      } catch (err) {
        setError('Error deleting slot.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-g3 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full container mx-auto">
        <h1 className="text-3xl font-bold text-g4 mb-6">Manage Slots</h1>

        {/* Form for Adding/Updating Slots */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Slots</label>
            <div className="flex flex-col">
              {Object.keys(form.slots).map((slot, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={slot}
                    checked={form.slots[slot]}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-g2 text-white py-2 px-4 rounded-md shadow-lg hover:bg-g4 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Saving...' : isUpdating ? 'Update Slots' : 'Add Slots'}
          </button>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>

        {/* Displaying Slots */}
        <h2 className="text-2xl font-bold text-g4 mt-6">Current Slots</h2>
        {slots.length === 0 ? (
          <p className="text-gray-500">No slots added.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {slots.map((slot) => (
              <div key={slot._id} className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">{slot.date}</h3>
                <div className="mt-4">
                  {Object.keys(slot.slots).map((slotTime, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">{slotTime}</span>
                      <input
                        type="checkbox"
                        disabled
                        checked={slot.slots[slotTime]}
                        className="mr-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdate(slot)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
