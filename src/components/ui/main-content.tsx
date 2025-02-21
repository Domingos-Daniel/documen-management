import React, { useState } from 'react';
import {
  Search,
  Upload,
  Filter,
  Grid,
  List,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Film,
  File,
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const getDocumentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
    case 'doc':
    case 'docx':
      return <FileText className="h-8 w-8 text-blue-600" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageIcon className="h-8 w-8 text-green-600" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FileSpreadsheet className="h-8 w-8 text-emerald-600" />;
    case 'mp4':
    case 'mov':
    case 'avi':
      return <Film className="h-8 w-8 text-purple-600" />;
    default:
      return <File className="h-8 w-8 text-gray-600" />;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export function MainContent() {
  const { documents, selectedFolderId, searchQuery, filters } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDocuments = documents
    .filter((doc) => {
      if (selectedFolderId && doc.folderId !== selectedFolderId) return false;
      if (
        searchQuery &&
        !doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (filters.type.length > 0 && !filters.type.includes(doc.type))
        return false;
      if (filters.status.length > 0 && !filters.status.includes(doc.status))
        return false;
      if (filters.dateRange.start && new Date(doc.createdAt) < filters.dateRange.start)
        return false;
      if (filters.dateRange.end && new Date(doc.createdAt) > filters.dateRange.end)
        return false;
      return true;
    })
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 bg-white">
              <Filter className="h-4 w-4" />
            </button>
            <div className="flex items-center border rounded-lg bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'text-blue-600 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'text-blue-600 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                  {getDocumentIcon(document.type)}
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{document.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(document.size)}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Updated {document.updatedAt.toLocaleDateString()}
                </p>
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
              <div
                key={document.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 items-center"
              >
                <div className="col-span-6 flex items-center space-x-3">
                  {getDocumentIcon(document.type)}
                  <span className="truncate">{document.name}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-500">
                  {formatFileSize(document.size)}
                </div>
                <div className="col-span-3 text-sm text-gray-500">
                  {document.updatedAt.toLocaleDateString()}
                </div>
                <div className="col-span-1 text-right">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}