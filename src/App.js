import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Orders from './components/Orders';
import Settings from './components/Settings';
import Integrations from './components/Integrations';
import RealtimeMonitor from './components/RealtimeMonitor';
import CRM from './components/CRM';
import FinancialManagement from './components/FinancialManagement';
import SecurityCompliance from './components/SecurityCompliance';
import ComingSoon from './components/ComingSoon';
import NotificationSystem from './components/NotificationSystem';
import ModalSystem from './components/ModalSystem';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard-content');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard-content':
        return <Dashboard />;
      case 'realtime-content':
        return <RealtimeMonitor />;
      case 'analytics-content':
        return <Analytics />;
      case 'orders-content':
        return <Orders />;
      case 'integrations':
        return <Integrations />;
      case 'settings-content':
        return <Settings />;
      
      // Coming Soon sections
      case 'crm-content':
        return <CRM />;
      
      case 'finance-content':
        return <FinancialManagement />;
      
      case 'security-content':
        return <SecurityCompliance />;
      
      // Coming Soon sections for remaining modules
      case 'marketing-content':
        return <ComingSoon 
          title="Marketing Automation" 
          description="Powerful marketing tools and campaign management"
          icon="fas fa-bullhorn"
          color="secondary"
          features={[
            'Campaign Management',
            'Email Marketing',
            'Social Media Integration',
            'SEO Tools',
            'Content Management',
            'Lead Generation',
            'A/B Testing',
            'Marketing Analytics'
          ]}
          expectedDate="Q3 2024"
        />;
      
      case 'hr-content':
        return <ComingSoon 
          title="HR Management" 
          description="Complete human resources management system"
          icon="fas fa-users"
          color="info"
          features={[
            'Employee Directory',
            'Payroll System',
            'Performance Reviews',
            'Recruitment Tools',
            'Time Tracking',
            'Leave Management',
            'Training Programs',
            'Employee Analytics'
          ]}
          expectedDate="Q4 2024"
        />;
      
      case 'projects-content':
        return <ComingSoon 
          title="Project Management" 
          description="Comprehensive project planning and execution tools"
          icon="fas fa-tasks"
          color="primary"
          features={[
            'Project Overview',
            'Task Management',
            'Team Collaboration',
            'Time Tracking',
            'Gantt Charts',
            'Resource Planning',
            'Progress Monitoring',
            'Project Analytics'
          ]}
          expectedDate="Q2 2024"
        />;
      
      case 'communication-content':
        return <ComingSoon 
          title="Communication Center" 
          description="Unified communication and collaboration platform"
          icon="fas fa-comments"
          color="success"
          features={[
            'Internal Chat',
            'Video Conferencing',
            'Document Sharing',
            'Announcements',
            'Team Channels',
            'File Management',
            'Screen Sharing',
            'Meeting Scheduler'
          ]}
          expectedDate="Q3 2024"
        />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <NotificationProvider>
          <ModalProvider>
          <div className="App">
            {loading && <LoadingScreen />}
            
            <div className={`flex h-screen overflow-hidden main-layout ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <Sidebar
                collapsed={sidebarCollapsed}
                mobileOpen={mobileMenuOpen}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                setMobileMenuOpen={setMobileMenuOpen}
              />
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                  sidebarCollapsed={sidebarCollapsed}
                  setSidebarCollapsed={setSidebarCollapsed}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-6">
                  {renderActiveSection()}
                </main>
              </div>
            </div>
            
            <NotificationSystem />
            <ModalSystem />
          </div>
          </ModalProvider>
        </NotificationProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;