import WelcomeCard from '../components/dashboard/WelcomeCard';
import ClientStatsCard from '../components/dashboard/ClientStatsCard';
import BrowserStats from '../components/dashboard/BrowserStats';
import ProjectBudgetChart from '../components/dashboard/ProjectBudgetChart';
import RecentCustomers from '../components/dashboard/RecentCustomers';
import TasksList from '../components/dashboard/TasksList';
import WarehouseOperatingCosts from '../components/dashboard/WarehouseOperatingCosts';
import SalesActivity from '../components/dashboard/SalesActivity';
import Timeline from '../components/dashboard/Timeline';
import WeeklyVisitors from '../components/dashboard/WeaklyVisitors';
import ProductSummaryTable from '../components/dashboard/ProductSummaryTable';
import Footer from '../components/layout/Footer';

export default function Dashboard() {
  const stats = [
    {
      title: 'Today Orders',
      value: '5,472',
      iconName: 'ShoppingBag', // Ubah menjadi string nama icon
      trend: { value: '+427', isPositive: true }
    },
    {
      title: 'Today Earnings',
      value: '$7,589',
      iconName: 'DollarSign', // Ubah menjadi string nama icon
      trend: { value: '-453', isPositive: false }
    },
    {
      title: 'Profit Gain',
      value: '$8,943',
      iconName: 'ExternalLink', // Ubah menjadi string nama icon
      trend: { value: '+788', isPositive: true }
    },
    {
      title: 'Total Earnings',
      value: '$57.2M',
      iconName: 'CreditCard', // Ubah menjadi string nama icon
      trend: { value: '-693', isPositive: false }
    }
  ];

  return (
    <div className="p-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 animate-slide-down">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">DASHBOARD</h1>
        </div>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-sm">Dashboard</a>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-600 dark:text-gray-400 text-sm" aria-current="page">Sales</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Welcome Card */}
      <div className="mb-6 animate-slide-up">
        <WelcomeCard />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <ClientStatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Browser Stats */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Browser Usage</h3>
          <BrowserStats />
        </div>

        {/* Project Budget Chart */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Budget</h3>
          <ProjectBudgetChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Customers */}
        <div className="transition-all duration-300 hover:-translate-y-1">
          <RecentCustomers />
        </div>
        
        {/* Tasks List */}
        <div className="transition-all duration-300 hover:-translate-y-1">
          <TasksList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesActivity />
        <WarehouseOperatingCosts />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Timeline />
        <WeeklyVisitors />
      </div>
      
      <ProductSummaryTable />
      
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}