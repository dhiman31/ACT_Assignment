import { useNavigate } from "react-router-dom";

const leads = [
  { id: 1, name: "Priya Sharma", company: "TechNova", status: "New" },
  { id: 2, name: "Rahul Gupta", company: "Infosys Ltd.", status: "Contacted" },
  { id: 3, name: "Sneha Mehta", company: "StartupX", status: "Qualified" },
  { id: 4, name: "Arjun Verma", company: "BuildCo", status: "Closed" },
];

const tasks = [
  { id: 1, title: "Follow up with Priya", due: "Today", done: false },
  { id: 2, title: "Send proposal to Rahul", due: "Tomorrow", done: false },
  { id: 3, title: "Schedule demo for StartupX", due: "Mar 28", done: true },
  { id: 4, title: "Review Q1 leads report", due: "Mar 30", done: false },
];

const users = [
  { id: 1, name: "Amit Joshi", role: "Admin", email: "amit@example.com" },
  { id: 2, name: "Divya Singh", role: "Client", email: "divya@example.com" },
  { id: 3, name: "Rohan Patel", role: "Client", email: "rohan@example.com" },
];

const statusColors = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Try to get user info from localStorage
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;
  const displayName = user?.firstName || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <span className="text-base font-semibold text-gray-800">Dashboard</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Hello, <span className="text-gray-800 font-medium">{displayName}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Leads", value: leads.length },
            { label: "Open Tasks", value: tasks.filter((t) => !t.done).length },
            { label: "Team Members", value: users.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded p-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Leads */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Leads
          </h2>
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Name", "Company", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-800 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-500">{lead.company}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tasks */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Tasks
          </h2>
          <div className="bg-white border border-gray-200 rounded divide-y divide-gray-100">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${task.done ? "bg-gray-300" : "bg-green-400"}`}
                  />
                  <span
                    className={`text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}
                  >
                    {task.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{task.due}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Users */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Users
          </h2>
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Name", "Email", "Role"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-800 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          u.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}