import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

export function WorkflowManagement() {
  const { workflows, createWorkflow, updateWorkflow, completeWorkflowStep } = useStore();
  const [newWorkflow, setNewWorkflow] = useState({ name: '', steps: [] });
  const [newStep, setNewStep] = useState({ name: '', type: 'review', assignedTo: [], dueDate: null });

  const handleAddWorkflow = () => {
    createWorkflow(newWorkflow);
    setNewWorkflow({ name: '', steps: [] });
  };

  const handleAddStep = () => {
    setNewWorkflow({
      ...newWorkflow,
      steps: [...newWorkflow.steps, newStep],
    });
    setNewStep({ name: '', type: 'review', assignedTo: [], dueDate: null });
  };

  const handleCompleteStep = (workflowId, stepId, approved) => {
    completeWorkflowStep(workflowId, stepId, approved);
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Gestão de Workflows</h2>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Adicionar Novo Workflow</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nome do Workflow"
            value={newWorkflow.name}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Adicionar Etapa</h4>
            <input
              type="text"
              placeholder="Nome da Etapa"
              value={newStep.name}
              onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <select
              value={newStep.type}
              onChange={(e) => setNewStep({ ...newStep, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="review">Revisão</option>
              <option value="approve">Aprovação</option>
              <option value="notify">Notificação</option>
            </select>
            <input
              type="text"
              placeholder="Atribuído a (IDs separados por vírgula)"
              value={newStep.assignedTo.join(', ')}
              onChange={(e) => setNewStep({ ...newStep, assignedTo: e.target.value.split(',').map(id => id.trim()) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <input
              type="date"
              placeholder="Data de Vencimento"
              value={newStep.dueDate ? newStep.dueDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setNewStep({ ...newStep, dueDate: e.target.value ? new Date(e.target.value) : null })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              onClick={handleAddStep}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar Etapa</span>
            </button>
          </div>
          <button
            onClick={handleAddWorkflow}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Workflow</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Lista de Workflows</h3>
        <ul className="space-y-4">
          {workflows.map((workflow) => (
            <li key={workflow.id} className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium">{workflow.name}</h4>
              <ul className="space-y-2 mt-2">
                {workflow.steps.map((step) => (
                  <li key={step.id} className="flex items-center space-x-2">
                    <span className="flex-1">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.type}</span>
                    <span className="text-sm text-gray-500">{step.dueDate ? step.dueDate.toLocaleDateString() : 'Sem data'}</span>
                    <button
                      onClick={() => handleCompleteStep(workflow.id, step.id, true)}
                      className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleCompleteStep(workflow.id, step.id, false)}
                      className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
