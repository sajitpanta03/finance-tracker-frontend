import UserSidebarComponent from '../components/UserSidebarComponent.jsx'

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen">
      <UserSidebarComponent />

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">Hello, User!</h1>
        <p className="mt-4 text-gray-600">Welcome to your dashboard.</p>
      </div>
    </div>
  )
}
