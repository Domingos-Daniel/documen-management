import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

interface DocumentEditProps {
  documentId: string;
  onClose: () => void;
}

export function DocumentEdit({ documentId, onClose }: DocumentEditProps) {
  const { documents, updateDocument } = useStore();
  const document = documents.find((doc) => doc.id === documentId);

  const [name, setName] = useState(document?.name || '');
  const [description, setDescription] = useState(document?.description || '');
  const [tags, setTags] = useState(document?.tags.join(', ') || '');
  const [metadata, setMetadata] = useState(document?.metadata || {});

  const handleSave = () => {
    if (document) {
      updateDocument(documentId, {
        name,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        metadata,
      });
      onClose();
    }
  };

  if (!document) {
    return <div>Documento não encontrado</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Editar Documento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Fechar
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Metadados</label>
          <textarea
            value={JSON.stringify(metadata, null, 2)}
            onChange={(e) => setMetadata(JSON.parse(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
