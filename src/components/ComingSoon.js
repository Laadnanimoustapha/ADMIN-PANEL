import React from 'react';

const ComingSoon = ({ 
  title, 
  description, 
  icon, 
  features = [], 
  expectedDate = "Q2 2024",
  color = "primary" 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary',
      text: 'text-primary',
      bgLight: 'bg-primary bg-opacity-10',
      border: 'border-primary'
    },
    secondary: {
      bg: 'bg-secondary',
      text: 'text-secondary',
      bgLight: 'bg-secondary bg-opacity-10',
      border: 'border-secondary'
    },
    success: {
      bg: 'bg-success',
      text: 'text-success',
      bgLight: 'bg-success bg-opacity-10',
      border: 'border-success'
    },
    warning: {
      bg: 'bg-warning',
      text: 'text-warning',
      bgLight: 'bg-warning bg-opacity-10',
      border: 'border-warning'
    },
    info: {
      bg: 'bg-info',
      text: 'text-info',
      bgLight: 'bg-info bg-opacity-10',
      border: 'border-info'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
          <p className="text-neutral-600 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${currentColor.bgLight} ${currentColor.text}`}>
            Coming Soon
          </span>
        </div>
      </div>

      {/* Main Coming Soon Card */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="text-center py-16 px-8">
          <div className={`w-24 h-24 ${currentColor.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <i className={`${icon} text-white text-4xl`}></i>
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            {title} Module Coming Soon
          </h2>
          
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you an amazing {title.toLowerCase()} experience. 
            This powerful module will provide comprehensive tools and insights to streamline your workflow.
          </p>

          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${currentColor.text}`}>100%</div>
              <div className="text-sm text-neutral-500">Designed</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${currentColor.text}`}>75%</div>
              <div className="text-sm text-neutral-500">Developed</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${currentColor.text}`}>50%</div>
              <div className="text-sm text-neutral-500">Tested</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button className={`px-6 py-3 ${currentColor.bg} text-white rounded-lg hover:opacity-90 transition-opacity`}>
              <i className="fas fa-bell mr-2"></i>
              Notify Me When Ready
            </button>
            <button className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
              <i className="fas fa-envelope mr-2"></i>
              Request Demo
            </button>
          </div>
        </div>
      </div>

      {/* Expected Features */}
      {features.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Expected Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-lg">
                <div className={`w-8 h-8 ${currentColor.bgLight} rounded-lg flex items-center justify-center`}>
                  <i className={`fas fa-check ${currentColor.text} text-sm`}></i>
                </div>
                <span className="text-sm font-medium text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Development Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 ${currentColor.bg} rounded-full`}></div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">Design & Planning</div>
              <div className="text-sm text-neutral-500">Completed</div>
            </div>
            <div className="text-sm text-success font-medium">✓ Done</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 ${currentColor.bg} rounded-full animate-pulse`}></div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">Development</div>
              <div className="text-sm text-neutral-500">In Progress</div>
            </div>
            <div className="text-sm text-warning font-medium">⏳ 75%</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">Testing & QA</div>
              <div className="text-sm text-neutral-500">Upcoming</div>
            </div>
            <div className="text-sm text-neutral-500 font-medium">⏳ Pending</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">Launch</div>
              <div className="text-sm text-neutral-500">Expected {expectedDate}</div>
            </div>
            <div className="text-sm text-neutral-500 font-medium">📅 {expectedDate}</div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className={`${currentColor.bgLight} rounded-xl border ${currentColor.border} border-opacity-20 p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${currentColor.text}`}>Stay Updated</h3>
            <p className="text-neutral-600 mt-1">
              Get notified when {title} module is ready for launch
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className={`px-4 py-2 ${currentColor.bg} text-white rounded-lg hover:opacity-90 transition-opacity`}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;