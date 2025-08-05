import React, { useState, useEffect, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import { exportToCSV, exportToPDF, getExportData } from '../utils/exportUtils';
import Chart from 'chart.js/auto';

const FinancialManagement = () => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const revenueChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const cashFlowChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const expenseChartInstance = useRef(null);
  const cashFlowChartInstance = useRef(null);

  const financialData = {
    revenue: 125000,
    expenses: 87500,
    profit: 37500,
    cashFlow: 42000,
    accounts: {
      receivable: 25000,
      payable: 18500
    }
  };

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Software License Payment',
      category: 'Revenue',
      amount: 15000,
      type: 'income',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Office Rent',
      category: 'Operating Expenses',
      amount: -3500,
      type: 'expense',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Consulting Services',
      category: 'Revenue',
      amount: 8500,
      type: 'income',
      status: 'pending'
    },
    {
      id: 4,
      date: '2024-01-12',
      description: 'Marketing Campaign',
      category: 'Marketing',
      amount: -2200,
      type: 'expense',
      status: 'completed'
    },
    {
      id: 5,
      date: '2024-01-11',
      description: 'Equipment Purchase',
      category: 'Assets',
      amount: -5800,
      type: 'expense',
      status: 'completed'
    }
  ];

  const invoices = [
    {
      id: 'INV-001',
      client: 'TechCorp Inc.',
      amount: 15000,
      dueDate: '2024-02-15',
      status: 'sent',
      issueDate: '2024-01-15'
    },
    {
      id: 'INV-002',
      client: 'Digital Solutions',
      amount: 8500,
      dueDate: '2024-02-10',
      status: 'paid',
      issueDate: '2024-01-10'
    },
    {
      id: 'INV-003',
      client: 'StartupXYZ',
      amount: 3200,
      dueDate: '2024-02-20',
      status: 'overdue',
      issueDate: '2024-01-05'
    }
  ];

  const budgets = [
    {
      category: 'Marketing',
      allocated: 15000,
      spent: 12500,
      remaining: 2500
    },
    {
      category: 'Operations',
      allocated: 25000,
      spent: 22000,
      remaining: 3000
    },
    {
      category: 'Technology',
      allocated: 20000,
      spent: 18500,
      remaining: 1500
    },
    {
      category: 'Personnel',
      allocated: 45000,
      spent: 45000,
      remaining: 0
    }
  ];

  useEffect(() => {
    const cleanup = () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
        revenueChartInstance.current = null;
      }
      if (expenseChartInstance.current) {
        expenseChartInstance.current.destroy();
        expenseChartInstance.current = null;
      }
      if (cashFlowChartInstance.current) {
        cashFlowChartInstance.current.destroy();
        cashFlowChartInstance.current = null;
      }
    };

    // Revenue Chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext('2d');
      revenueChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [85000, 92000, 78000, 105000, 118000, 125000],
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    // Expense Chart
    if (expenseChartRef.current) {
      const ctx = expenseChartRef.current.getContext('2d');
      expenseChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Operations', 'Marketing', 'Technology', 'Personnel'],
          datasets: [{
            data: [22000, 12500, 18500, 45000],
            backgroundColor: ['#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Cash Flow Chart
    if (cashFlowChartRef.current) {
      const ctx = cashFlowChartRef.current.getContext('2d');
      cashFlowChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Inflow',
              data: [25000, 18000, 32000, 28000],
              backgroundColor: '#059669'
            },
            {
              label: 'Outflow',
              data: [-15000, -22000, -18000, -20000],
              backgroundColor: '#EF4444'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    return cleanup;
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success text-white';
      case 'sent': return 'bg-info text-white';
      case 'overdue': return 'bg-danger text-white';
      case 'completed': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      default: return 'bg-neutral-200 text-neutral-700';
    }
  };

  const getBudgetColor = (percentage) => {
    if (percentage >= 90) return 'bg-danger';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const handleCreateInvoice = () => {
    showNotification('success', 'Invoice Created', 'New invoice has been created successfully.');
  };

  const handleExportReport = (format) => {
    let data, filename, title;
    
    switch (activeTab) {
      case 'transactions':
        data = getExportData('financial-transactions', transactions);
        filename = 'financial-transactions';
        title = 'Financial Transactions Report';
        break;
      case 'invoices':
        data = getExportData('financial-invoices', invoices);
        filename = 'financial-invoices';
        title = 'Financial Invoices Report';
        break;
      case 'budgets':
        data = budgets.map(budget => ({
          Category: budget.category,
          Allocated: `$${budget.allocated.toLocaleString()}`,
          Spent: `$${budget.spent.toLocaleString()}`,
          Remaining: `$${budget.remaining.toLocaleString()}`,
          'Usage (%)': `${((budget.spent / budget.allocated) * 100).toFixed(1)}%`
        }));
        filename = 'financial-budgets';
        title = 'Financial Budgets Report';
        break;
      default:
        data = [
          { Metric: 'Total Revenue', Value: `$${financialData.revenue.toLocaleString()}` },
          { Metric: 'Total Expenses', Value: `$${financialData.expenses.toLocaleString()}` },
          { Metric: 'Net Profit', Value: `$${financialData.profit.toLocaleString()}` },
          { Metric: 'Cash Flow', Value: `$${financialData.cashFlow.toLocaleString()}` },
          { Metric: 'Accounts Receivable', Value: `$${financialData.accounts.receivable.toLocaleString()}` },
          { Metric: 'Accounts Payable', Value: `$${financialData.accounts.payable.toLocaleString()}` }
        ];
        filename = 'financial-overview';
        title = 'Financial Overview Report';
    }

    if (format === 'csv') {
      exportToCSV(data, filename);
      showNotification('success', 'Export Complete', 'Financial report exported to CSV successfully.');
    } else if (format === 'pdf') {
      exportToPDF(data, filename, title);
      showNotification('success', 'Export Complete', 'Financial report exported to PDF successfully.');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-pie' },
    { id: 'transactions', label: 'Transactions', icon: 'fas fa-exchange-alt' },
    { id: 'invoices', label: 'Invoices', icon: 'fas fa-file-invoice' },
    { id: 'budgets', label: 'Budgets', icon: 'fas fa-calculator' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Financial Management</h1>
          <p className="text-neutral-600 mt-1">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button 
            onClick={handleCreateInvoice}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>Create Invoice
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors flex items-center"
            >
              <i className="fas fa-download mr-2"></i>Export Report
              <i className="fas fa-chevron-down ml-2 text-sm"></i>
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleExportReport('csv');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <i className="fas fa-file-csv mr-3 text-green-600"></i>
                    Export as CSV
                  </button>
                  <button
                    onClick={() => {
                      handleExportReport('pdf');
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

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold text-success mt-2">${financialData.revenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <i className="fas fa-arrow-trend-up text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Expenses</p>
              <p className="text-2xl font-bold text-danger mt-2">${financialData.expenses.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-danger text-sm mr-1"></i>
                <span className="text-sm text-danger">+8.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-danger rounded-lg flex items-center justify-center">
              <i className="fas fa-arrow-trend-down text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Net Profit</p>
              <p className="text-2xl font-bold text-primary mt-2">${financialData.profit.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+18.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Cash Flow</p>
              <p className="text-2xl font-bold text-info mt-2">${financialData.cashFlow.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+5.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center">
              <i className="fas fa-water text-white text-xl"></i>
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
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Trend</h3>
                  <div className="chart-container">
                    <canvas ref={revenueChartRef}></canvas>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Expense Breakdown</h3>
                  <div className="chart-container">
                    <canvas ref={expenseChartRef}></canvas>
                  </div>
                </div>
              </div>

              {/* Cash Flow Chart */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Weekly Cash Flow</h3>
                <div className="chart-container">
                  <canvas ref={cashFlowChartRef}></canvas>
                </div>
              </div>

              {/* Accounts Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Accounts Receivable</h4>
                  <div className="text-2xl font-bold text-success">${financialData.accounts.receivable.toLocaleString()}</div>
                  <p className="text-sm text-neutral-600 mt-1">Outstanding invoices</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Accounts Payable</h4>
                  <div className="text-2xl font-bold text-warning">${financialData.accounts.payable.toLocaleString()}</div>
                  <p className="text-sm text-neutral-600 mt-1">Pending payments</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{transaction.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{transaction.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={transaction.amount > 0 ? 'text-success' : 'text-danger'}>
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary-dark">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-secondary hover:text-secondary-dark">
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border border-neutral-200 rounded-lg p-6 hover-lift">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">{invoice.id}</h3>
                      <p className="text-sm text-neutral-600">{invoice.client}</p>
                      <p className="text-xs text-neutral-500">Issued: {invoice.issueDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-neutral-900">${invoice.amount.toLocaleString()}</div>
                      <div className="text-sm text-neutral-500">Due: {invoice.dueDate}</div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                      <i className="fas fa-eye mr-1"></i>View
                    </button>
                    <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors text-sm">
                      <i className="fas fa-download mr-1"></i>Download
                    </button>
                    {invoice.status === 'sent' && (
                      <button className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                        <i className="fas fa-paper-plane mr-1"></i>Remind
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'budgets' && (
            <div className="space-y-6">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.allocated) * 100;
                return (
                  <div key={index} className="border border-neutral-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900">{budget.category}</h3>
                      <div className="text-right">
                        <div className="text-sm text-neutral-500">
                          ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-400">
                          ${budget.remaining.toLocaleString()} remaining
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${getBudgetColor(percentage)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-neutral-600">{percentage.toFixed(1)}% used</span>
                      <span className={`font-medium ${
                        percentage >= 90 ? 'text-danger' : 
                        percentage >= 75 ? 'text-warning' : 'text-success'
                      }`}>
                        {percentage >= 100 ? 'Over Budget' : 
                         percentage >= 90 ? 'Near Limit' : 'On Track'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;