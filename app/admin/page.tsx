import { Button } from "@/components/ui/button"

const stats = [
  { title: "Total Users", value: "12,847", change: "+12.5%", trend: "up" },
  { title: "Active Professionals", value: "2,543", change: "+8.2%", trend: "up" },
  { title: "Projects Posted", value: "8,921", change: "+15.3%", trend: "up" },
  { title: "Revenue", value: "$284,590", change: "+23.1%", trend: "up" }
]

const recentApplications = [
  {
    id: 1,
    name: "Alexandra Thompson",
    profession: "UX Designer",
    location: "Seattle, WA",
    status: "pending",
    appliedDate: "2024-01-15",
    experience: "8 years"
  },
  {
    id: 2,
    name: "David Rodriguez",
    profession: "Software Engineer",
    location: "Miami, FL",
    status: "pending",
    appliedDate: "2024-01-14",
    experience: "6 years"
  },
  {
    id: 3,
    name: "Sarah Kim",
    profession: "Marketing Consultant",
    location: "Chicago, IL",
    status: "approved",
    appliedDate: "2024-01-12",
    experience: "10 years"
  }
]

const recentProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechStart Inc.",
    budget: "$15,000",
    status: "active",
    postedDate: "2024-01-10",
    proposals: 12
  },
  {
    id: 2,
    title: "Brand Identity Design",
    client: "Green Earth Co.",
    budget: "$5,000",
    status: "completed",
    postedDate: "2024-01-08",
    proposals: 8
  },
  {
    id: 3,
    title: "Marketing Campaign Strategy",
    client: "FitLife Gym",
    budget: "$8,500",
    status: "active",
    postedDate: "2024-01-05",
    proposals: 15
  }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              G.O.A.T.
            </div>
            <div className="text-lg font-bold text-gray-900">Admin Dashboard</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Settings</Button>
            <Button variant="ghost">Logout</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium">
                  <span>📊</span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>👥</span>
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>🏆</span>
                  <span>Professionals</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>📋</span>
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>💰</span>
                  <span>Payments</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>📝</span>
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span>⚙️</span>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening on your platform.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.profession} • {application.location}</p>
                        <p className="text-xs text-gray-500">{application.experience} experience</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          application.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {application.status}
                        </span>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.title}</h4>
                        <p className="text-sm text-gray-600">{project.client} • {project.budget}</p>
                        <p className="text-xs text-gray-500">{project.proposals} proposals</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {project.status}
                        </span>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}