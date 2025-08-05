import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';

const Integrations = () => {
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const integrations = [
    {
      id: 1,
      name: 'Stripe',
      category: 'Payment',
      description: 'Accept payments online with Stripe\'s secure payment processing',
      icon: 'fab fa-stripe',
      status: 'connected',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'PayPal',
      category: 'Payment',
      description: 'Process payments through PayPal\'s global payment platform',
      icon: 'fab fa-paypal',
      status: 'available',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      name: 'Shopify',
      category: 'E-commerce',
      description: 'Sync your Shopify store with ViroTech dashboard',
      icon: 'fab fa-shopify',
      status: 'connected',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 4,
      name: 'WooCommerce',
      category: 'E-commerce',
      description: 'Connect your WooCommerce store for unified management',
      icon: 'fab fa-wordpress',
      status: 'available',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      name: 'Mailchimp',
      category: 'Marketing',
      description: 'Sync customer data with Mailchimp for email campaigns',
      icon: 'fab fa-mailchimp',
      status: 'connected',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 6,
      name: 'HubSpot',
      category: 'CRM',
      description: 'Integrate with HubSpot CRM for customer relationship management',
      icon: 'fab fa-hubspot',
      status: 'available',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 7,
      name: 'Salesforce',
      category: 'CRM',
      description: 'Connect with Salesforce for advanced CRM capabilities',
      icon: 'fab fa-salesforce',
      status: 'available',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100'
    },
    {
      id: 8,
      name: 'Slack',
      category: 'Communication',
      description: 'Get notifications and updates directly in Slack',
      icon: 'fab fa-slack',
      status: 'connected',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 9,
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Import Google Analytics data for comprehensive reporting',
      icon: 'fab fa-google',
      status: 'connected',
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    },
    {
      id: 10,
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect with 3000+ apps through Zapier automation',
      icon: 'fas fa-bolt',
      status: 'available',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      id: 11,
      name: 'QuickBooks',
      category: 'Accounting',
      description: 'Sync financial data with QuickBooks accounting software',
      icon: 'fas fa-calculator',
      status: 'available',
      color: 'text-green-700',
      bgColor: 'bg-green-100'
    },
    {
      id: 12,
      name: 'Xero',
      category: 'Accounting',
      description: 'Connect with Xero for streamlined financial management',
      icon: 'fas fa-chart-pie',
      status: 'available',
      color: 'text-blue-800',
      bgColor: 'bg-blue-100'
    }
  ];

  const categories = ['all', 'Payment', 'E-commerce', 'Marketing', 'CRM', 'Communication', 'Analytics', 'Automation', 'Accounting'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (integration) => {
    if (integration.status === 'connected') {
      showNotification('info', 'Already Connected', `${integration.name} is already connected to your account.`);
    } else {
      showNotification('success', 'Integration Connected', `${integration.name} has been successfully connected!`);
    }
  };

  const handleDisconnect = (integration) => {
    showNotification('warning', 'Integration Disconnected', `${integration.name} has been disconnected from your account.`);
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const availableCount = integrations.filter(i => i.status === 'available').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Integrations Hub</h1>
          <p className="text-neutral-600 mt-1">Connect your favorite tools and services to streamline your workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-neutral-500">
            <span className="font-medium text-success">{connectedCount} Connected</span>
            <span className="mx-2">•</span>
            <span className="font-medium text-info">{availableCount} Available</span>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <i className="fas fa-plus mr-2"></i>Request Integration
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Connected</p>
              <p className="text-2xl font-bold text-success mt-2">{connectedCount}</p>
            </div>
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <i className="fas fa-plug text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Available</p>
              <p className="text-2xl font-bold text-info mt-2">{availableCount}</p>
            </div>
            <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center">
              <i className="fas fa-puzzle-piece text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Categories</p>
              <p className="text-2xl font-bold text-warning mt-2">{categories.length - 1}</p>
            </div>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <i className="fas fa-layer-group text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Data Synced</p>
              <p className="text-2xl font-bold text-secondary mt-2">24/7</p>
            </div>
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <i className="fas fa-sync-alt text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
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
                placeholder="Search integrations..."
              />
            </div>
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${integration.bgColor} rounded-lg flex items-center justify-center`}>
                <i className={`${integration.icon} ${integration.color} text-xl`}></i>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                integration.status === 'connected' 
                  ? 'bg-success bg-opacity-10 text-success' 
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                {integration.status === 'connected' ? 'Connected' : 'Available'}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{integration.name}</h3>
            <p className="text-sm text-neutral-600 mb-4">{integration.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                {integration.category}
              </span>
              <div className="flex space-x-2">
                {integration.status === 'connected' ? (
                  <>
                    <button 
                      onClick={() => handleConnect(integration)}
                      className="px-3 py-1 text-xs bg-success text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <i className="fas fa-cog mr-1"></i>Configure
                    </button>
                    <button 
                      onClick={() => handleDisconnect(integration)}
                      className="px-3 py-1 text-xs bg-neutral-500 text-white rounded hover:bg-neutral-600 transition-colors"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleConnect(integration)}
                    className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                  >
                    <i className="fas fa-plug mr-1"></i>Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-puzzle-piece text-4xl text-neutral-400 mb-4"></i>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No integrations found</h3>
          <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Popular Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Popular Integration Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => {
            const count = integrations.filter(i => i.category === category).length;
            return (
              <div key={category} className="text-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className="text-sm text-neutral-600">{category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Integrations;