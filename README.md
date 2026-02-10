# MTB Maintenance Tracker

A comprehensive React-based web application for tracking mountain bike maintenance across multiple bikes. Built with professional maintenance schedules and AI-powered recommendations.
Version: 260209

## 🚴‍♂️ Features

### Multi-Bike Management
- **Add Multiple Bikes**: Manage unlimited bikes with individual tracking
- **Bike Types**: Support for Mountain, Gravel, and Hybrid bikes with type-specific maintenance schedules
- **Bike Configuration**: Track suspension settings (fork/shock pressure, clicks), tire PSI, and rider weight
- **Custom Theming**: Professional color scheme with Powder Blue, Sunshine Gold, and Navy Blue

### Comprehensive Maintenance Tracking
- **Professional Maintenance Schedules**: 22+ maintenance items for mountain bikes based on real-world professional maintenance checklists
- **Frequency-Based Organization**: Items grouped by maintenance frequency (After Every Ride, Weekly/Monthly, Quarterly, Semi-Annual/Annual)
- **Multiple Interval Types**: Track maintenance by rides, days, hours, or miles
- **Priority Levels**: High, medium, and low priority maintenance items
- **Status Tracking**: 
  - **Pending** (⏳ Due Soon): Items that need attention
  - **Completed** (✅ Completed): Recently completed maintenance
  - **Not Applicable** (N/A): Items not relevant to specific bikes (e.g., shock service for hardtails)
  - **Overdue** (🚨 Overdue): Past-due maintenance automatically flagged

### Smart Maintenance Management
- **Editable Last Performed Dates**: Click any maintenance date to update when work was completed
- **Automatic Status Calculation**: System automatically determines overdue items based on intervals and last performed dates
- **Parts Cost Tracking**: Track estimated costs for replacement parts and services
- **Detailed Notes**: Professional maintenance notes and guidance for each item
- **Category Icons**: Visual organization by drivetrain, brakes, suspension, wheels, tires, controls, frame, and safety

### Dashboard & Analytics
- **Fleet Overview**: View all bikes and their maintenance status at a glance
- **Due Soon Counter**: Track pending maintenance items across all bikes
- **High Priority Alerts**: Immediate visibility into critical maintenance needs
- **Bike-Specific Stats**: Individual maintenance counters per bike

### AI-Powered Recommendations
- **OpenAI Integration**: GPT-3.5-turbo powered maintenance recommendations
- **Bike-Specific Analysis**: AI analyzes your specific bike setup, usage patterns, and maintenance history
- **Personalized Advice**: Custom recommendations based on bike type, components, and riding conditions
- **Configuration Management**: Secure API key management via config file

### Data Management & Security
- **Local Storage**: All data persists locally in your browser
- **Export/Import**: Backup and restore your maintenance data via JSON
- **Version Migration**: Smart data migration preserves your settings during app updates
- **Auto-Backup**: Automatic data protection during development updates
- **Configuration Security**: API keys stored in gitignored config files

### Professional Maintenance Items Include:
- **Frequent Maintenance**: Drivetrain cleaning, bolt torque checks, battery levels
- **Seasonal Service**: Tire sealant, firmware updates, brake bleeding
- **Component Inspections**: Frame crack checks, spoke tension, rotor wear assessment
- **Major Services**: Fork/shock servicing, linkage bearing maintenance, full suspension overhauls
- **Wear Item Replacement**: Chains, brake pads, tires, cables based on mileage/wear indicators

## 🎨 Design Features

### Custom Color Theme
- **Powder Blue** (#0072CE): Primary actions and completed items
- **Sunshine Gold** (#FFB81C): Accent color and pending items
- **Navy Blue** (#0C2340): Primary text and navigation
- **Professional Typography**: Inter font family for clean, modern appearance

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clear bike switching and page navigation
- **Visual Status Indicators**: Color-coded priority levels and status badges
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessible Design**: Proper contrast ratios and keyboard navigation

## 🛠️ Technical Stack

- **React 18**: Modern functional components with hooks
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **React Router DOM**: Client-side routing for multi-page navigation
- **OpenAI API**: GPT-3.5-turbo integration for maintenance recommendations
- **Modern JavaScript**: ES6+ features including async/await and destructuring

## 📋 Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mtb-maintenance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up API key (optional, for AI recommendations):
   ```bash
   cp public/config.example.json public/config.json
   # Edit config.json and add your OpenAI API key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### API Key Setup
Create `public/config.json` with your OpenAI API key:
```json
{
  "openaiApiKey": "sk-your-openai-api-key-here"
}
```

### Custom Maintenance Items
Maintenance schedules are defined in `src/App.jsx` in the `createNewBike` function. Each bike type has its own maintenance template:
- **Mountain bikes**: 22 comprehensive maintenance items
- **Gravel bikes**: 5 essential maintenance items  
- **Hybrid bikes**: 4 basic maintenance items

## 📊 Usage

1. **Add Your First Bike**: Click "Add Bike" and enter your bike details
2. **Configure Settings**: Set up suspension pressures, tire PSI, and preferences
3. **Track Maintenance**: Mark items as completed, not applicable, or update last performed dates
4. **Get AI Recommendations**: Use the AI-powered maintenance advisor for personalized guidance
5. **Manage Multiple Bikes**: Add more bikes and switch between them easily
6. **Export Data**: Backup your maintenance history and settings

## 🎯 Maintenance Philosophy

This tracker follows professional bike maintenance principles:
- **Preventive Maintenance**: Stay ahead of issues with scheduled servicing
- **Component-Specific Care**: Different maintenance schedules for different bike types
- **Usage-Based Intervals**: Track maintenance by rides, time, or mileage as appropriate
- **Priority-Driven**: Focus on safety-critical items first
- **Cost Awareness**: Track parts costs for budgeting and planning

## 🔮 Future Enhancements

- **Cloud Sync**: Multi-device synchronization
- **Maintenance Reminders**: Email/push notification system
- **Service History**: Detailed maintenance logs and analytics
- **Parts Integration**: Direct links to replacement parts
- **Mechanic Network**: Connect with local bike shops
- **Photo Attachments**: Visual maintenance documentation

## 🤝 Contributing

This project was developed collaboratively with AI assistance to create a professional-grade maintenance tracking solution. The codebase follows React best practices and maintains clean, readable code structure.

## 📄 License

This project is available for personal and educational use.

---

Built with ❤️ for the mountain biking community. Keep your rides smooth and safe! 🚵‍♂️
