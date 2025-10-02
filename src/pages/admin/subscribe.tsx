import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface Subscriber {
    _id: string;
    email: string;
    createdAt: string;
}

export default function SubscribePage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch subscribers
    const fetchSubscribers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:7000/api/subscribe");
            if (!res.ok) throw new Error("Failed to fetch subscribers");
            const data = await res.json();
            setSubscribers(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch subscribers.");
        }
        setLoading(false);
    };

    // Delete subscriber
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subscriber?")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`http://localhost:7000/api/subscribe/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
                setSuccessMsg("Subscriber deleted successfully!");
                setTimeout(() => setSuccessMsg(""), 3000);
            } else {
                alert("Failed to delete subscriber");
            }
        } catch (err) {
            alert("Error connecting to server");
            console.error(err);
        }
        setDeletingId(null);
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Subscribers</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {successMsg && <p className="text-green-500">{successMsg}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-yellow-400">Email</th>
                                <th className="px-4 py-2 text-left text-yellow-400">Subscribed At</th>
                                <th className="px-4 py-2 text-center text-yellow-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((sub) => (
                                <tr key={sub._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{sub.email}</td>
                                    <td className="px-4 py-2">
                                        {new Date(sub.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(sub._id)}
                                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                            disabled={deletingId === sub._id}
                                            title="Delete Subscriber"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        No subscribers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
