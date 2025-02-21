import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function SearchFilters() {
  const { documents, searchQuery, filters, setSearchQuery, setFilters } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: filters[filterType].includes(value)
        ? filters[filterType].filter((v: string) => v !== value)
        : [...filters[filterType], value],
    });
  };

  const filteredDocuments = documents
    .filter((doc) => {
      if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.type.length > 0 && !filters.type.includes(doc.type)) return false;
      if (filters.status.length > 0 && !filters.status.includes(doc.status)) return false;
      if (filters.dateRange.start && new Date(doc.createdAt) < filters.dateRange.start) return false;
      if (filters.dateRange.end && new Date(doc.createdAt) > filters.dateRange.end) return false;
      return true;
    })
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <button className="p-2 border rounded-lg hover:bg-gray-50 bg-white">
          <Filter className="h-4 w-4" />
        </button>
        <div className="flex items-center border rounded-lg bg-white">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'text-blue-600 bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'text-blue-600 bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                {/* Add document icon here */}
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{document.name}</h3>
                  <p className="text-sm text-gray-500">{/* Add file size here */}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  {/* Add more options icon here */}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Updated {document.updatedAt.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-3">Last Modified</div>
            <div className="col-span-1"></div>
          </div>
          {filteredDocuments.map((document) => (
            <div key={document.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 items-center">
              <div className="col-span-6 flex items-center space-x-3">
                {/* Add document icon here */}
                <span className="truncate">{document.name}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">{/* Add file size here */}</div>
              <div className="col-span-3 text-sm text-gray-500">{document.updatedAt.toLocaleDateString()}</div>
              <div className="col-span-1 text-right">
                <button className="p-1 hover:bg-gray-100 rounded">
                  {/* Add more options icon here */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
