import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import Chart from 'chart.js/auto';

const RealtimeMonitor = () => {
  const { realtimeData } = useData();
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 34
  });

  const trafficChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const trafficChartInstance = useRef(null);
  const performanceChartInstance = useRef(null);

  // Real-time data simulation
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(30, Math.min(95, prev.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(5, Math.min(80, prev.network + (Math.random() - 0.5) * 15))
      }));

      // Generate random alerts
      if (Math.random() < 0.1) {
        const alertTypes = ['High CPU Usage', 'Memory Warning', 'Network Spike', 'Disk Space Low'];
        const newAlert = {
          id: Date.now(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          timestamp: new Date().toLocaleTimeString(),
          message: 'System metric exceeded threshold'
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Initialize charts
  useEffect(() => {
    const cleanup = () => {
      if (trafficChartInstance.current) {
        trafficChartInstance.current.destroy();
        trafficChartInstance.current = null;
      }
      if (performanceChartInstance.current) {
        performanceChartInstance.current.destroy();
        performanceChartInstance.current = null;
      }
    };

    // Traffic Chart
    if (trafficChartRef.current) {
      const ctx = trafficChartRef.current.getContext('2d');
      trafficChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({length: 20}, (_, i) => `${i}s`),
          datasets: [{
            label: 'Active Users',
            data: Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 50),
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
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

    // Performance Chart
    if (performanceChartRef.current) {
      const ctx = performanceChartRef.current.getContext('2d');
      performanceChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['CPU', 'Memory', 'Disk', 'Network'],
          datasets: [{
            data: [systemMetrics.cpu, systemMetrics.memory, systemMetrics.disk, systemMetrics.network],
            backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'],
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

    return cleanup;
  }, [systemMetrics]);

  const getMetricColor = (value) => {
    if (value > 80) return 'text-danger';
    if (value > 60) return 'text-warning';
    return 'text-success';
  };

  const getMetricBg = (value) => {
    if (value > 80) return 'bg-danger';
    if (value > 60) return 'bg-warning';
    return 'bg-success';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-danger bg-opacity-10 text-danger border-danger';
      case 'medium': return 'bg-warning bg-opacity-10 text-warning border-warning';
      case 'low': return 'bg-info bg-opacity-10 text-info border-info';
      default: return 'bg-neutral-100 text-neutral-600 border-neutral-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Real-time System Monitor</h1>
          <p className="text-neutral-600 mt-1">Live monitoring of system performance and user activity</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-success animate-pulse' : 'bg-neutral-400'}`}></div>
            <span className="text-sm text-neutral-600">
              {isMonitoring ? 'Live Monitoring' : 'Monitoring Paused'}
            </span>
          </div>
          <button 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isMonitoring 
                ? 'bg-danger text-white hover:bg-red-600' 
                : 'bg-success text-white hover:bg-green-600'
            }`}
          >
            <i className={`fas ${isMonitoring ? 'fa-pause' : 'fa-play'} mr-2`}></i>
            {isMonitoring ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Users</p>
              <p className="text-2xl font-bold text-primary mt-2">{realtimeData.activeUsers}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+5.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Page Views</p>
              <p className="text-2xl font-bold text-secondary mt-2">{realtimeData.pageViews.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+12.8%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <i className="fas fa-eye text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-warning mt-2">{realtimeData.bounceRate}%</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-down text-success text-sm mr-1"></i>
                <span className="text-sm text-success">-2.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg. Session</p>
              <p className="text-2xl font-bold text-info mt-2">{realtimeData.avgSessionDuration}</p>
              <div className="flex items-center mt-2">
                <i className="fas fa-arrow-up text-success text-sm mr-1"></i>
                <span className="text-sm text-success">+8.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(systemMetrics).map(([key, value]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-600 uppercase">{key}</h3>
              <span className={`text-sm font-semibold ${getMetricColor(value)}`}>
                {Math.round(value)}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(value)}`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Traffic */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Live Traffic</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-neutral-600">Live</span>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={trafficChartRef}></canvas>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">System Performance</h3>
          <div className="chart-container">
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">System Alerts</h3>
              <button className="text-sm text-primary hover:text-primary-dark">Clear All</button>
            </div>
          </div>
          <div className="p-6">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-shield-alt text-4xl text-success mb-4"></i>
                <p className="text-neutral-500">All systems running smoothly</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{alert.type}</div>
                        <div className="text-xs opacity-75">{alert.message}</div>
                      </div>
                      <div className="text-xs opacity-75">{alert.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">Live Activity Feed</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm text-neutral-900">New user registered</div>
                  <div className="text-xs text-neutral-500">2 seconds ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm text-neutral-900">Order #ORD-1234 completed</div>
                  <div className="text-xs text-neutral-500">15 seconds ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm text-neutral-900">Payment processed</div>
                  <div className="text-xs text-neutral-500">32 seconds ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-info rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm text-neutral-900">Database backup completed</div>
                  <div className="text-xs text-neutral-500">1 minute ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm text-neutral-900">Email campaign sent</div>
                  <div className="text-xs text-neutral-500">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeMonitor;