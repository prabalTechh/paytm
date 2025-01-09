import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/user/bulk?filter=${filter}`
        );
        setUsers(response.data.users || []); // Ensure the array is initialized
        setError(""); // Clear errors on successful fetch
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setUsers([]); // Clear users on error
      }
    };

    if (filter.trim()) {
      fetchUsers();
    } else {
      setUsers([]); // Clear users if the filter is empty
    }
  }, [filter]);

  return (
    <div className="p-4">
      <div className="font-bold text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id || Math.random()} // Fallback key
              className="flex justify-between items-center py-2 border-b border-slate-200"
            >
              <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center items-center mr-2 text-xl font-semibold">
                  {user?.firstName?.[0] || "?"} {/* Fallback to "?" */}
                </div>
                <div>
                  <div className="font-medium">
                    {user?.firstName || "Unknown"} {user?.lastName || ""}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{user?.username || "N/A"}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/send?id=${user?._id || ""}&name=${user?.firstName || ""}`
                  )
                }
                className="bg-gray-900 text-white px-3 py-1.5 rounded-lg"
                disabled={!user?._id} // Disable button if ID is missing
              >
                Send Money
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Users;
