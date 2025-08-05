import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useNotification } from '../context/NotificationContext';
import Swal from 'sweetalert2';

const Orders = () => {
  const { orders, addOrder, updateOrder, deleteOrder } = useData();
  const { showModal } = useModal();
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddOrder = () => {
    const AddOrderForm = () => (
      <div className="text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Customer Name</label>
          <input 
            type="text" 
            id="customer-name" 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Product</label>
          <select 
            id="product-select" 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option>MacBook Pro</option>
            <option>iPhone 15</option>
            <option>iPad Air</option>
            <option>AirPods Pro</option>
            <option>Apple Watch</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Amount</label>
          <input 
            type="number" 
            id="order-amount" 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select 
            id="order-status" 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    );

    showModal('Add New Order', <AddOrderForm />, ['Create Order', 'Cancel'], () => {
      const customerName = document.getElementById('customer-name')?.value;
      const product = document.getElementById('product-select')?.value;
      const amount = document.getElementById('order-amount')?.value;
      const status = document.getElementById('order-status')?.value;

      if (customerName && product && amount) {
        addOrder({
          customer: customerName,
          product: product,
          amount: amount,
          status: status || 'Pending'
        });
        showNotification('success', 'Order Created', 'New order has been successfully created.');
      }
    });
  };

  const handleEditOrder = (order) => {
    const EditOrderForm = () => (
      <div className="text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Customer Name</label>
          <input 
            type="text" 
            id="edit-customer-name" 
            defaultValue={order.customer}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Product</label>
          <input 
            type="text" 
            id="edit-product" 
            defaultValue={order.product}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Amount</label>
          <input 
            type="number" 
            id="edit-amount" 
            defaultValue={order.amount}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select 
            id="edit-status" 
            defaultValue={order.status}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    );

    showModal('Edit Order', <EditOrderForm />, ['Update Order', 'Cancel'], () => {
      const customerName = document.getElementById('edit-customer-name')?.value;
      const product = document.getElementById('edit-product')?.value;
      const amount = document.getElementById('edit-amount')?.value;
      const status = document.getElementById('edit-status')?.value;

      if (customerName && product && amount) {
        updateOrder(order.id, {
          customer: customerName,
          product: product,
          amount: amount,
          status: status
        });
        showNotification('success', 'Order Updated', 'Order has been successfully updated.');
      }
    });
  };

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId);
        showNotification('success', 'Order Deleted', 'Order has been successfully deleted.');
      }
    });
  };

  const handleViewOrder = (order) => {
    const OrderDetails = () => (
      <div className="text-left space-y-3">
        <div><strong>Order ID:</strong> {order.id}</div>
        <div><strong>Customer:</strong> {order.customer}</div>
        <div><strong>Product:</strong> {order.product}</div>
        <div><strong>Amount:</strong> ${order.amount}</div>
        <div><strong>Status:</strong> {order.status}</div>
        <div><strong>Date:</strong> {order.date}</div>
      </div>
    );

    showModal('Order Details', <OrderDetails />, ['Close']);
  };

  const exportToCSV = () => {
    const csvData = filteredOrders.map(order => [
      order.id,
      order.customer,
      order.product,
      order.amount,
      order.status,
      order.date
    ]);

    // Add headers
    csvData.unshift(['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date']);

    // Convert to CSV string
    const csvString = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    // Create and download file
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'virotech-orders.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('success', 'CSV Exported', 'Orders data has been downloaded successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Order Management System</h1>
          <p className="text-neutral-600 mt-1">Comprehensive order tracking and fulfillment management</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
          >
            <i className="fas fa-download mr-2"></i>Export Orders
          </button>
          <button 
            onClick={handleAddOrder}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>New Order
          </button>
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
                placeholder="Search orders, customers, products..."
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' || order.status === 'Delivered' ? 'bg-success bg-opacity-10 text-success' :
                      order.status === 'Processing' ? 'bg-warning bg-opacity-10 text-warning' :
                      order.status === 'Shipped' ? 'bg-info bg-opacity-10 text-info' :
                      order.status === 'Cancelled' ? 'bg-danger bg-opacity-10 text-danger' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">${order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-primary hover:text-primary-dark"
                        title="View Order"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="text-warning hover:text-orange-600"
                        title="Edit Order"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-danger hover:text-red-700"
                        title="Delete Order"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-4xl text-neutral-400 mb-4"></i>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No orders found</h3>
            <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="text-sm text-neutral-500">
              Showing 1 to {Math.min(10, filteredOrders.length)} of {filteredOrders.length} entries
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50">Previous</button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50">2</button>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50">3</button>
              <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;