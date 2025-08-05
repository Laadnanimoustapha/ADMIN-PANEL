import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const { analytics } = useData();
  const salesChartRef = useRef(null);
  const customerChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const conversionChartRef = useRef(null);
  const salesChartInstance = useRef(null);
  const customerChartInstance = useRef(null);
  const performanceChartInstance = useRef(null);
  const conversionChartInstance = useRef(null);

  useEffect(() => {
    // Cleanup function to destroy existing charts
    const cleanup = () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
        salesChartInstance.current = null;
      }
      if (customerChartInstance.current) {
        customerChartInstance.current.destroy();
        customerChartInstance.current = null;
      }
      if (performanceChartInstance.current) {
        performanceChartInstance.current.destroy();
        performanceChartInstance.current = null;
      }
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
        conversionChartInstance.current = null;
      }
    };

    // Sales Performance Chart
    if (salesChartRef.current) {
      const ctx = salesChartRef.current.getContext('2d');
      salesChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue',
              data: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 78000, 82000, 85000, 92000],
              borderColor: '#2563EB',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Profit',
              data: [15000, 18000, 16000, 22000, 19000, 25000, 28000, 26000, 31000, 34000, 36000, 40000],
              borderColor: '#059669',
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              tension: 0.4,
              fill: true
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

    // Customer Acquisition Chart
    if (customerChartRef.current) {
      const ctx = customerChartRef.current.getContext('2d');
      customerChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'New Customers',
              data: [245, 312, 289, 356],
              backgroundColor: '#2563EB',
              borderRadius: 4
            },
            {
              label: 'Returning Customers',
              data: [189, 234, 267, 298],
              backgroundColor: '#059669',
              borderRadius: 4
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

    // Performance Metrics Chart
    if (performanceChartRef.current) {
      const ctx = performanceChartRef.current.getContext('2d');
      performanceChartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Sales', 'Marketing', 'Customer Service', 'Product Quality', 'Innovation', 'Efficiency'],
          datasets: [{
            label: 'Current Performance',
            data: [85, 78, 92, 88, 76, 82],
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            pointBackgroundColor: '#2563EB'
          }]
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
            r: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    }

    // Conversion Funnel Chart
    if (conversionChartRef.current) {
      const ctx = conversionChartRef.current.getContext('2d');
      conversionChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Converted', 'Abandoned Cart', 'Browsing', 'Bounced'],
          datasets: [{
            data: [25, 15, 35, 25],
            backgroundColor: ['#059669', '#EA580C', '#2563EB', '#DC2626'],
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

    // Return cleanup function
    return cleanup;
  }, []);

  const kpiCards = [
    {
      title: 'Monthly Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'fas fa-dollar-sign',
      color: 'bg-success'
    },
    {
      title: 'Customer Acquisition',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'fas fa-user-plus',
      color: 'bg-primary'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      change: '-2.1%',
      changeType: 'negative',
      icon: 'fas fa-chart-line',
      color: 'bg-warning'
    },
    {
      title: 'Customer Satisfaction',
      value: `${analytics.customerSatisfaction}/5.0`,
      change: '+0.3',
      changeType: 'positive',
      icon: 'fas fa-star',
      color: 'bg-info'
    }
  ];

  const topProducts = [
    { name: 'MacBook Pro', sales: 245, revenue: '$612,500', growth: '+15%' },
    { name: 'iPhone 15', sales: 189, revenue: '$188,811', growth: '+8%' },
    { name: 'iPad Air', sales: 156, revenue: '$93,444', growth: '+12%' },
    { name: 'AirPods Pro', sales: 134, revenue: '$33,366', growth: '+5%' },
    { name: 'Apple Watch', sales: 98, revenue: '$39,102', growth: '+18%' }
  ];

  const trafficSources = [
    { source: 'Google', visits: 2500, revenue: '$5,000', percentage: 35 },
    { source: 'Facebook', visits: 1800, revenue: '$3,600', percentage: 25 },
    { source: 'Direct', visits: 1200, revenue: '$2,400', percentage: 17 },
    { source: 'Twitter', visits: 900, revenue: '$1,800', percentage: 13 },
    { source: 'LinkedIn', visits: 700, revenue: '$1,400', percentage: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Advanced Analytics Dashboard</h1>
          <p className="text-neutral-600 mt-1">Comprehensive business intelligence and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors">
            <i className="fas fa-sync-alt mr-2"></i>Refresh Data
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <i className="fas fa-download mr-2"></i>Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-2">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    kpi.changeType === 'positive' ? 'text-success' : 'text-danger'
                  }`}>
                    <i className={`fas ${
                      kpi.changeType === 'positive' ? 'fa-arrow-up' : 'fa-arrow-down'
                    } mr-1`}></i>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-neutral-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                <i className={`${kpi.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Sales Performance</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-neutral-600 hover:text-primary">6M</button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded">1Y</button>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={salesChartRef}></canvas>
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Customer Acquisition</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-secondary text-white rounded">Quarterly</button>
              <button className="px-3 py-1 text-sm text-neutral-600 hover:text-primary">Monthly</button>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={customerChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Performance Metrics</h3>
          <div className="chart-container">
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Conversion Funnel</h3>
          <div className="chart-container">
            <canvas ref={conversionChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Data Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">Top Performing Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium text-neutral-900">{product.name}</div>
                    <div className="text-sm text-neutral-500">{product.sales} sales</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-neutral-900">{product.revenue}</div>
                    <div className="text-sm text-success">{product.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">Traffic Sources</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Visits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {trafficSources.map((source, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700">{source.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{source.visits.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{source.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-neutral-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-neutral-500">{source.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
            <div className="flex items-center mb-3">
              <i className="fas fa-arrow-up text-success mr-2"></i>
              <h4 className="font-semibold text-success">Revenue Growth</h4>
            </div>
            <p className="text-sm text-neutral-700">Revenue increased by 12.5% this month, driven by strong MacBook Pro sales.</p>
          </div>
          <div className="p-4 bg-warning bg-opacity-10 rounded-lg border border-warning border-opacity-20">
            <div className="flex items-center mb-3">
              <i className="fas fa-exclamation-triangle text-warning mr-2"></i>
              <h4 className="font-semibold text-warning">Conversion Rate</h4>
            </div>
            <p className="text-sm text-neutral-700">Conversion rate dropped by 2.1%. Consider optimizing checkout process.</p>
          </div>
          <div className="p-4 bg-info bg-opacity-10 rounded-lg border border-info border-opacity-20">
            <div className="flex items-center mb-3">
              <i className="fas fa-lightbulb text-info mr-2"></i>
              <h4 className="font-semibold text-info">Opportunity</h4>
            </div>
            <p className="text-sm text-neutral-700">Social media traffic shows high engagement. Increase marketing budget.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;