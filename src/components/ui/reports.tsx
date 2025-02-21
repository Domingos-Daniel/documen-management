import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Download, FileText, BarChart2 } from 'lucide-react';

export function Reports() {
  const { documents, workflows } = useStore();
  const [reportType, setReportType] = useState<'approvalTime' | 'documentProcessing' | 'rejectionRates'>('approvalTime');

  const generateReport = () => {
    switch (reportType) {
      case 'approvalTime':
        return generateApprovalTimeReport();
      case 'documentProcessing':
        return generateDocumentProcessingReport();
      case 'rejectionRates':
        return generateRejectionRatesReport();
      default:
        return [];
    }
  };

  const generateApprovalTimeReport = () => {
    // Logic to generate approval time report
    return [];
  };

  const generateDocumentProcessingReport = () => {
    // Logic to generate document processing report
    return [];
  };

  const generateRejectionRatesReport = () => {
    // Logic to generate rejection rates report
    return [];
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Logic to export report in the selected format
  };

  const reportData = generateReport();

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Reports and Analytics</h2>
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setReportType('approvalTime')}
          className={`px-4 py-2 rounded-lg ${reportType === 'approvalTime' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Approval Time
        </button>
        <button
          onClick={() => setReportType('documentProcessing')}
          className={`px-4 py-2 rounded-lg ${reportType === 'documentProcessing' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Document Processing
        </button>
        <button
          onClick={() => setReportType('rejectionRates')}
          className={`px-4 py-2 rounded-lg ${reportType === 'rejectionRates' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Rejection Rates
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Report Data</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {reportData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <ul className="space-y-2">
              {reportData.map((data, index) => (
                <li key={index} className="p-2 bg-white border rounded-lg">
                  {data}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => exportReport('pdf')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FileText className="h-4 w-4" />
          <span>Export as PDF</span>
        </button>
        <button
          onClick={() => exportReport('excel')}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <BarChart2 className="h-4 w-4" />
          <span>Export as Excel</span>
        </button>
        <button
          onClick={() => exportReport('csv')}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          <Download className="h-4 w-4" />
          <span>Export as CSV</span>
        </button>
      </div>
    </div>
  );
}
