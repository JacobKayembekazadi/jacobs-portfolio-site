import React, { useState, useEffect } from 'react';
import { 
  LeadQualification, 
  LeadCategory, 
  LeadStatus
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const [leads, setLeads] = useState<LeadQualification[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadQualification | null>(null);
  const [filter, setFilter] = useState<'all' | LeadCategory>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    const savedLeads = JSON.parse(localStorage.getItem('qualifiedLeads') || '[]');
    // Convert timestamp strings back to Date objects
    const processedLeads = savedLeads.map((lead: any) => ({
      ...lead,
      timestamp: new Date(lead.timestamp),
      conversationHistory: lead.conversationHistory.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
    setLeads(processedLeads);
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('qualifiedLeads', JSON.stringify(updatedLeads));
  };

  const addNote = (leadId: string, note: string) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, notes: lead.notes ? `${lead.notes}\n\n---\n${note}` : note }
        : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('qualifiedLeads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (leadId: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(updatedLeads);
    localStorage.setItem('qualifiedLeads', JSON.stringify(updatedLeads));
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
    }
  };

  const getFilteredAndSortedLeads = () => {
    let filteredLeads = leads;

    // Apply category filter
    if (filter !== 'all') {
      filteredLeads = filteredLeads.filter(lead => lead.category === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filteredLeads = filteredLeads.filter(lead => 
        lead.extractedData.projectDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.extractedData.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.extractedData.contactInfo?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.extractedData.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filteredLeads.sort((a, b) => {
      if (sortBy === 'date') {
        return b.timestamp.getTime() - a.timestamp.getTime();
      } else {
        return b.qualificationScore - a.qualificationScore;
      }
    });

    return filteredLeads;
  };

  const getCategoryColor = (category: LeadCategory): string => {
    switch (category) {
      case LeadCategory.HIGH_VALUE:
        return 'text-green-700 bg-green-100';
      case LeadCategory.QUALIFIED:
        return 'text-blue-700 bg-blue-100';
      case LeadCategory.NURTURE:
        return 'text-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status: LeadStatus): string => {
    switch (status) {
      case LeadStatus.NEW:
        return 'text-red-700 bg-red-100';
      case LeadStatus.IN_PROGRESS:
        return 'text-yellow-700 bg-yellow-100';
      case LeadStatus.RESPONDED:
        return 'text-blue-700 bg-blue-100';
      case LeadStatus.CONVERTED:
        return 'text-green-700 bg-green-100';
      case LeadStatus.CLOSED:
        return 'text-gray-700 bg-gray-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStats = () => {
    const total = leads.length;
    const highValue = leads.filter(lead => lead.category === LeadCategory.HIGH_VALUE).length;
    const qualified = leads.filter(lead => lead.category === LeadCategory.QUALIFIED).length;
    const avgScore = total > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.qualificationScore, 0) / total) : 0;
    const newLeads = leads.filter(lead => lead.status === LeadStatus.NEW).length;

    return { total, highValue, qualified, avgScore, newLeads };
  };

  const exportToCSV = () => {
    const headers = [
      'ID', 'Date', 'Score', 'Category', 'Status', 'Project Type', 'Timeline', 
      'Budget', 'Company Size', 'Industry', 'Name', 'Email', 'Company'
    ];

    const csvData = leads.map(lead => [
      lead.id,
      lead.timestamp.toISOString(),
      lead.qualificationScore,
      lead.category,
      lead.status,
      lead.extractedData.projectType || '',
      lead.extractedData.timeline || '',
      lead.extractedData.budgetRange || '',
      lead.extractedData.companySize || '',
      lead.extractedData.industry || '',
      lead.extractedData.contactInfo?.name || '',
      lead.extractedData.contactInfo?.email || '',
      lead.extractedData.contactInfo?.company || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isOpen) return null;

  const stats = getStats();
  const filteredLeads = getFilteredAndSortedLeads();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lead Management Dashboard</h2>
            <p className="text-sm text-gray-600">Manage and track your qualified leads</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Leads</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.highValue}</p>
              <p className="text-sm text-gray-600">High Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.qualified}</p>
              <p className="text-sm text-gray-600">Qualified</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.avgScore}</p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.newLeads}</p>
              <p className="text-sm text-gray-600">New Leads</p>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | LeadCategory)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value={LeadCategory.HIGH_VALUE}>High Value</option>
                <option value={LeadCategory.QUALIFIED}>Qualified</option>
                <option value={LeadCategory.NURTURE}>Nurture</option>
                <option value={LeadCategory.UNQUALIFIED}>Unqualified</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Date (Newest First)</option>
                <option value="score">Score (Highest First)</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, company, or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Leads List */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Leads ({filteredLeads.length})
              </h3>
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(lead.category)}`}>
                          {lead.category.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{lead.qualificationScore}</span>
                    </div>
                    
                    <div className="text-sm text-gray-900 font-medium mb-1">
                      {lead.extractedData.projectType || 'Unknown Project'}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {lead.extractedData.contactInfo?.company || 'Unknown Company'} • {' '}
                      {lead.timestamp.toLocaleDateString()}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Timeline: {lead.extractedData.timeline || 'Not specified'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="w-1/2 overflow-y-auto">
            {selectedLead ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Lead Details</h3>
                    <p className="text-sm text-gray-600">ID: {selectedLead.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={selectedLead.status}
                      onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={LeadStatus.NEW}>New</option>
                      <option value={LeadStatus.IN_PROGRESS}>In Progress</option>
                      <option value={LeadStatus.RESPONDED}>Responded</option>
                      <option value={LeadStatus.CONVERTED}>Converted</option>
                      <option value={LeadStatus.CLOSED}>Closed</option>
                    </select>
                    <button
                      onClick={() => deleteLead(selectedLead.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Score and Category */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{selectedLead.qualificationScore}/100</p>
                      <p className="text-sm text-gray-600">Score</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedLead.category)}`}>
                        {selectedLead.category.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extracted Data */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLead.extractedData.projectType && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Project Type</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.projectType}</p>
                      </div>
                    )}
                    {selectedLead.extractedData.timeline && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Timeline</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.timeline}</p>
                      </div>
                    )}
                    {selectedLead.extractedData.budgetRange && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Budget</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.budgetRange}</p>
                      </div>
                    )}
                    {selectedLead.extractedData.companySize && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Company Size</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.companySize}</p>
                      </div>
                    )}
                    {selectedLead.extractedData.industry && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Industry</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.industry}</p>
                      </div>
                    )}
                    {selectedLead.extractedData.aiExperience && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">AI Experience</p>
                        <p className="text-sm text-gray-900">{selectedLead.extractedData.aiExperience}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                {selectedLead.extractedData.contactInfo && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedLead.extractedData.contactInfo.name && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Name</p>
                          <p className="text-sm text-gray-900">{selectedLead.extractedData.contactInfo.name}</p>
                        </div>
                      )}
                      {selectedLead.extractedData.contactInfo.email && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p className="text-sm text-gray-900">{selectedLead.extractedData.contactInfo.email}</p>
                        </div>
                      )}
                      {selectedLead.extractedData.contactInfo.company && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Company</p>
                          <p className="text-sm text-gray-900">{selectedLead.extractedData.contactInfo.company}</p>
                        </div>
                      )}
                      {selectedLead.extractedData.contactInfo.phone && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Phone</p>
                          <p className="text-sm text-gray-900">{selectedLead.extractedData.contactInfo.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Notes</h4>
                  <div className="space-y-3">
                    {selectedLead.notes && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedLead.notes}</p>
                      </div>
                    )}
                    <div>
                      <textarea
                        placeholder="Add a note..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            const target = e.target as HTMLTextAreaElement;
                            if (target.value.trim()) {
                              addNote(selectedLead.id, target.value.trim());
                              target.value = '';
                            }
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">Press Ctrl+Enter to save note</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 