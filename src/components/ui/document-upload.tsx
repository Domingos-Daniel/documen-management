import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function DocumentUpload() {
  const { addDocument, selectedFolderId } = useStore();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({ title: '', description: '', tags: '' });

  const handleFileUpload = (files: FileList) => {
    setUploading(true);
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreview(url);
      addDocument({
        name: file.name,
        description: metadata.description,
        folderId: selectedFolderId || '',
        type: file.type,
        url,
        size: file.size,
        status: 'draft',
        createdBy: 'currentUserId', // Replace with actual user ID
        assignedTo: null,
        workflowId: null,
        tags: metadata.tags.split(',').map(tag => tag.trim()),
        metadata: { title: metadata.title, description: metadata.description },
      });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Carregar Documento</h2>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">Arraste e solte o arquivo aqui ou</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Selecione um arquivo
            </button>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files!)}
            />
          </>
        )}
      </div>
      {preview && (
        <div className="mt-4">
          <h3 className="font-medium">Pré-visualização</h3>
          <img src={preview} alt="Pré-visualização" className="w-full h-auto rounded-lg" />
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => setPreview(null)}
          >
            <X className="h-4 w-4" />
            Remover
          </button>
        </div>
      )}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={metadata.title}
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={metadata.description}
          onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={metadata.tags}
          onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
