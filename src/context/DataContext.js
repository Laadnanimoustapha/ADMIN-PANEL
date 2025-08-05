import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: '#ORD-0001',
      customer: 'John Smith',
      product: 'MacBook Pro',
      amount: '2,499.00',
      status: 'Completed',
      date: 'May 15, 2023'
    },
    {
      id: '#ORD-0002',
      customer: 'Sarah Johnson',
      product: 'iPhone 15',
      amount: '999.00',
      status: 'Processing',
      date: 'May 14, 2023'
    },
    {
      id: '#ORD-0003',
      customer: 'Mike Wilson',
      product: 'iPad Air',
      amount: '599.00',
      status: 'Shipped',
      date: 'May 13, 2023'
    },
    {
      id: '#ORD-0004',
      customer: 'Emily Davis',
      product: 'AirPods Pro',
      amount: '249.00',
      status: 'Pending',
      date: 'May 12, 2023'
    },
    {
      id: '#ORD-0005',
      customer: 'David Brown',
      product: 'Apple Watch',
      amount: '399.00',
      status: 'Delivered',
      date: 'May 11, 2023'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalRevenue: 125430,
    totalOrders: 1247,
    activeCustomers: 892,
    conversionRate: 3.2,
    monthlyGrowth: 12.5,
    customerSatisfaction: 4.8
  });

  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 1247,
    pageViews: 8934,
    bounceRate: 32.1,
    avgSessionDuration: '3:42'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pageViews: prev.pageViews + Math.floor(Math.random() * 20),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `#ORD-${String(orders.length + 1).padStart(4, '0')}`,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrder = (orderId, updatedOrder) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updatedOrder } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const value = {
    orders,
    setOrders,
    analytics,
    setAnalytics,
    realtimeData,
    setRealtimeData,
    addOrder,
    updateOrder,
    deleteOrder
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};