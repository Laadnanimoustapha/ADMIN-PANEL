import React, { useState } from 'react';

const Sidebar = ({ collapsed, mobileOpen, activeSection, setActiveSection, setMobileMenuOpen }) => {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: 'dashboard-content',
      icon: 'fas fa-tachometer-alt',
      label: 'Dashboard'
    },
    {
      id: 'realtime-content',
      icon: 'fas fa-chart-line',
      label: 'Real-time Monitor'
    },
    {
      id: 'analytics-content',
      icon: 'fas fa-chart-bar',
      label: 'Business Intelligence'
    },
    {
      id: 'crm-content',
      icon: 'fas fa-handshake',
      label: 'Customer Relations'
    },
    {
      id: 'orders-content',
      icon: 'fas fa-shopping-cart',
      label: 'E-Commerce Hub'
    },
    {
      id: 'finance-content',
      icon: 'fas fa-chart-pie',
      label: 'Financial Management'
    },
    {
      id: 'marketing-content',
      icon: 'fas fa-bullhorn',
      label: 'Marketing Automation'
    },
    {
      id: 'hr-content',
      icon: 'fas fa-users',
      label: 'HR Management'
    },
    {
      id: 'projects-content',
      icon: 'fas fa-tasks',
      label: 'Project Management'
    },
    {
      id: 'communication-content',
      icon: 'fas fa-comments',
      label: 'Communication Center'
    },
    {
      id: 'security-content',
      icon: 'fas fa-shield-alt',
      label: 'Security & Compliance'
    },
    {
      id: 'integrations',
      icon: 'fas fa-plug',
      label: 'Integrations'
    },
    {
      id: 'settings-content',
      icon: 'fas fa-cog',
      label: 'Settings'
    }
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          className="mobile-overlay md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`
        ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} 
        sidebar-transition bg-white shadow-md flex flex-col
        ${mobileOpen ? 'mobile-open' : ''}
        md:relative fixed inset-y-0 left-0 z-50
      `}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
              <i className="fas fa-rocket text-white text-lg"></i>
            </div>
            {!collapsed && (
              <div>
                <div className="font-bold text-lg text-neutral-800">ViroTech</div>
                <div className="text-xs text-neutral-500 -mt-1">BY LAADNANI MUSTAPHA</div>
              </div>
            )}
          </div>
          <button 
            className="text-neutral-500 hover:text-neutral-700 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {collapsed ? '' : 'Main'}
            </div>
            
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  sidebar-nav-link flex items-center space-x-3 px-3 py-2 rounded-md w-full text-left hover-lift
                  ${activeSection === item.id 
                    ? 'bg-primary text-white' 
                    : 'text-neutral-700 hover:bg-neutral-100'
                  }
                `}
              >
                <i className={`${item.icon} w-5 text-center`}></i>
                {!collapsed && <span className="sidebar-text">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
        

      </aside>
    </>
  );
};


export default Sidebar;
