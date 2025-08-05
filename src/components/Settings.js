import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';

const Settings = () => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [settings, setSettings] = useState({
    general: {
      companyName: 'ViroTech Enterprise',
      email: 'admin@virotech.com',
      timezone: 'UTC-5',
      language: 'en',
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      orderUpdates: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5'
    },
    api: {
      apiKey: 'vt_sk_1234567890abcdef',
      webhookUrl: 'https://api.virotech.com/webhooks',
      rateLimiting: true,
      apiVersion: 'v2.1'
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    showNotification('success', 'Settings Saved', 'Your settings have been successfully updated.');
  };

  const handleReset = () => {
    setSettings({
      general: {
        companyName: 'ViroTech Enterprise',
        email: 'admin@virotech.com',
        timezone: 'UTC-5',
        language: 'en',
        currency: 'USD'
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        orderUpdates: true,
        systemAlerts: true
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: '30',
        passwordExpiry: '90',
        loginAttempts: '5'
      },
      api: {
        apiKey: 'vt_sk_1234567890abcdef',
        webhookUrl: 'https://api.virotech.com/webhooks',
        rateLimiting: true,
        apiVersion: 'v2.1'
      }
    });
    showNotification('success', 'Settings Reset', 'All settings have been reset to default values.');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'api', label: 'API Settings', icon: 'fas fa-code' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition-colors"
          >
            <i className="fas fa-undo mr-2"></i>Reset to Default
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-save mr-2"></i>Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={settings.general.companyName}
                      onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.general.email}
                      onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="UTC-12">UTC-12</option>
                      <option value="UTC-8">UTC-8 (PST)</option>
                      <option value="UTC-5">UTC-5 (EST)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC+1">UTC+1 (CET)</option>
                      <option value="UTC+8">UTC+8 (CST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-neutral-200 last:border-b-0">
                      <div>
                        <div className="font-medium text-neutral-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'pushNotifications' && 'Receive push notifications in browser'}
                          {key === 'smsNotifications' && 'Receive SMS notifications on your phone'}
                          {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                          {key === 'orderUpdates' && 'Get notified about order status changes'}
                          {key === 'systemAlerts' && 'Receive system maintenance and security alerts'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <div>
                      <div className="font-medium text-neutral-900">Two-Factor Authentication</div>
                      <div className="text-sm text-neutral-500">Add an extra layer of security to your account</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Password Expiry (days)</label>
                      <input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Max Login Attempts</label>
                      <input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) => handleSettingChange('security', 'loginAttempts', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">API Configuration</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">API Key</label>
                    <div className="flex">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={settings.api.apiKey}
                        onChange={(e) => handleSettingChange('api', 'apiKey', e.target.value)}
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="px-3 py-2 bg-neutral-100 border border-l-0 border-neutral-300 rounded-r-lg hover:bg-neutral-200"
                      >
                        <i className={`fas ${showApiKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Webhook URL</label>
                    <input
                      type="url"
                      value={settings.api.webhookUrl}
                      onChange={(e) => handleSettingChange('api', 'webhookUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <div>
                      <div className="font-medium text-neutral-900">Rate Limiting</div>
                      <div className="text-sm text-neutral-500">Enable API rate limiting for security</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.api.rateLimiting}
                        onChange={(e) => handleSettingChange('api', 'rateLimiting', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">API Version</label>
                    <select
                      value={settings.api.apiVersion}
                      onChange={(e) => handleSettingChange('api', 'apiVersion', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="v1.0">v1.0 (Legacy)</option>
                      <option value="v2.0">v2.0</option>
                      <option value="v2.1">v2.1 (Latest)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-neutral-500">Version</div>
            <div className="font-medium text-neutral-900">v2.1.0</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Last Updated</div>
            <div className="font-medium text-neutral-900">May 15, 2023</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Environment</div>
            <div className="font-medium text-neutral-900">Production</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;