import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'reviewer' | 'approver';
  departmentId: string;
}

interface Department {
  id: string;
  name: string;
  parentId: string | null;
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  type: 'folder' | 'collection';
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  name: string;
  description: string;
  folderId: string;
  type: string;
  url: string;
  size: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdBy: string;
  assignedTo: string | null;
  workflowId: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  metadata: Record<string, any>;
}

interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  documentId: string;
  currentStep: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'review' | 'approve' | 'notify';
  assignedTo: string[];
  status: 'pending' | 'completed' | 'rejected';
  comments: string[];
  dueDate: Date | null;
}

interface Notification {
  id: string;
  userId: string;
  type: 'document' | 'workflow' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface StoreState {
  // State
  user: User | null;
  folders: Folder[];
  documents: Document[];
  workflows: Workflow[];
  notifications: Notification[];
  selectedFolderId: string | null;
  searchQuery: string;
  filters: {
    type: string[];
    status: string[];
    dateRange: { start: Date | null; end: Date | null };
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setSelectedFolder: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: StoreState['filters']) => void;
  
  // Folder operations
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFolder: (id: string, data: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  
  // Document operations
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, data: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  moveDocument: (documentId: string, newFolderId: string) => void;
  
  // Workflow operations
  createWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkflow: (id: string, data: Partial<Workflow>) => void;
  completeWorkflowStep: (workflowId: string, stepId: string, approved: boolean, comment?: string) => void;
  
  // Notification operations
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  user: null,
  folders: [],
  documents: [],
  workflows: [],
  notifications: [],
  selectedFolderId: null,
  searchQuery: '',
  filters: {
    type: [],
    status: [],
    dateRange: { start: null, end: null },
  },

  // User actions
  setUser: (user) => set({ user }),
  setSelectedFolder: (id) => set({ selectedFolderId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),

  // Folder operations
  addFolder: (folder) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          ...folder,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  updateFolder: (id, data) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id
          ? { ...folder, ...data, updatedAt: new Date() }
          : folder
      ),
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
    })),

  // Document operations
  addDocument: (document) =>
    set((state) => ({
      documents: [
        ...state.documents,
        {
          ...document,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  updateDocument: (id, data) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id
          ? { ...doc, ...data, updatedAt: new Date() }
          : doc
      ),
    })),

  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),

  moveDocument: (documentId, newFolderId) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, folderId: newFolderId, updatedAt: new Date() }
          : doc
      ),
    })),

  // Workflow operations
  createWorkflow: (workflow) =>
    set((state) => ({
      workflows: [
        ...state.workflows,
        {
          ...workflow,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  updateWorkflow: (id, data) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id
          ? { ...workflow, ...data, updatedAt: new Date() }
          : workflow
      ),
    })),

  completeWorkflowStep: (workflowId, stepId, approved, comment) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) => {
        if (workflow.id !== workflowId) return workflow;

        const newSteps = workflow.steps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                status: approved ? 'completed' : 'rejected',
                comments: comment
                  ? [...step.comments, comment]
                  : step.comments,
              }
            : step
        );

        return {
          ...workflow,
          steps: newSteps,
          currentStep: approved
            ? workflow.currentStep + 1
            : workflow.currentStep,
          status:
            approved && workflow.currentStep === workflow.steps.length - 1
              ? 'completed'
              : workflow.status,
          updatedAt: new Date(),
        };
      }),
    })),

  // Notification operations
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
        ...state.notifications,
      ],
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    })),

  clearNotifications: () =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => !notif.read),
    })),
}));