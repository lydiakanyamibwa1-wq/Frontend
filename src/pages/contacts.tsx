import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  email: string;
  message: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Musa", email: "musa@mail.com", message: "I need help with my order." },
    { id: "2", sender: "Alice", email: "alice@mail.com", message: "Can I get a discount?" },
    { id: "3", sender: "John", email: "john@mail.com", message: "My product is damaged." },
  ]);

  const handleReply = (email: string) => {
    alert(`Reply to: ${email}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-400 text-white">
              <th className="border px-4 py-2">Sender</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td className="border px-4 py-2">{msg.sender}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.message}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleReply(msg.email)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;