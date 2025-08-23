import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatsCard from '../components/dashboard/StatsCard';
import BrowserStats from '../components/dashboard/BrowserStats';
import ProjectBudgetChart from '../components/dashboard/ProjectBudgetChart';
import RecentCustomers from '../components/dashboard/RecentCustomers';
import TasksList from '../components/dashboard/TasksList';
import Footer from '../components/layout/Footer';
import { ShoppingBag, DollarSign, ExternalLink, CreditCard } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Today Orders',
      value: '5,472',
      icon: ShoppingBag,
      trend: { value: '+427', isPositive: true },
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Today Earnings',
      value: '$7,589',
      icon: DollarSign,
      trend: { value: '-453', isPositive: false },
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Profit Gain',
      value: '$8,943',
      icon: ExternalLink,
      trend: { value: '+788', isPositive: true },
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Earnings',
      value: '$57.2M',
      icon: CreditCard,
      trend: { value: '-693', isPositive: false },
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  return (

    <>
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">DASHBOARD</h1>
        </div>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Dashboard</a>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-600 text-sm" aria-current="page">Sales</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Welcome Card */}
      <div className="mb-6">
        <WelcomeCard />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Browser Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browser Usage</h3>
          <BrowserStats />
        </div>

        {/* Project Budget Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Budget</h3>
          <ProjectBudgetChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Customers */}
        <RecentCustomers />
        
        {/* Tasks List */}
        <TasksList />

      </div>
        {/* Footer */}
        <Footer />
    </>
  );
}