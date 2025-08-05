import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const { analytics, realtimeData, orders } = useData();
  const revenueChartRef = useRef(null);
  const ordersChartRef = useRef(null);
  const trafficChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const ordersChartInstance = useRef(null);
  const trafficChartInstance = useRef(null);

  useEffect(() => {
    // Cleanup function to destroy existing charts
    const cleanup = () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
        revenueChartInstance.current = null;
      }
      if (ordersChartInstance.current) {
        ordersChartInstance.current.destroy();
        ordersChartInstance.current = null;
      }
      if (trafficChartInstance.current) {
        trafficChartInstance.current.destroy();
        trafficChartInstance.current = null;
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
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
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

    // Orders Chart
    if (ordersChartRef.current) {
      const ctx = ordersChartRef.current.getContext('2d');
      ordersChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Orders',
            data: [45, 52, 38, 65, 59, 80, 42],
            backgroundColor: '#059669',
            borderRadius: 4
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

    // Traffic Chart
    if (trafficChartRef.current) {
      const ctx = trafficChartRef.current.getContext('2d');
      trafficChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Social', 'Email', 'Search'],
          datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: ['#2563EB', '#059669', '#EA580C', '#9333EA'],
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

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'fas fa-dollar-sign',
      color: 'bg-success'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: 'fas fa-shopping-cart',
      color: 'bg-primary'
    },
    {
      title: 'Active Customers',
      value: analytics.activeCustomers.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
      icon: 'fas fa-users',
      color: 'bg-info'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      change: '-2.1%',
      changeType: 'negative',
      icon: 'fas fa-chart-line',
      color: 'bg-warning'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard Overview</h1>
          <p className="text-neutral-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-neutral-500">
            <i className="fas fa-clock mr-1"></i>
            Last updated: <span>2 minutes ago</span>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <i className="fas fa-download mr-2"></i>Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-danger'
                  }`}>
                    <i className={`fas ${
                      stat.changeType === 'positive' ? 'fa-arrow-up' : 'fa-arrow-down'
                    } mr-1`}></i>
                    {stat.change}
                  </span>
                  <span className="text-sm text-neutral-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-neutral-600 hover:text-primary">6M</button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded">1Y</button>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Weekly Orders</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-secondary text-white rounded">Week</button>
              <button className="px-3 py-1 text-sm text-neutral-600 hover:text-primary">Month</button>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={ordersChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
              <button className="text-sm text-primary hover:text-primary-dark">View all</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' ? 'bg-success bg-opacity-10 text-success' :
                        order.status === 'Processing' ? 'bg-warning bg-opacity-10 text-warning' :
                        order.status === 'Shipped' ? 'bg-info bg-opacity-10 text-info' :
                        order.status === 'Delivered' ? 'bg-success bg-opacity-10 text-success' :
                        'bg-neutral-100 text-neutral-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">${order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Traffic Sources</h3>
          <div className="chart-container">
            <canvas ref={trafficChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Real-time Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{realtimeData.activeUsers}</div>
            <div className="text-sm text-neutral-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{realtimeData.pageViews.toLocaleString()}</div>
            <div className="text-sm text-neutral-600">Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{realtimeData.bounceRate}%</div>
            <div className="text-sm text-neutral-600">Bounce Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info">{realtimeData.avgSessionDuration}</div>
            <div className="text-sm text-neutral-600">Avg. Session</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;