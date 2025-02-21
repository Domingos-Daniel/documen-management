import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser, setUserRole } = useStore();
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', departmentId: '' });
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'user', departmentId: '' });
  };

  const handleUpdateUser = (id) => {
    updateUser(id, editingUser);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Gestão de Utilizadores</h2>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Adicionar Novo Utilizador</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nome"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="user">Utilizador</option>
            <option value="admin">Administrador</option>
            <option value="reviewer">Revisor</option>
            <option value="approver">Aprovador</option>
          </select>
          <input
            type="text"
            placeholder="ID do Departamento"
            value={newUser.departmentId}
            onChange={(e) => setNewUser({ ...newUser, departmentId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            onClick={handleAddUser}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Utilizador</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Lista de Utilizadores</h3>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="p-4 border rounded-lg flex items-start space-x-4 bg-gray-50">
              <div className="flex-1">
                {editingUser?.id === user.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="user">Utilizador</option>
                      <option value="admin">Administrador</option>
                      <option value="reviewer">Revisor</option>
                      <option value="approver">Aprovador</option>
                    </select>
                    <input
                      type="text"
                      value={editingUser.departmentId}
                      onChange={(e) => setEditingUser({ ...editingUser, departmentId: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <button
                      onClick={() => handleUpdateUser(user.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Salvar</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                    <p className="text-sm text-gray-500">Departamento: {user.departmentId}</p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
