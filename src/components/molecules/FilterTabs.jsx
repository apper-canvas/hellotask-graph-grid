import React from 'react';
import Button from '@/components/atoms/Button';

const FilterTabs = ({ tabs, currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-1">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(tab.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentFilter === tab.key
              ? 'bg-white text-primary shadow-sm border border-gray-200'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          {tab.label} ({tab.count})
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;