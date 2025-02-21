import React, { useState } from 'react';
import {
  ChevronDown,
  FolderIcon,
  Users,
  Settings,
  Bell,
  Plus,
  ChevronRight,
  Inbox,
  Star,
  Archive,
  Trash2,
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface FolderTreeProps {
  folders: Array<{ id: string; name: string; parentId: string | null }>;
  parentId: string | null;
  level: number;
}

function FolderTree({ folders, parentId, level }: FolderTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const { selectedFolderId, setSelectedFolder } = useStore();

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expanded);
    if (expanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpanded(newExpanded);
  };

  const foldersByParent = folders.filter((f) => f.parentId === parentId);

  if (foldersByParent.length === 0) return null;

  return (
    <div className="space-y-1">
      {foldersByParent.map((folder) => {
        const hasChildren = folders.some((f) => f.parentId === folder.id);
        const isExpanded = expanded.has(folder.id);

        return (
          <div key={folder.id}>
            <button
              onClick={() => {
                if (hasChildren) {
                  toggleFolder(folder.id);
                }
                setSelectedFolder(folder.id);
              }}
              className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg ${
                selectedFolderId === folder.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              style={{ paddingLeft: `${(level + 1) * 0.75}rem` }}
            >
              {hasChildren ? (
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              ) : (
                <div className="w-4" />
              )}
              <FolderIcon className="h-4 w-4" />
              <span className="text-sm truncate">{folder.name}</span>
            </button>
            {isExpanded && (
              <FolderTree
                folders={folders}
                parentId={folder.id}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const { folders, notifications } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">DocManager</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6">
          <Plus className="h-4 w-4" />
          <span>New Document</span>
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
              <Inbox className="h-4 w-4" />
              <span className="text-sm">Inbox</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
              <Star className="h-4 w-4" />
              <span className="text-sm">Starred</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
              <Archive className="h-4 w-4" />
              <span className="text-sm">Archived</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Trash</span>
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-500">FOLDERS</h2>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <FolderTree folders={folders} parentId={null} level={0} />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
            <Users className="h-4 w-4" />
            <span className="text-sm">Team</span>
          </button>
          <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}