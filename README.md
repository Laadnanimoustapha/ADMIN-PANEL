# ViroTech Enterprise Dashboard - React Version

[![Support Palestine](https://img.shields.io/badge/Support-Palestine-000000?labelColor=007A3D&color=CE1126)](#support-palestine)
[![Free Palestine](https://img.shields.io/badge/Free-Palestine-CE1126?labelColor=000000&color=007A3D)](#support-palestine)


A comprehensive React-based admin dashboard with advanced business intelligence features, converted from the original HTML version while maintaining the exact same styling and UI.

## Features

- **Dashboard Overview**: Real-time analytics, KPI cards, and interactive charts
- **Order Management**: Complete CRUD operations for orders with filtering and search
- **Advanced Analytics**: Performance metrics, conversion funnels, and business insights
- **Settings Management**: Comprehensive settings with tabs for different categories
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Notification System**: Toast notifications for user feedback
- **Modal System**: Reusable modal components for forms and confirmations
- **Export Functionality**: CSV, PDF, and Excel export capabilities
- **Real-time Updates**: Live data updates and monitoring

## Technology Stack

- **React 18**: Latest React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Chart.js**: Interactive charts and data visualization
- **SweetAlert2**: Beautiful alert dialogs
- **Context API**: State management for data, notifications, and modals
- **Font Awesome**: Icon library
- **Export Libraries**: jsPDF, html2canvas, xlsx for data export

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd "c:\Users\pc\Desktop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Analytics.js          # Advanced analytics dashboard
│   ├── Dashboard.js          # Main dashboard with KPIs and charts
│   ├── Header.js             # Top navigation header
│   ├── LoadingScreen.js      # Initial loading screen
│   ├── ModalSystem.js        # Modal management component
│   ├── NotificationSystem.js # Toast notification system
│   ├── Orders.js             # Order management interface
│   ├── Settings.js           # Settings management
│   └── Sidebar.js            # Navigation sidebar
├── context/
│   ├── DataContext.js        # Data state management
│   ├── ModalContext.js       # Modal state management
│   └── NotificationContext.js # Notification state management
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── index.css                 # Global styles and Tailwind imports
```

## Key Features Converted from HTML

### 1. **Exact UI Preservation**
- All original styling maintained using Tailwind CSS
- Custom CSS classes preserved in index.css
- Same color scheme, animations, and visual effects
- Responsive design with mobile-first approach

### 2. **Component Architecture**
- Modular React components for each major section
- Context API for state management instead of global variables
- Reusable components for modals and notifications
- Clean separation of concerns

### 3. **Interactive Features**
- **Dashboard**: Real-time data updates, interactive charts
- **Orders**: Full CRUD operations with search and filtering
- **Analytics**: Advanced charts with performance metrics
- **Settings**: Tabbed interface with form validation
- **Export**: CSV, PDF, and Excel export functionality

### 4. **State Management**
- **DataContext**: Manages orders, analytics, and real-time data
- **NotificationContext**: Handles toast notifications
- **ModalContext**: Manages modal dialogs and forms

### 5. **Responsive Design**
- Mobile-optimized sidebar with overlay
- Responsive grid layouts
- Touch-friendly interface elements
- Adaptive navigation

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## Customization

### Adding New Components
1. Create component in `src/components/`
2. Add to main App.js routing
3. Update sidebar navigation in Sidebar.js

### Modifying Styles
- Edit `tailwind.config.js` for theme customization
- Add custom CSS to `src/index.css`
- Use Tailwind utility classes for styling

### Adding New Data
- Update context providers in `src/context/`
- Add new state management as needed
- Implement data persistence if required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- React.memo for component optimization
- Lazy loading for charts and heavy components
- Efficient state updates with Context API
- Optimized bundle size with tree shaking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support


For support and questions, please contact the development team or create an issue in the repository.
