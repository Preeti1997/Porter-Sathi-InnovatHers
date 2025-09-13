import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 bg-white p-2 rounded shadow mb-4">
      {['business', 'guru', 'safety'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 rounded ${
            activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;