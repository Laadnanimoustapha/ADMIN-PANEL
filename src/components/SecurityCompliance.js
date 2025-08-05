import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { exportToCSV, exportToPDF, getExportData } from '../utils/exportUtils';

const SecurityCompliance = () => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const securityMetrics = {
    threatLevel: 'Low',
    activeThreats: 2,
    blockedAttempts: 147,
    complianceScore: 94,
    lastScan: '2024-01-15 14:30',
    vulnerabilities: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 8
    }
  };

  const accessLogs = [
    {
      id: 1,
      user: 'admin@virotech.com',
      action: 'Login',
      resource: 'Dashboard',
      timestamp: '2024-01-15 14:25:30',
      ip: '192.168.1.100',
      status: 'success',
      location: 'New York, US'
    },
    {
      id: 2,
      user: 'john.smith@virotech.com',
      action: 'File Access',
      resource: 'Financial Reports',
      timestamp: '2024-01-15 14:20:15',
      ip: '192.168.1.105',
      status: 'success',
      location: 'New York, US'
    },
    {
      id: 3,
      user: 'unknown@suspicious.com',
      action: 'Login Attempt',
      resource: 'Admin Panel',
      timestamp: '2024-01-15 14:15:45',
      ip: '45.123.456.789',
      status: 'blocked',
      location: 'Unknown'
    },
    {
      id: 4,
      user: 'emma.davis@virotech.com',
      action: 'Data Export',
      resource: 'Customer Database',
      timestamp: '2024-01-15 14:10:20',
      ip: '192.168.1.110',
      status: 'success',
      location: 'New York, US'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@virotech.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2024-01-15 14:25',
      permissions: ['full_access', 'user_management', 'system_config'],
      mfaEnabled: true
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@virotech.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2024-01-15 14:20',
      permissions: ['read_reports', 'manage_team', 'export_data'],
      mfaEnabled: true
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@virotech.com',
      role: 'Analyst',
      status: 'active',
      lastLogin: '2024-01-15 14:10',
      permissions: ['read_reports', 'export_data'],
      mfaEnabled: false
    },
    {
      id: 4,
      name: 'Mike Wilson',
      email: 'mike.wilson@virotech.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15',
      permissions: ['read_only'],
      mfaEnabled: false
    }
  ];

  const complianceChecks = [
    {
      id: 1,
      name: 'GDPR Compliance',
      status: 'compliant',
      lastCheck: '2024-01-15',
      score: 98,
      issues: 0
    },
    {
      id: 2,
      name: 'SOX Compliance',
      status: 'compliant',
      lastCheck: '2024-01-14',
      score: 95,
      issues: 1
    },
    {
      id: 3,
      name: 'HIPAA Compliance',
      status: 'warning',
      lastCheck: '2024-01-13',
      score: 87,
      issues: 3
    },
    {
      id: 4,
      name: 'PCI DSS',
      status: 'compliant',
      lastCheck: '2024-01-12',
      score: 92,
      issues: 2
    }
  ];

  const securityPolicies = [
    {
      id: 1,
      name: 'Password Policy',
      description: 'Minimum 8 characters, special characters required',
      status: 'active',
      lastUpdated: '2024-01-01'
    },
    {
      id: 2,
      name: 'Access Control Policy',
      description: 'Role-based access control with principle of least privilege',
      status: 'active',
      lastUpdated: '2023-12-15'
    },
    {
      id: 3,
      name: 'Data Retention Policy',
      description: 'Customer data retained for 7 years, logs for 1 year',
      status: 'active',
      lastUpdated: '2023-11-20'
    },
    {
      id: 4,
      name: 'Incident Response Policy',
      description: 'Procedures for security incident handling and reporting',
      status: 'review',
      lastUpdated: '2023-10-10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': case 'active': case 'compliant': return 'bg-success text-white';
      case 'blocked': case 'inactive': case 'critical': return 'bg-danger text-white';
      case 'warning': case 'review': case 'medium': return 'bg-warning text-white';
      case 'pending': case 'low': return 'bg-info text-white';
      default: return 'bg-neutral-200 text-neutral-700';
    }
  };

  const getThreatLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-danger';
      case 'critical': return 'text-danger';
      default: return 'text-neutral-600';
    }
  };

  const handleRunScan = () => {
    showNotification('info', 'Security Scan Started', 'Comprehensive security scan is now running...');
  };

  const handleToggleMFA = (userId) => {
    showNotification('success', 'MFA Updated', 'Multi-factor authentication settings have been updated.');
  };

  const handleGenerateReport = (format) => {
    let data, filename, title;
    
    switch (activeTab) {
      case 'access':
        data = getExportData('security-users', users);
        filename = 'security-users';
        title = 'Security Users Report';
        break;
      case 'logs':
        data = getExportData('security-logs', accessLogs);
        filename = 'security-audit-logs';
        title = 'Security Audit Logs Report';
        break;
      case 'compliance':
        data = complianceChecks.map(check => ({
          'Compliance Type': check.name,
          Status: check.status,
          'Score (%)': check.score,
          'Issues Found': check.issues,
          'Last Check': check.lastCheck
        }));
        filename = 'security-compliance';
        title = 'Security Compliance Report';
        break;
      case 'policies':
        data = securityPolicies.map(policy => ({
          'Policy Name': policy.name,
          Description: policy.description,
          Status: policy.status,
          'Last Updated': policy.lastUpdated
        }));
        filename = 'security-policies';
        title = 'Security Policies Report';
        break;
      default:
        data = [
          { Metric: 'Threat Level', Value: securityMetrics.threatLevel },
          { Metric: 'Active Threats', Value: securityMetrics.activeThreats },
          { Metric: 'Blocked Attempts', Value: securityMetrics.blockedAttempts },
          { Metric: 'Compliance Score (%)', Value: securityMetrics.complianceScore },
          { Metric: 'Critical Vulnerabilities', Value: securityMetrics.vulnerabilities.critical },
          { Metric: 'High Vulnerabilities', Value: securityMetrics.vulnerabilities.high },
          { Metric: 'Medium Vulnerabilities', Value: securityMetrics.vulnerabilities.medium },
          { Metric: 'Low Vulnerabilities', Value: securityMetrics.vulnerabilities.low }
        ];
        filename = 'security-overview';
        title = 'Security Overview Report';
    }

    if (format === 'csv') {
      exportToCSV(data, filename);
      showNotification('success', 'Export Complete', 'Security report exported to CSV successfully.');
    } else if (format === 'pdf') {
      exportToPDF(data, filename, title);
      showNotification('success', 'Export Complete', 'Security report exported to PDF successfully.');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: 'fas fa-shield-alt' },
    { id: 'access', label: 'Access Control', icon: 'fas fa-key' },
    { id: 'logs', label: 'Audit Logs', icon: 'fas fa-list-alt' },
    { id: 'compliance', label: 'Compliance', icon: 'fas fa-check-circle' },
    { id: 'policies', label: 'Policies', icon: 'fas fa-file-contract' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Security & Compliance</h1>
          <p className="text-neutral-600 mt-1">Monitor security status and ensure regulatory compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRunScan}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-search mr-2"></i>Run Security Scan
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors flex items-center"
            >
              <i className="fas fa-file-alt mr-2"></i>Generate Report
              <i className="fas fa-chevron-down ml-2 text-sm"></i>
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleGenerateReport('csv');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <i className="fas fa-file-csv mr-3 text-green-600"></i>
                    Export as CSV
                  </button>
                  <button
                    onClick={() => {
                      handleGenerateReport('pdf');
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

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Threat Level</p>
              <p className={`text-2xl font-bold mt-2 ${getThreatLevelColor(securityMetrics.threatLevel)}`}>
                {securityMetrics.threatLevel}
              </p>
              <div className="flex items-center mt-2">
                <i className="fas fa-shield-alt text-success text-sm mr-1"></i>
                <span className="text-sm text-success">Protected</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <i className="fas fa-shield-alt text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Threats</p>
              <p className="text-2xl font-bold text-warning mt-2">{securityMetrics.activeThreats}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-exclamation-triangle text-warning text-sm mr-1"></i>
                <span className="text-sm text-warning">Monitoring</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Blocked Attempts</p>
              <p className="text-2xl font-bold text-danger mt-2">{securityMetrics.blockedAttempts}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-ban text-danger text-sm mr-1"></i>
                <span className="text-sm text-danger">Today</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-danger rounded-lg flex items-center justify-center">
              <i className="fas fa-ban text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Compliance Score</p>
              <p className="text-2xl font-bold text-primary mt-2">{securityMetrics.complianceScore}%</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-check-circle text-success text-sm mr-1"></i>
                <span className="text-sm text-success">Excellent</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-xl"></i>
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
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Vulnerability Summary */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Vulnerability Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-danger bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-danger">{securityMetrics.vulnerabilities.critical}</div>
                    <div className="text-sm text-neutral-600">Critical</div>
                  </div>
                  <div className="text-center p-4 bg-warning bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{securityMetrics.vulnerabilities.high}</div>
                    <div className="text-sm text-neutral-600">High</div>
                  </div>
                  <div className="text-center p-4 bg-info bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-info">{securityMetrics.vulnerabilities.medium}</div>
                    <div className="text-sm text-neutral-600">Medium</div>
                  </div>
                  <div className="text-center p-4 bg-success bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{securityMetrics.vulnerabilities.low}</div>
                    <div className="text-sm text-neutral-600">Low</div>
                  </div>
                </div>
              </div>

              {/* Recent Security Events */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Security Events</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-danger bg-opacity-10 rounded-lg border border-danger border-opacity-20">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-exclamation-triangle text-danger"></i>
                      <div>
                        <div className="font-medium text-danger">Suspicious Login Attempt Blocked</div>
                        <div className="text-sm text-neutral-600">IP: 45.123.456.789 - 2 minutes ago</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-danger text-white rounded text-sm">Investigate</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-warning bg-opacity-10 rounded-lg border border-warning border-opacity-20">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-key text-warning"></i>
                      <div>
                        <div className="font-medium text-warning">Password Policy Violation</div>
                        <div className="text-sm text-neutral-600">User: mike.wilson@virotech.com - 1 hour ago</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-warning text-white rounded text-sm">Review</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-check-circle text-success"></i>
                      <div>
                        <div className="font-medium text-success">Security Scan Completed</div>
                        <div className="text-sm text-neutral-600">No critical issues found - 3 hours ago</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-success text-white rounded text-sm">View Report</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">User Access Management</h3>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  <i className="fas fa-plus mr-2"></i>Add User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">MFA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                            <div className="text-sm text-neutral-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleMFA(user.id)}
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.mfaEnabled ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary hover:text-primary-dark">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-secondary hover:text-secondary-dark">
                              <i className="fas fa-key"></i>
                            </button>
                            <button className="text-danger hover:text-red-600">
                              <i className="fas fa-ban"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Audit Logs</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search logs..."
                    className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <select className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>All Actions</option>
                    <option>Login</option>
                    <option>File Access</option>
                    <option>Data Export</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Resource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {accessLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{log.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{log.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{log.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{log.resource}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{log.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900">Compliance Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="border border-neutral-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-neutral-900">{check.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Compliance Score:</span>
                        <span className="text-sm font-medium">{check.score}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${check.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Issues Found:</span>
                        <span className="text-sm font-medium">{check.issues}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Last Check:</span>
                        <span className="text-sm font-medium">{check.lastCheck}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Security Policies</h3>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  <i className="fas fa-plus mr-2"></i>Add Policy
                </button>
              </div>
              
              <div className="space-y-4">
                {securityPolicies.map((policy) => (
                  <div key={policy.id} className="border border-neutral-200 rounded-lg p-6 hover-lift">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-neutral-900">{policy.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                        {policy.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{policy.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Last updated: {policy.lastUpdated}</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-secondary text-white rounded text-sm hover:bg-secondary-dark transition-colors">
                          <i className="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button className="px-3 py-1 bg-info text-white rounded text-sm hover:bg-blue-600 transition-colors">
                          <i className="fas fa-eye mr-1"></i>View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityCompliance;