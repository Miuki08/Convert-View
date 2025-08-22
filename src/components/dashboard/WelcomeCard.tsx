export default function WelcomeCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Hi, Welcome Back <span className="text-blue-600">Nick!</span>
          </h3>
          <p className="text-gray-600 mb-4">
            You have used the 85% of free plan storage. Please upgrade your plan to get unlimited storage.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade Now
          </button>
        </div>
        <div className="relative">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}