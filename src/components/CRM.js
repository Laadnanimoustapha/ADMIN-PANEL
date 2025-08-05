import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { exportToCSV, exportToPDF, getExportData } from '../utils/exportUtils';

const CRM = () => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const leads = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'hot',
      value: '$25,000',
      source: 'Website',
      lastContact: '2024-01-15',
      assignedTo: 'John Smith'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Digital Solutions',
      email: 'michael@digitalsol.com',
      phone: '+1 (555) 987-6543',
      status: 'warm',
      value: '$15,000',
      source: 'Referral',
      lastContact: '2024-01-14',
      assignedTo: 'Emma Davis'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      company: 'StartupXYZ',
      email: 'lisa@startupxyz.com',
      phone: '+1 (555) 456-7890',
      status: 'cold',
      value: '$8,000',
      source: 'LinkedIn',
      lastContact: '2024-01-10',
      assignedTo: 'Mike Wilson'
    }
  ];

  const customers = [
    {
      id: 1,
      name: 'Robert Anderson',
      company: 'Enterprise Corp',
      email: 'robert@enterprise.com',
      phone: '+1 (555) 111-2222',
      totalValue: '$125,000',
      joinDate: '2023-06-15',
      lastOrder: '2024-01-12',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jennifer White',
      company: 'Global Industries',
      email: 'jennifer@global.com',
      phone: '+1 (555) 333-4444',
      totalValue: '$89,500',
      joinDate: '2023-08-22',
      lastOrder: '2024-01-08',
      status: 'active'
    },
    {
      id: 3,
      name: 'David Thompson',
      company: 'Innovation Labs',
      email: 'david@innovation.com',
      phone: '+1 (555) 555-6666',
      totalValue: '$45,200',
      joinDate: '2023-11-10',
      lastOrder: '2023-12-20',
      status: 'inactive'
    }
  ];

  const deals = [
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'TechCorp Inc.',
      value: '$50,000',
      stage: 'negotiation',
      probability: 75,
      closeDate: '2024-02-15',
      owner: 'John Smith'
    },
    {
      id: 2,
      title: 'Cloud Migration Project',
      company: 'Digital Solutions',
      value: '$35,000',
      stage: 'proposal',
      probability: 60,
      closeDate: '2024-02-28',
      owner: 'Emma Davis'
    },
    {
      id: 3,
      title: 'Consulting Services',
      company: 'StartupXYZ',
      value: '$12,000',
      stage: 'qualified',
      probability: 40,
      closeDate: '2024-03-10',
      owner: 'Mike Wilson'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'bg-danger text-white';
      case 'warm': return 'bg-warning text-white';
      case 'cold': return 'bg-info text-white';
      case 'active': return 'bg-success text-white';
      case 'inactive': return 'bg-neutral-500 text-white';
      case 'negotiation': return 'bg-warning text-white';
      case 'proposal': return 'bg-info text-white';
      case 'qualified': return 'bg-secondary text-white';
      default: return 'bg-neutral-200 text-neutral-700';
    }
  };

  const handleAddLead = () => {
    showNotification('success', 'Lead Added', 'New lead has been successfully added to the system.');
  };

  const handleContactCustomer = (customer) => {
    showNotification('info', 'Contact Initiated', `Contacting ${customer.name} at ${customer.company}`);
  };

  const handleExport = (format) => {
    let data, filename, title;
    
    switch (activeTab) {
      case 'leads':
        data = getExportData('crm-leads', leads);
        filename = 'crm-leads';
        title = 'CRM Leads Report';
        break;
      case 'customers':
        data = getExportData('crm-customers', customers);
        filename = 'crm-customers';
        title = 'CRM Customers Report';
        break;
      case 'deals':
        data = getExportData('crm-deals', deals);
        filename = 'crm-deals';
        title = 'CRM Deals Report';
        break;
      default:
        data = [];
    }

    if (format === 'csv') {
      exportToCSV(data, filename);
      showNotification('success', 'Export Complete', `${activeTab} data exported to CSV successfully.`);
    } else if (format === 'pdf') {
      exportToPDF(data, filename, title);
      showNotification('success', 'Export Complete', `${activeTab} data exported to PDF successfully.`);
    }
  };

  const tabs = [
    { id: 'leads', label: 'Leads', icon: 'fas fa-user-plus', count: leads.length },
    { id: 'customers', label: 'Customers', icon: 'fas fa-users', count: customers.length },
    { id: 'deals', label: 'Deals', icon: 'fas fa-handshake', count: deals.length }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Customer Relations Management</h1>
          <p className="text-neutral-600 mt-1">Manage leads, customers, and deals in one place</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleAddLead}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>Add Lead
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors flex items-center"
            >
              <i className="fas fa-download mr-2"></i>Export
              <i className="fas fa-chevron-down ml-2 text-sm"></i>
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleExport('csv');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <i className="fas fa-file-csv mr-3 text-green-600"></i>
                    Export as CSV
                  </button>
                  <button
                    onClick={() => {
                      handleExport('pdf');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <i className="fas fa-file-pdf mr-3 text-red-600"></i>
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Leads</p>
              <p className="text-2xl font-bold text-primary mt-2">{leads.length}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+12%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-user-plus text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Customers</p>
              <p className="text-2xl font-bold text-success mt-2">{customers.filter(c => c.status === 'active').length}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+8%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Open Deals</p>
              <p className="text-2xl font-bold text-warning mt-2">{deals.length}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+15%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <i className="fas fa-handshake text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-info mt-2">$97K</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+22%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
                <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-neutral-400"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={`Search ${activeTab}...`}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Status</option>
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </select>
              <select className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Sources</option>
                <option>Website</option>
                <option>Referral</option>
                <option>LinkedIn</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'leads' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{lead.name}</div>
                          <div className="text-sm text-neutral-500">{lead.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{lead.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{lead.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{lead.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{lead.assignedTo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary-dark">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-secondary hover:text-secondary-dark">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-success hover:text-green-600">
                            <i className="fas fa-phone"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((customer) => (
                <div key={customer.id} className="border border-neutral-200 rounded-lg p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">{customer.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{customer.company}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Total Value:</span>
                      <span className="font-medium">{customer.totalValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Join Date:</span>
                      <span className="font-medium">{customer.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Last Order:</span>
                      <span className="font-medium">{customer.lastOrder}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleContactCustomer(customer)}
                      className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                    >
                      <i className="fas fa-phone mr-1"></i>Contact
                    </button>
                    <button className="px-3 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="border border-neutral-200 rounded-lg p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">{deal.title}</h3>
                      <p className="text-sm text-neutral-600">{deal.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-neutral-900">{deal.value}</div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deal.stage)}`}>
                        {deal.stage.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-500">Probability:</span>
                      <div className="mt-1">
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full" 
                            style={{ width: `${deal.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-neutral-600 mt-1">{deal.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Close Date:</span>
                      <div className="font-medium">{deal.closeDate}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Owner:</span>
                      <div className="font-medium">{deal.owner}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                      <i className="fas fa-edit mr-1"></i>Update
                    </button>
                    <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                      <i className="fas fa-check mr-1"></i>Close Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRM;