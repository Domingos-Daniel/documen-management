import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface DocumentPreviewProps {
  documentId: string;
  onClose: () => void;
}

export function DocumentPreview({ documentId, onClose }: DocumentPreviewProps) {
  const { documents } = useStore();
  const document = documents.find((doc) => doc.id === documentId);

  if (!document) {
    return <div>Documento não encontrado</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{document.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">{document.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Metadados</h3>
          <ul className="list-disc list-inside">
            {Object.entries(document.metadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Tags</h3>
          <ul className="list-disc list-inside">
            {document.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Pré-visualização</h3>
          <img src={document.url} alt={document.name} className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}
