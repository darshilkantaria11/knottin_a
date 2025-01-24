'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPositionPage() {
  const [form, setForm] = useState({
    positionName: '',
    shortDescription: '',
    longDescription: '',
    positionType: 'Full-time',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [positions, setPositions] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== 'admin-token') {
      router.push('/');
    }
  }, [router]);

  const fetchPositions = async () => {
    try {
      const response = await fetch('/api/positions');
      const data = await response.json();
      if (response.ok) {
        setPositions(data);
      } else {
        setError(data.message || 'Failed to fetch positions.');
      }
    } catch (err) {
      setError('Error fetching positions.');
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(isUpdating ? `/api/updateposition/${updateId}` : '/api/addposition', {
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
          positionName: '',
          shortDescription: '',
          longDescription: '',
          positionType: 'Full-time',
        });
        setIsUpdating(false);
        setUpdateId(null);
        setShowForm(false); // Hide the form after successful submission
        fetchPositions();
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setLoading(false);
      setError('Error submitting the form.');
    }
  };

  const handleUpdate = (position) => {
    setForm({
      positionName: position.positionName,
      shortDescription: position.shortDescription,
      longDescription: position.longDescription,
      positionType: position.positionType,
    });
    setIsUpdating(true);
    setUpdateId(position._id);
    setShowForm(true); // Show the form when editing
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this position?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/deleteposition/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPositions();
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete position.');
        }
      } catch (err) {
        setError('Error deleting position.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-g3 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full container mx-auto">
        <h1 className="text-3xl font-bold text-g4 mb-6">Manage Positions</h1>

        <button
          onClick={() => {
            setShowForm(true); // Show the form
            setIsUpdating(false); // Reset to adding mode
            setForm({
              positionName: '',
              shortDescription: '',
              longDescription: '',
              positionType: 'Full-time',
            });
          }}
          className="bg-g2 text-white py-2 px-4 rounded-md shadow-lg hover:bg-g4 transition duration-300"
        >
          Add Position
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Position Name</label>
              <input
                type="text"
                name="positionName"
                value={form.positionName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Long Description</label>
              <textarea
                name="longDescription"
                value={form.longDescription}
                onChange={handleChange}
                rows="8"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Position Type</label>
              <select
                name="positionType"
                value={form.positionType}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-g2 text-white py-2 px-4 rounded-md shadow-lg hover:bg-g4 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : isUpdating ? 'Update Position' : 'Add Position'}
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="w-full mt-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>

            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </form>
        )}

        <h2 className="text-2xl font-bold text-g4 mt-6">Current Positions</h2>
        {positions.length === 0 ? (
          <p className="text-gray-500">No positions added.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {positions.map((position) => (
              <div key={position._id} className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg">{position.positionName}</h3>
                <p className="text-gray-600">{position.shortDescription}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdate(position)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(position._id)}
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
