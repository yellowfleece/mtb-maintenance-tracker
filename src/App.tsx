// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO: Remove @ts-nocheck in Phase 2 after component extraction and proper typing
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Bike data structure and mock data
const createNewBike = (name = '', brand = '', model = '', year = new Date().getFullYear(), type = 'mountain') => {
  const bikeId = Date.now().toString()
  
  // Get maintenance items template based on bike type
  const getMaintenanceItemsForType = (bikeType) => {
    if (bikeType === 'mountain') {
      // Mountain bike maintenance items (from your spreadsheet)
      const items = [
        // Frequent/Regular Maintenance
        { name: 'Clean & Lube Drivetrain', category: 'drivetrain', interval: 3, intervalType: 'rides', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: 'Especially in wet/muddy conditions' },
        { name: 'Battery Levels (Wireless Components)', category: 'controls', interval: 30, intervalType: 'days', priority: 'low', status: 'pending', lastPerformed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'AXS/Dropper/etc' },
        { name: 'Tighten All Bolts (Torque)', category: 'safety', interval: 30, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Use torque wrench and manufacturer guidance' },
        
        // 2-3 Month Items
        { name: 'Add Tire Sealant', category: 'tires', interval: 75, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 15, notes: '' },
        { name: 'Firmware Update (Electronic Components)', category: 'controls', interval: 120, intervalType: 'days', priority: 'low', status: 'pending', lastPerformed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Use the app!' },
        
        // Quarterly Items
        { name: 'Inspect Dropper Cable', category: 'controls', interval: 90, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Check for slow return' },
        { name: 'Check Spoke Tension', category: 'wheels', interval: 90, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: '' },
        { name: 'True Wheels', category: 'wheels', interval: 90, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 25, notes: 'As needed / Check spoke tension' },
        { name: 'Check Brake Rotor Wear', category: 'brakes', interval: 120, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Replace at 1.8mm thickness' },
        { name: 'Inspect Frame for Cracks/Damage', category: 'frame', interval: 90, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'After crashes / quarterly' },
        { name: 'Check Torque on Suspension Bolts', category: 'suspension', interval: 90, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Loctite may be needed' },
        
        // 6 Month Items
        { name: 'Inspect & Grease Crankset', category: 'drivetrain', interval: 180, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 15, notes: 'Pull cranks + clean BB' },
        { name: 'Inspect & Grease Linkage Bearings', category: 'frame', interval: 180, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 25, notes: '' },
        { name: 'Bleed Brakes', category: 'brakes', interval: 180, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 20, notes: 'Follow SOP / YT How-to - or when mushy' },
        
        // 6-12 Month Items
        { name: 'Grease Headset', category: 'frame', interval: 270, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: '' },
        
        // Service Hour Items
        { name: 'Fork Lower Service', category: 'suspension', interval: 50, intervalType: 'hours', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 75, notes: 'Follow SOP / YT How-to' },
        { name: 'Shock Air Can Service', category: 'suspension', interval: 75, intervalType: 'hours', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 50, notes: '' },
        
        // Mileage/Wear Items
        { name: 'Replace Chain', category: 'drivetrain', interval: 650, intervalType: 'miles', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 65, notes: 'Every 0.5% wear (~500-800mi)' },
        { name: 'Replace Brake Pads', category: 'brakes', interval: 1000, intervalType: 'miles', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 45, notes: 'When <1.5mm or noisy - Validate organic or metallic' },
        { name: 'Replace Tires', category: 'tires', interval: 1500, intervalType: 'miles', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 120, notes: 'When worn or damaged - Check casing + tread' },
        
        // Annual Items
        { name: 'Replace Derailleur Cable', category: 'drivetrain', interval: 365, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 30, notes: 'Yearly / as needed' },
        { name: 'Full Suspension Service', category: 'suspension', interval: 100, intervalType: 'hours', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 200, notes: 'Annually / 100+ hrs' }
      ]
      
      // Add unique IDs to each item
      return items.map((item, index) => ({
        ...item,
        id: `${bikeId}-${index + 1}`
      }))
    } else if (bikeType === 'gravel') {
      // Gravel bike maintenance items
      const items = [
        { name: 'Clean & Lube Drivetrain', category: 'drivetrain', interval: 5, intervalType: 'rides', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: 'Road/gravel conditions - less frequent than MTB' },
        { name: 'Check Tire Pressure', category: 'tires', interval: 7, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Higher pressures for road/gravel' },
        { name: 'Brake Pad Check', category: 'brakes', interval: 1000, intervalType: 'miles', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 35, notes: 'When <1.5mm or noisy' },
        { name: 'Chain Replacement', category: 'drivetrain', interval: 2500, intervalType: 'miles', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 45, notes: 'Road chains last longer' },
        { name: 'Tire Replacement', category: 'tires', interval: 2000, intervalType: 'miles', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 80, notes: 'Check for cuts and wear' }
      ]
      return items.map((item, index) => ({
        ...item,
        id: `${bikeId}-${index + 1}`
      }))
    } else {
      // Hybrid bike gets a basic maintenance set
      const items = [
        { name: 'Clean & Lube Drivetrain', category: 'drivetrain', interval: 7, intervalType: 'rides', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 8, notes: 'Commuter maintenance' },
        { name: 'Check Tire Pressure', category: 'tires', interval: 7, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Weekly for commuting' },
        { name: 'Brake Check', category: 'brakes', interval: 30, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 25, notes: 'Monthly safety check' },
        { name: 'Chain Replacement', category: 'drivetrain', interval: 3000, intervalType: 'miles', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 35, notes: 'Hybrid chain maintenance' }
      ]
      return items.map((item, index) => ({
        ...item,
        id: `${bikeId}-${index + 1}`
      }))
    }
  }

  return {
    id: Date.now().toString(),
    name,
    brand,
    model,
    year,
    type,
    wheelSize: type === 'mountain' ? '29"' : '700c',
    createdAt: new Date().toISOString(),
    maintenanceItems: getMaintenanceItemsForType(type),
    configuration: {
      forkPressure: 0,
      forkClicks: 0,
      shockPressure: 0,
      shockClicks: 0,
      hasShock: type === 'mountain',
      frontTirePSI: 0,
      rearTirePSI: 0,
      riderWeight: 180,
      lastUpdated: new Date().toISOString()
    },
    links: []
  }
}

// Mock bikes data
const mockBikes = [
  {
    id: '1',
    name: 'Trail Ripper',
    brand: 'Santa Cruz',
    model: '5010',
    year: 2023,
    type: 'mountain',
    wheelSize: '29"',
    createdAt: '2024-01-15T00:00:00Z',
    maintenanceItems: [
      // Frequent/Regular Maintenance
      { id: '1', name: 'Clean & Lube Drivetrain', category: 'drivetrain', interval: 3, intervalType: 'rides', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: 'Especially in wet/muddy conditions' },
      { id: '2', name: 'Battery Levels (Wireless Components)', category: 'controls', interval: 30, intervalType: 'days', priority: 'low', status: 'completed', lastPerformed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'AXS/Dropper/etc' },
      { id: '3', name: 'Tighten All Bolts (Torque)', category: 'safety', interval: 30, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Use torque wrench and manufacturer guidance' },
      
      // 2-3 Month Items
      { id: '4', name: 'Add Tire Sealant', category: 'tires', interval: 75, intervalType: 'days', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 15, notes: '' },
      { id: '5', name: 'Firmware Update (Electronic Components)', category: 'controls', interval: 120, intervalType: 'days', priority: 'low', status: 'pending', lastPerformed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Use the app!' },
      
      // Quarterly Items
      { id: '6', name: 'Inspect Dropper Cable', category: 'controls', interval: 90, intervalType: 'days', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Check for slow return' },
      { id: '7', name: 'Check Spoke Tension', category: 'wheels', interval: 90, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: '' },
      { id: '8', name: 'True Wheels', category: 'wheels', interval: 90, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 25, notes: 'As needed / Check spoke tension' },
      { id: '9', name: 'Check Brake Rotor Wear', category: 'brakes', interval: 120, intervalType: 'days', priority: 'high', status: 'completed', lastPerformed: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Replace at 1.8mm thickness' },
      { id: '10', name: 'Inspect Frame for Cracks/Damage', category: 'frame', interval: 90, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'After crashes / quarterly' },
      { id: '11', name: 'Check Torque on Suspension Bolts', category: 'suspension', interval: 90, intervalType: 'days', priority: 'high', status: 'completed', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Loctite may be needed' },
      
      // 6 Month Items
      { id: '12', name: 'Inspect & Grease Crankset', category: 'drivetrain', interval: 180, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 15, notes: 'Pull cranks + clean BB' },
      { id: '13', name: 'Inspect & Grease Linkage Bearings', category: 'frame', interval: 180, intervalType: 'days', priority: 'medium', status: 'overdue', lastPerformed: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 25, notes: '' },
      { id: '14', name: 'Bleed Brakes', category: 'brakes', interval: 180, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 20, notes: 'Follow SOP / YT How-to - or when mushy' },
      
      // 6-12 Month Items
      { id: '15', name: 'Grease Headset', category: 'frame', interval: 270, intervalType: 'days', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: '' },
      
      // Service Hour Items
      { id: '16', name: 'Fork Lower Service', category: 'suspension', interval: 50, intervalType: 'hours', priority: 'high', status: 'overdue', lastPerformed: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 75, notes: 'Follow SOP / YT How-to' },
      { id: '17', name: 'Shock Air Can Service', category: 'suspension', interval: 75, intervalType: 'hours', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 50, notes: '' },
      
      // Mileage/Wear Items
      { id: '18', name: 'Replace Chain', category: 'drivetrain', interval: 650, intervalType: 'miles', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 65, notes: 'Every 0.5% wear (~500-800mi)' },
      { id: '19', name: 'Replace Brake Pads', category: 'brakes', interval: 1000, intervalType: 'miles', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 45, notes: 'When <1.5mm or noisy - Validate organic or metallic' },
      { id: '20', name: 'Replace Tires', category: 'tires', interval: 1500, intervalType: 'miles', priority: 'high', status: 'completed', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 120, notes: 'When worn or damaged - Check casing + tread' },
      
      // Annual Items
      { id: '21', name: 'Replace Derailleur Cable', category: 'drivetrain', interval: 365, intervalType: 'days', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 30, notes: 'Yearly / as needed' },
      { id: '22', name: 'Full Suspension Service', category: 'suspension', interval: 100, intervalType: 'hours', priority: 'high', status: 'overdue', lastPerformed: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 200, notes: 'Annually / 100+ hrs' }
    ],
    configuration: {
      forkPressure: 85,
      forkClicks: 12,
      shockPressure: 200,
      shockClicks: 8,
      hasShock: true,
      frontTirePSI: 28,
      rearTirePSI: 30,
      riderWeight: 180,
      lastUpdated: new Date().toISOString()
    },
    links: [
      {
        id: '1',
        title: 'Owner\'s Manual',
        url: 'https://www.santacruzbicycles.com/en-US/support/manuals',
        description: 'Official Santa Cruz 5010 owner\'s manual and setup guide'
      },
      {
        id: '2',
        title: 'Geometry Chart',
        url: 'https://www.santacruzbicycles.com/en-US/bike/5010',
        description: 'Detailed geometry specifications'
      }
    ]
  },
  {
    id: '2',
    name: 'Gravel Explorer',
    brand: 'Specialized',
    model: 'Diverge',
    year: 2022,
    type: 'gravel',
    wheelSize: '700c',
    createdAt: '2024-06-01T00:00:00Z',
    maintenanceItems: [
      { id: '23', name: 'Clean & Lube Drivetrain', category: 'drivetrain', interval: 5, intervalType: 'rides', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 10, notes: 'Road/gravel conditions - less frequent than MTB' },
      { id: '24', name: 'Check Tire Pressure', category: 'tires', interval: 7, intervalType: 'days', priority: 'high', status: 'pending', lastPerformed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 0, notes: 'Higher pressures for road/gravel' },
      { id: '25', name: 'Brake Pad Check', category: 'brakes', interval: 1000, intervalType: 'miles', priority: 'high', status: 'completed', lastPerformed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 35, notes: 'When <1.5mm or noisy' },
      { id: '26', name: 'Chain Replacement', category: 'drivetrain', interval: 2500, intervalType: 'miles', priority: 'medium', status: 'completed', lastPerformed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 45, notes: 'Road chains last longer' },
      { id: '27', name: 'Tire Replacement', category: 'tires', interval: 2000, intervalType: 'miles', priority: 'medium', status: 'pending', lastPerformed: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), partsCost: 80, notes: 'Check for cuts and wear' }
    ],
    configuration: {
      forkPressure: 0, // Road bike doesn't have suspension
      forkClicks: 0,
      shockPressure: 0,
      shockClicks: 0,
      hasShock: false,
      frontTirePSI: 85,
      rearTirePSI: 90,
      riderWeight: 180,
      lastUpdated: new Date().toISOString()
    },
    links: [
      {
        id: '3',
        title: 'Specialized Diverge Manual',
        url: 'https://www.specialized.com/us/en/support/manuals',
        description: 'Complete setup and maintenance guide for gravel bikes'
      }
    ]
  }
]

// Bike Selector Component
const BikeSelector = ({ bikes, currentBike, onBikeChange, onAddBike, onManageBikes }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border rounded-lg transition duration-150"
        style={{ backgroundColor: 'rgba(0, 114, 206, 0.08)', borderColor: '#0C2340' }}
      >
        <span className="text-lg">{getBikeIcon(currentBike?.type)}</span>
        <div className="text-left">
          <div className="text-sm font-medium text-sunshine-gold">{currentBike?.name || 'Select Bike'}</div>
          <div className="text-xs text-navy-blue">{currentBike ? `${currentBike.brand} ${currentBike.model}` : 'No bike selected'}</div>
        </div>
        <span className="text-navy-blue">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border-2 z-50" style={{ borderColor: '#0C2340' }}>
          <div className="py-2">
            {bikes.map((bike) => (
              <button
                key={bike.id}
                onClick={() => {
                  onBikeChange(bike)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-powder-blue-5 flex items-center space-x-3 ${
                  currentBike?.id === bike.id ? 'bg-powder-blue-10 text-powder-blue-dark' : ''
                }`}
              >
                <span className="text-lg">{getBikeIcon(bike.type)}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-sunshine-gold">{bike.name}</div>
                  <div className="text-xs text-navy-blue">{bike.brand} {bike.model} ({bike.year})</div>
                </div>
                {currentBike?.id === bike.id && <span className="text-powder-blue">✓</span>}
              </button>
            ))}
            
            <div className="border-t border-powder-blue-20 mt-2 pt-2">
              <button
                onClick={() => {
                  onAddBike()
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-sunshine-gold-10 flex items-center space-x-3 text-sunshine-gold-dark"
              >
                <span className="text-lg">➕</span>
                <span className="text-sm font-medium">Add New Bike</span>
              </button>
              
              <Link
                to="/manage-bikes"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-left hover:bg-powder-blue-5 flex items-center space-x-3 text-powder-blue block"
              >
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-medium">Manage Bikes</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Navigation component
const Navbar = ({ bikes, currentBike, onBikeChange, onAddBike, onManageBikes, onExportData, onImportData }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/bike-details', label: 'Bike Details', icon: '🚴‍♂️' },
    { path: '/maintenance', label: 'Maintenance', icon: '🔧' },
    { path: '/config', label: 'Configuration', icon: '⚙️' },
    { path: '/manage-bikes', label: 'Manage Bikes', icon: '🔧' },
    { path: '#add-bike', label: 'Add Bike', icon: '➕', isAction: true }
  ]

  return (
    <nav className="bg-white shadow-lg border-b-4" style={{ borderBottomColor: '#0C2340' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🚴‍♂️</span>
              <div className="flex flex-col">
                <span className="text-xl font-bold" style={{ color: '#FFB81C' }}>MTB Tracker</span>
                <span className="text-xs" style={{ color: '#0C2340' }}>Multi-Bike Management</span>
              </div>
            </Link>
            
            <BikeSelector
              bikes={bikes}
              currentBike={currentBike}
              onBikeChange={onBikeChange}
              onAddBike={onAddBike}
              onManageBikes={onManageBikes}
            />

            {/* Data Management */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onExportData}
                className="px-3 py-1 text-xs bg-powder-blue-10 text-powder-blue-dark rounded hover:bg-powder-blue-20 transition duration-150"
                title="Export your bike data as backup"
              >
                💾 Export
              </button>
              <label className="px-3 py-1 text-xs bg-sunshine-gold-10 text-sunshine-gold-dark rounded hover:bg-sunshine-gold-20 transition duration-150 cursor-pointer" title="Import bike data from backup">
                📁 Import
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              if (item.isAction) {
                return (
                  <button
                    key={item.path}
                    onClick={onAddBike}
                    className="px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-2 nav-inactive hover:bg-sunshine-gold-10 hover:text-sunshine-gold-dark"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-2 ${
                    location.pathname === item.path
                      ? 'nav-active'
                      : 'nav-inactive'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Edit Bike Modal Component
const EditBikeModal = ({ isOpen, onClose, onSave, bike }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'mountain',
    wheelSize: '29"'
  })

  const bikeTypes = [
    { value: 'mountain', label: 'Mountain Bike', icon: '🚵‍♂️' },
    { value: 'gravel', label: 'Gravel Bike', icon: '🚲' },
    { value: 'hybrid', label: 'Hybrid Bike', icon: '🚴‍♀️' }
  ]

  const wheelSizes = {
    mountain: ['27.5"', '29"', 'MX'],
    gravel: ['700c', '650b'],
    hybrid: ['700c', '27.5"']
  }

  // Initialize form data when bike prop changes
  useEffect(() => {
    if (bike && isOpen) {
      setFormData({
        name: bike.name,
        brand: bike.brand,
        model: bike.model,
        year: bike.year,
        type: bike.type,
        wheelSize: bike.wheelSize
      })
    }
  }, [bike, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.brand.trim() || !formData.model.trim()) {
      alert('Please fill in all required fields')
      return
    }
    
    const updatedBike = {
      ...bike,
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      type: formData.type,
      wheelSize: formData.wheelSize,
      links: bike.links || [] // Preserve existing links
    }
    
    onSave(updatedBike)
    onClose()
  }

  const handleCancel = () => {
    if (bike) {
      setFormData({
        name: bike.name,
        brand: bike.brand,
        model: bike.model,
        year: bike.year,
        type: bike.type,
        wheelSize: bike.wheelSize
      })
    }
    onClose()
  }

  if (!isOpen || !bike) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Bike</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bike Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Trail Ripper, Daily Commuter"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Santa Cruz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model *
                </label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5010"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bike Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {bikeTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="bikeType"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => {
                        const newType = e.target.value
                        const defaultWheel = wheelSizes[newType][0]
                        setFormData(prev => ({ 
                          ...prev, 
                          type: newType,
                          wheelSize: defaultWheel
                        }))
                      }}
                      className="mr-2"
                    />
                    <span className="mr-1">{type.icon}</span>
                    <span className="text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wheel Size
              </label>
              <select
                value={formData.wheelSize}
                onChange={(e) => setFormData(prev => ({ ...prev, wheelSize: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {wheelSizes[formData.type].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Add New Bike Modal Component
const AddBikeModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'mountain',
    wheelSize: '29"'
  })

  const bikeTypes = [
    { value: 'mountain', label: 'Mountain Bike', icon: '🚵‍♂️' },
    { value: 'gravel', label: 'Gravel Bike', icon: '🚲' },
    { value: 'hybrid', label: 'Hybrid Bike', icon: '🚴‍♀️' }
  ]

  const wheelSizes = {
    mountain: ['27.5"', '29"', 'MX'],
    gravel: ['700c', '650b'],
    hybrid: ['700c', '27.5"']
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.brand.trim() || !formData.model.trim()) {
      alert('Please fill in all required fields')
      return
    }
    
    const newBike = createNewBike(formData.name, formData.brand, formData.model, formData.year, formData.type)
    newBike.wheelSize = formData.wheelSize
    newBike.links = [] // Initialize empty links array
    
    onSave(newBike)
    setFormData({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'mountain',
      wheelSize: '29"'
    })
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'mountain',
      wheelSize: '29"'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Bike</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bike Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Trail Ripper, Daily Commuter"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Santa Cruz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model *
                </label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5010"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bike Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {bikeTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="bikeType"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => {
                        const newType = e.target.value
                        const defaultWheel = wheelSizes[newType][0]
                        setFormData(prev => ({ 
                          ...prev, 
                          type: newType,
                          wheelSize: defaultWheel
                        }))
                      }}
                      className="mr-2"
                    />
                    <span className="mr-1">{type.icon}</span>
                    <span className="text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wheel Size
              </label>
              <select
                value={formData.wheelSize}
                onChange={(e) => setFormData(prev => ({ ...prev, wheelSize: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {wheelSizes[formData.type].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Add Bike
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Bike Links Component
const BikeLinks = ({ currentBike, onUpdateLinks }) => {
  const [links, setLinks] = useState([])
  const [showAddLink, setShowAddLink] = useState(false)
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '' })

  useEffect(() => {
    if (currentBike) {
      setLinks(currentBike.links || [])
    }
  }, [currentBike])

  const handleAddLink = () => {
    if (!newLink.title.trim() || !newLink.url.trim()) {
      alert('Please provide both title and URL')
      return
    }

    const linkToAdd = {
      id: Date.now().toString(),
      title: newLink.title.trim(),
      url: newLink.url.trim(),
      description: newLink.description.trim()
    }

    const updatedLinks = [...links, linkToAdd]
    setLinks(updatedLinks)
    onUpdateLinks(currentBike.id, updatedLinks)
    
    setNewLink({ title: '', url: '', description: '' })
    setShowAddLink(false)
  }

  const handleDeleteLink = (linkId) => {
    const updatedLinks = links.filter(link => link.id !== linkId)
    setLinks(updatedLinks)
    onUpdateLinks(currentBike.id, updatedLinks)
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  if (!currentBike) return null

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-sunshine-gold">Documentation Links</h2>
        <button
          onClick={() => setShowAddLink(true)}
          className="btn-accent text-sm px-3 py-1"
        >
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔗</div>
          <p>No documentation links added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-powder-blue hover:text-powder-blue-dark font-medium text-sm"
                  >
                    {link.title}
                  </a>
                  <span className="text-gray-400">🔗</span>
                </div>
                {link.description && (
                  <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1 truncate">{link.url}</p>
              </div>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="text-red-600 hover:text-red-800 text-sm ml-3"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Documentation Link</h3>
                <button
                  onClick={() => {
                    setShowAddLink(false)
                    setNewLink({ title: '', url: '', description: '' })
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newLink.title}
                    onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powder-blue"
                    placeholder="e.g., Owner's Manual, Setup Guide"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powder-blue"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newLink.description}
                    onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powder-blue"
                    rows="2"
                    placeholder="Brief description of what this link contains"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddLink(false)
                    setNewLink({ title: '', url: '', description: '' })
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLink}
                  className="btn-primary"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Bike Details component
const BikeDetails = ({ currentBike, onUpdateLinks }) => {
  if (!currentBike) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🚴‍♂️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bike Selected</h2>
        <p className="text-gray-600 mb-6">Select a bike from the dropdown above to view its details.</p>
      </div>
    )
  }

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <span className="text-3xl">{getBikeIcon(currentBike.type)}</span>
        <div>
          <h1 className="text-3xl font-bold text-sunshine-gold">{currentBike.name}</h1>
          <p className="text-navy-blue">{currentBike.brand} {currentBike.model} ({currentBike.year}) - Bike Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-sunshine-gold mb-4">Bike Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">{currentBike.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-medium">{currentBike.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year:</span>
              <span className="font-medium">{currentBike.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium capitalize">{currentBike.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wheel Size:</span>
              <span className="font-medium">{currentBike.wheelSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date(currentBike.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-sunshine-gold mb-4">Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenance Items:</span>
              <span className="font-medium">{currentBike.maintenanceItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Tasks:</span>
              <span className="font-medium text-yellow-600">
                {currentBike.maintenanceItems.filter(item => item.status === 'pending').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue Tasks:</span>
              <span className="font-medium text-red-600">
                {currentBike.maintenanceItems.filter(item => item.status === 'overdue').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Documentation Links:</span>
              <span className="font-medium">{currentBike.links?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <BikeLinks currentBike={currentBike} onUpdateLinks={onUpdateLinks} />
    </div>
  )
}

// Dashboard component
const Dashboard = ({ bikes, onAddBike }) => {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)
  const [selectedBikeForRecs, setSelectedBikeForRecs] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [isGeneratingRecs, setIsGeneratingRecs] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [configLoaded, setConfigLoaded] = useState(false)

  // Load API key on component mount
  useEffect(() => {
    const loadApiKey = async () => {
      let key = ''
      
      // Try loading from config file first
      try {
        const response = await fetch('/config.json')
        if (response.ok) {
          const config = await response.json()
          if (config.openaiApiKey) {
            key = config.openaiApiKey
            console.log('✅ API key loaded from config.json')
          }
        }
      } catch (error) {
        // Config file doesn't exist or isn't accessible, that's fine
        console.log('No config.json file found, checking localStorage...')
      }
      
      // Fallback to localStorage if no config file key
      if (!key) {
        key = localStorage.getItem('openai-api-key') || ''
        if (key) {
          console.log('✅ API key loaded from localStorage')
        }
      }
      
      setApiKey(key)
      setConfigLoaded(true)
    }
    
    loadApiKey()
  }, [])

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleaning': return '🧽'
      case 'drivetrain': return '⚙️'
      case 'brakes': return '🛑'
      case 'suspension': return '🔧'
      case 'tires': return '🛞'
      case 'controls': return '🎮'
      case 'frame': return '🚲'
      case 'wheels': return '⭕'
      case 'safety': return '⚠️'
      default: return '🔧'
    }
  }

  // Get all urgent maintenance items across all bikes
  const getUrgentMaintenance = () => {
    const urgentItems = []
    bikes.forEach(bike => {
      bike.maintenanceItems.forEach(item => {
        if (item.status === 'overdue' || (item.status === 'pending' && item.priority === 'high')) {
          urgentItems.push({
            ...item,
            bikeName: bike.name,
            bikeId: bike.id,
            bikeIcon: getBikeIcon(bike.type)
          })
        }
      })
    })
    return urgentItems.sort((a, b) => {
      // Sort by status (overdue first) then by priority
      if (a.status === 'overdue' && b.status !== 'overdue') return -1
      if (a.status !== 'overdue' && b.status === 'overdue') return 1
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (a.priority !== 'high' && b.priority === 'high') return 1
      return 0
    })
  }

  // Calculate fleet stats
  const getFleetStats = () => {
    let totalOverdue = 0
    let totalPending = 0
    let totalCompleted = 0
    let totalHighPriority = 0

    bikes.forEach(bike => {
      bike.maintenanceItems.forEach(item => {
        if (item.status === 'overdue') totalOverdue++
        else if (item.status === 'pending') totalPending++
        else if (item.status === 'completed') totalCompleted++
        
        if (item.priority === 'high') totalHighPriority++
      })
    })

    return { totalOverdue, totalPending, totalCompleted, totalHighPriority }
  }

  const generateRecommendations = async (bike) => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key first')
      return
    }

    setIsGeneratingRecs(true)
    setSelectedBikeForRecs(bike)

    try {
      // Prepare data for LLM
      const bikeData = {
        bike: {
          name: bike.name,
          brand: bike.brand,
          model: bike.model,
          year: bike.year,
          type: bike.type,
          wheelSize: bike.wheelSize,
          age: new Date().getFullYear() - bike.year
        },
        maintenanceItems: bike.maintenanceItems.map(item => ({
          name: item.name,
          category: item.category,
          priority: item.priority,
          status: item.status,
          interval: item.interval,
          intervalType: item.intervalType,
          lastPerformed: item.lastPerformed,
          daysSince: Math.floor((Date.now() - new Date(item.lastPerformed)) / (1000 * 60 * 60 * 24)),
          notes: item.notes,
          partsCost: item.partsCost
        })),
        currentDate: new Date().toISOString().split('T')[0],
        season: getSeason()
      }

      const prompt = `You are a professional bike mechanic AI assistant. Analyze the maintenance status of this bike and provide prioritized recommendations.

Bike Details:
- ${bikeData.bike.name} (${bikeData.bike.brand} ${bikeData.bike.model})
- Year: ${bikeData.bike.year} (${bikeData.bike.age} years old)
- Type: ${bikeData.bike.type}
- Current Date: ${bikeData.currentDate}
- Season: ${bikeData.season}

Maintenance Items Status:
${bikeData.maintenanceItems.map(item => 
  `- ${item.name}: ${item.status}, last done ${item.daysSince} days ago, priority: ${item.priority}, interval: every ${item.interval} ${item.intervalType}${item.notes ? `, notes: ${item.notes}` : ''}`
).join('\n')}

Please provide maintenance recommendations in this exact format:

🚨 IMMEDIATE ACTION (Next 7 days):
[List items that are overdue or safety-critical]

⚠️ PLAN SOON (Next 30 days):
[List items coming due or recommended based on patterns]

💡 SEASONAL ADVICE:
[Seasonal maintenance tips for ${bikeData.season}]

🔧 GENERAL TIPS:
[Any patterns or advice based on the maintenance history]

Be specific about why each item is recommended, include timeframes, and consider the bike type and age. Keep recommendations practical and prioritized by safety first, then performance.`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Cheapest model as requested
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      const recommendations = data.choices[0].message.content

      setRecommendations(recommendations)
      setShowRecommendationModal(true)

    } catch (error) {
      console.error('Error generating recommendations:', error)
      alert(`Error generating recommendations: ${error.message}`)
    } finally {
      setIsGeneratingRecs(false)
    }
  }

  const getSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return 'Spring'
    if (month >= 6 && month <= 8) return 'Summer'
    if (month >= 9 && month <= 11) return 'Fall'
    return 'Winter'
  }

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey)
    localStorage.setItem('openai-api-key', newKey)
  }

  const urgentMaintenance = getUrgentMaintenance()
  const stats = getFleetStats()

  const StatCard = ({ title, value, color, icon, description }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )

  if (bikes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🚴‍♂️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bikes Yet</h2>
        <p className="text-gray-600 mb-6">Add your first bike to start tracking maintenance!</p>
        <button onClick={onAddBike} className="btn-primary">Add Your First Bike</button>
      </div>
    )
  }

  return (
    <>
      {/* Recommendations Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-navy-blue">
                🤖 Maintenance Recommendations: {selectedBikeForRecs?.name}
              </h2>
              <button
                onClick={() => {
                  setShowRecommendationModal(false)
                  setRecommendations(null)
                  setSelectedBikeForRecs(null)
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {recommendations ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans bg-gray-50 p-4 rounded-lg border">
                    {recommendations}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">Analyzing your bike's maintenance status...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              )}
              
              {recommendations && (
                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-xs text-gray-500 mb-3">
                    Powered by OpenAI GPT-3.5 • Based on your maintenance data as of {new Date().toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => {
                      setShowRecommendationModal(false)
                      setRecommendations(null)
                      setSelectedBikeForRecs(null)
                    }}
                    className="btn-primary"
                  >
                    Close Recommendations
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-sunshine-gold">Fleet Dashboard</h1>
          <p className="text-navy-blue">Managing {bikes.length} bike{bikes.length !== 1 ? 's' : ''} • Overview of your maintenance status</p>
        </div>

      {/* Generate Recommendations */}
      <div className="card max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-navy-blue mb-2">🤖 AI-Powered Maintenance</h3>
          <p className="text-gray-600 mb-4">Get personalized maintenance recommendations based on your bike's condition and usage patterns</p>
          
          {!configLoaded ? (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Loading configuration...</p>
            </div>
          ) : !apiKey ? (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Enter your OpenAI API key to enable recommendations:</p>
              <div className="flex items-center space-x-2 max-w-md mx-auto">
                <input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-powder-blue"
                />
                <button
                  onClick={() => setApiKey('')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  title="Clear API key"
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                <details>
                  <summary className="cursor-pointer hover:text-gray-600">💡 Tip: Auto-load API key from file</summary>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-left">
                    <p className="mb-2">Create a <code>config.json</code> file in your <code>public/</code> folder:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "openaiApiKey": "sk-your-api-key-here"
}`}
                    </pre>
                    <p className="mt-2 text-xs">The app will automatically load your key from this file.</p>
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm text-green-600">✓ API key configured</p>
            </div>
          )}

          {bikes.length === 0 ? (
            <p className="text-gray-500">Add bikes to generate maintenance recommendations</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-3">Select a bike for personalized recommendations:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto">
                {bikes.map(bike => (
                  <button
                    key={bike.id}
                    onClick={() => generateRecommendations(bike)}
                    disabled={isGeneratingRecs || !apiKey}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-powder-blue-10 text-powder-blue-dark rounded-lg hover:bg-powder-blue-20 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{getBikeIcon(bike.type)}</span>
                    <span className="text-sm font-medium">{bike.name}</span>
                    {isGeneratingRecs && selectedBikeForRecs?.id === bike.id && (
                      <span className="animate-spin">⏳</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Your Bikes */}
      <div className="card">
        <h2 className="text-xl font-semibold text-sunshine-gold mb-4">Your Bikes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bikes.map((bike) => {
            const bikePending = bike.maintenanceItems.filter(item => item.status === 'pending').length
            const bikeHighPriority = bike.maintenanceItems.filter(item => item.priority === 'high').length
            
            return (
              <div key={bike.id} className="border border-navy-blue rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{getBikeIcon(bike.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-blue">{bike.name}</h3>
                    <p className="text-sm text-gray-600">{bike.brand} {bike.model}</p>
                    <p className="text-xs text-gray-500">{bike.year} • {bike.wheelSize}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <div className={`font-semibold ${bikePending > 0 ? 'text-sunshine-gold-dark' : 'text-gray-400'}`}>
                      {bikePending}
                    </div>
                    <div className="text-gray-500">Due Soon</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${bikeHighPriority > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {bikeHighPriority}
                    </div>
                    <div className="text-gray-500">High Priority</div>
                  </div>
                </div>
                
                {(bikePending > 0 || bikeHighPriority > 0) && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-600">
                      {bikePending > 0 && <span className="text-sunshine-gold-dark font-medium">📅 {bikePending} due soon</span>}
                      {bikePending > 0 && bikeHighPriority > 0 && <span className="mx-1">•</span>}
                      {bikeHighPriority > 0 && <span className="text-red-600 font-medium">⚠️ {bikeHighPriority} high priority</span>}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Urgent Maintenance */}
      {urgentMaintenance.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-sunshine-gold mb-4 flex items-center">
            <span className="mr-2">🚨</span>
            Urgent Maintenance Required
          </h2>
          <div className="space-y-3">
            {urgentMaintenance.slice(0, 8).map((item) => {
              const daysSince = Math.floor((Date.now() - new Date(item.lastPerformed)) / (1000 * 60 * 60 * 24))
              const isOverdue = item.status === 'overdue'
              
              return (
                <div 
                  key={`${item.bikeId}-${item.id}`}
                  className={`border-l-4 p-4 rounded-r-lg ${
                    isOverdue ? 'border-l-red-500 bg-red-50' : 'border-l-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{item.bikeIcon}</span>
                        <span className="text-sm font-medium text-gray-600">{item.bikeName}</span>
                        <span className="text-lg">{getCategoryIcon(item.category)}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isOverdue ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isOverdue ? '🚨 OVERDUE' : '⏳ HIGH PRIORITY'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-navy-blue">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="mr-4">Last done: {daysSince} days ago</span>
                        <span className="mr-4">Every {item.interval} {item.intervalType}</span>
                        {item.partsCost > 0 && <span>Est. cost: ${item.partsCost}</span>}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {urgentMaintenance.length > 8 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                And {urgentMaintenance.length - 8} more urgent item{urgentMaintenance.length - 8 !== 1 ? 's' : ''}...
              </p>
            </div>
          )}
        </div>
      )}

      {/* No urgent maintenance message */}
      {urgentMaintenance.length === 0 && (
        <div className="card text-center py-8">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-powder-blue mb-2">All Caught Up!</h3>
          <p className="text-gray-600">No overdue or high-priority maintenance items right now.</p>
        </div>
      )}
      </div>
    </>
  )
}

// Maintenance component
const Maintenance = ({ currentBike, onUpdateMaintenance }) => {
  const [filter, setFilter] = useState('all')
  const [editingDateId, setEditingDateId] = useState(null)
  
  if (!currentBike) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔧</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bike Selected</h2>
        <p className="text-gray-600 mb-6">Select a bike from the dropdown above to view its maintenance checklist.</p>
      </div>
    )
  }

  const { maintenanceItems } = currentBike

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleaning': return '🧽'
      case 'drivetrain': return '⚙️'
      case 'brakes': return '🛑'
      case 'suspension': return '🔧'
      case 'tires': return '🛞'
      case 'controls': return '🎮'
      case 'frame': return '🚲'
      case 'wheels': return '⭕'
      case 'safety': return '⚠️'
      default: return '🔧'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'overdue':
        return { color: 'bg-red-100 text-red-800', icon: '🚨', text: 'Overdue' }
      case 'pending':
        return { color: 'bg-sunshine-gold-20 text-sunshine-gold-dark', icon: '⏳', text: 'Due Soon' }
      case 'completed':
        return { color: 'bg-powder-blue-20 text-powder-blue-dark', icon: '✅', text: 'Completed' }
      case 'not_applicable':
        return { color: 'bg-gray-100 text-gray-600', icon: 'N/A', text: 'Not Applicable' }
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: '❓', text: 'Unknown' }
    }
  }

  const toggleItemStatus = (itemId) => {
    if (!onUpdateMaintenance) return
    
    const updatedItems = maintenanceItems.map(item => {
      if (item.id === itemId) {
        let newStatus, newLastPerformed
        
        // Cycle through: pending → completed → not_applicable → pending
        if (item.status === 'pending') {
          newStatus = 'completed'
          newLastPerformed = new Date().toISOString()
        } else if (item.status === 'completed') {
          newStatus = 'not_applicable'
          newLastPerformed = item.lastPerformed
        } else {
          newStatus = 'pending'
          newLastPerformed = item.lastPerformed
        }
        
        return { ...item, status: newStatus, lastPerformed: newLastPerformed }
      }
      return item
    })
    
    onUpdateMaintenance(currentBike.id, updatedItems)
  }

  const updateLastPerformed = (itemId, newDate) => {
    if (!onUpdateMaintenance || !newDate) return
    
    const updatedItems = maintenanceItems.map(item => {
      if (item.id === itemId) {
        return { ...item, lastPerformed: new Date(newDate).toISOString() }
      }
      return item
    })
    
    onUpdateMaintenance(currentBike.id, updatedItems)
    setEditingDateId(null)
  }

  const formatDateForInput = (isoString) => {
    return isoString ? new Date(isoString).toISOString().split('T')[0] : ''
  }

  // Group items by frequency/category
  const groupedItems = {
    'After Every Ride': maintenanceItems.filter(item => item.intervalType === 'rides'),
    'Weekly/Monthly': maintenanceItems.filter(item => item.intervalType === 'miles' && item.interval <= 300),
    'Quarterly': maintenanceItems.filter(item => (item.intervalType === 'miles' && item.interval > 300 && item.interval < 1000) || item.intervalType === 'hours'),
    'Semi-Annual/Annual': maintenanceItems.filter(item => item.intervalType === 'miles' && item.interval >= 1000 || item.intervalType === 'days')
  }

  const filteredGroups = filter === 'all' ? groupedItems : 
    Object.keys(groupedItems).reduce((acc, key) => {
      acc[key] = groupedItems[key].filter(item => item.status === filter)
      return acc
    }, {})

  const getCounts = () => {
    const all = maintenanceItems.length
    const overdue = maintenanceItems.filter(item => item.status === 'overdue').length
    const pending = maintenanceItems.filter(item => item.status === 'pending').length
    const completed = maintenanceItems.filter(item => item.status === 'completed').length
    const notApplicable = maintenanceItems.filter(item => item.status === 'not_applicable').length
    return { all, overdue, pending, completed, notApplicable }
  }

  const counts = getCounts()

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-3xl">{getBikeIcon(currentBike.type)}</span>
        <div>
          <h1 className="text-3xl font-bold text-sunshine-gold">Maintenance Checklist</h1>
          <p className="text-navy-blue">{currentBike.name} - {currentBike.brand} {currentBike.model}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
            filter === 'all' ? 'bg-navy-blue text-white' : 'bg-white text-navy-blue border border-navy-blue hover:bg-navy-blue hover:text-white'
          }`}
        >
          All Items ({counts.all})
        </button>
        <button
          onClick={() => setFilter('overdue')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
            filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white'
          }`}
        >
          Overdue ({counts.overdue})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
            filter === 'pending' ? 'bg-sunshine-gold text-navy-blue' : 'bg-white text-sunshine-gold-dark border border-sunshine-gold hover:bg-sunshine-gold hover:text-navy-blue'
          }`}
        >
          Due Soon ({counts.pending})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
            filter === 'completed' ? 'bg-powder-blue text-white' : 'bg-white text-powder-blue border border-powder-blue hover:bg-powder-blue hover:text-white'
          }`}
        >
          Completed ({counts.completed})
        </button>
        <button
          onClick={() => setFilter('not_applicable')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
            filter === 'not_applicable' ? 'bg-gray-500 text-white' : 'bg-white text-gray-600 border border-gray-400 hover:bg-gray-500 hover:text-white'
          }`}
        >
          Not Applicable ({counts.notApplicable})
        </button>
      </div>

      {/* Maintenance Checklist */}
      {Object.entries(filteredGroups).map(([groupName, items]) => {
        if (items.length === 0) return null
        
        return (
          <div key={groupName} className="card">
            <h2 className="text-xl font-semibold text-sunshine-gold mb-4 flex items-center">
              <span className="mr-2">🕐</span>
              {groupName}
            </h2>
            
            <div className="space-y-3">
              {items.map((item) => {
                const status = getStatusInfo(item.status)
                const daysSince = Math.floor((Date.now() - new Date(item.lastPerformed)) / (1000 * 60 * 60 * 24))
                
                return (
                  <div
                    key={item.id}
                    className={`border-l-4 ${getPriorityColor(item.priority)} p-4 rounded-r-lg hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <button
                            onClick={() => toggleItemStatus(item.id)}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              item.status === 'completed'
                                ? 'bg-powder-blue border-powder-blue text-white'
                                : item.status === 'not_applicable'
                                ? 'bg-gray-400 border-gray-400 text-white'
                                : 'border-gray-300 hover:border-powder-blue'
                            }`}
                            title={item.status === 'pending' ? 'Click to mark completed' : item.status === 'completed' ? 'Click to mark not applicable' : 'Click to mark pending'}
                          >
                            {item.status === 'completed' && '✓'}
                            {item.status === 'not_applicable' && 'N/A'}
                          </button>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getCategoryIcon(item.category)}</span>
                            <h3 className={`font-semibold ${
                              item.status === 'completed' ? 'line-through text-gray-500' : 
                              item.status === 'not_applicable' ? 'text-gray-400 italic' : 
                              'text-navy-blue'
                            }`}>
                              {item.name}
                            </h3>
                          </div>
                          
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                            {status.icon} {status.text}
                          </span>
                        </div>
                        
                        <div className="ml-9 space-y-1 text-sm text-gray-600">
                          <p><strong>Frequency:</strong> Every {item.interval} {item.intervalType}</p>
                          <div className="flex items-center space-x-2">
                            <span><strong>Last performed:</strong></span>
                            {editingDateId === item.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="date"
                                  defaultValue={formatDateForInput(item.lastPerformed)}
                                  onBlur={(e) => updateLastPerformed(item.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      updateLastPerformed(item.id, e.target.value)
                                    } else if (e.key === 'Escape') {
                                      setEditingDateId(null)
                                    }
                                  }}
                                  className="px-2 py-1 text-xs border border-powder-blue rounded focus:outline-none focus:ring-1 focus:ring-powder-blue"
                                  autoFocus
                                />
                                <button
                                  onClick={() => setEditingDateId(null)}
                                  className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingDateId(item.id)}
                                className="text-powder-blue hover:text-powder-blue-dark underline text-sm"
                                title="Click to edit date"
                              >
                                {daysSince} days ago ({new Date(item.lastPerformed).toLocaleDateString()}) ✏️
                              </button>
                            )}
                          </div>
                          {item.partsCost > 0 && <p><strong>Est. cost:</strong> ${item.partsCost}</p>}
                          {item.notes && <p><strong>Notes:</strong> {item.notes}</p>}
                        </div>
                      </div>
                      
                      <div className="ml-4 text-right text-xs text-gray-500">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Bike Management component
const BikeManagement = ({ bikes, onDeleteBike, onEditBike }) => {
  const [selectedBike, setSelectedBike] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  const handleDeleteClick = (bike) => {
    setSelectedBike(bike)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (selectedBike) {
      onDeleteBike(selectedBike.id)
      setShowDeleteConfirm(false)
      setSelectedBike(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setSelectedBike(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Bikes</h1>
        <p className="text-gray-600">Edit or delete your bikes</p>
      </div>

      {bikes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚴‍♂️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bikes Yet</h3>
          <p className="text-gray-600 mb-6">You haven't added any bikes to manage yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div key={bike.id} className="card">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{getBikeIcon(bike.type)}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{bike.name}</h3>
                  <p className="text-sm text-gray-600">{bike.brand} {bike.model}</p>
                  <p className="text-xs text-gray-500">{bike.year} • {bike.wheelSize}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Maintenance Items:</span>
                    <div className="font-medium">{bike.maintenanceItems.length}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <div className="font-medium">{new Date(bike.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => onEditBike(bike)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition duration-150"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(bike)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Bike</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to delete "{selectedBike?.name}"? This action cannot be undone and will remove all maintenance records and configuration data.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Configuration component
const Configuration = ({ currentBike, onUpdateConfiguration }) => {
  const [config, setConfig] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize config state when currentBike changes
  useEffect(() => {
    if (currentBike) {
      setConfig({ ...currentBike.configuration })
      setHasChanges(false)
    }
  }, [currentBike])

  if (!currentBike) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bike Selected</h2>
        <p className="text-gray-600 mb-6">Select a bike from the dropdown above to manage its configuration.</p>
      </div>
    )
  }

  if (!config) {
    return <div>Loading...</div>
  }

  const getBikeIcon = (type) => {
    switch (type) {
      case 'mountain': return '🚵‍♂️'
      case 'gravel': return '🚲'
      case 'hybrid': return '🚴‍♀️'
      default: return '🚵‍♂️'
    }
  }

  const hasSuspension = currentBike.type === 'mountain'
  const hasShock = config.hasShock !== false // Default to true for backwards compatibility

  const handleConfigChange = (field, value) => {
    const numValue = parseFloat(value) || 0
    setConfig(prev => ({
      ...prev,
      [field]: numValue
    }))
    setHasChanges(true)
  }

  const handleShockToggle = (hasShockValue) => {
    setConfig(prev => ({
      ...prev,
      hasShock: hasShockValue,
      // Reset shock values when disabling shock
      shockPressure: hasShockValue ? prev.shockPressure : 0,
      shockClicks: hasShockValue ? prev.shockClicks : 0
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    const updatedConfig = {
      ...config,
      lastUpdated: new Date().toISOString()
    }
    onUpdateConfiguration(currentBike.id, updatedConfig)
    setHasChanges(false)
  }

  const handleReset = () => {
    setConfig({ ...currentBike.configuration })
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-3xl">{getBikeIcon(currentBike.type)}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuration Settings</h1>
          <p className="text-gray-600">{currentBike.name} - {currentBike.brand} {currentBike.model}</p>
        </div>
      </div>
      
      <div className={`grid grid-cols-1 ${hasSuspension ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-lg'} gap-6`}>
        {hasSuspension && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suspension</h3>
            <div className="space-y-4">
              {/* Fork Settings */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">Fork</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fork Pressure</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={config.forkPressure}
                        onChange={(e) => handleConfigChange('forkPressure', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-powder-blue"
                        min="0"
                        step="1"
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">PSI</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fork Rebound Clicks</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={config.forkClicks || 0}
                        onChange={(e) => handleConfigChange('forkClicks', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-powder-blue"
                        min="0"
                        step="1"
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">clicks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shock Settings */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-gray-800">Shock</h4>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasShock}
                      onChange={(e) => handleShockToggle(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Has rear shock</span>
                  </label>
                </div>
                
                {hasShock ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shock Pressure</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={config.shockPressure}
                          onChange={(e) => handleConfigChange('shockPressure', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-powder-blue"
                          min="0"
                          step="1"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">PSI</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shock Rebound Clicks</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={config.shockClicks || 0}
                          onChange={(e) => handleConfigChange('shockClicks', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-powder-blue"
                          min="0"
                          step="1"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">clicks</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                    <span className="text-2xl block mb-1">🚴‍♂️</span>
                    <span className="text-sm">Hardtail - No rear shock</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tires & Weight</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Front Tire PSI</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={config.frontTirePSI}
                  onChange={(e) => handleConfigChange('frontTirePSI', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.5"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">PSI</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rear Tire PSI</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={config.rearTirePSI}
                  onChange={(e) => handleConfigChange('rearTirePSI', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.5"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">PSI</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rider Weight</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={config.riderWeight}
                  onChange={(e) => handleConfigChange('riderWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="50"
                  step="1"
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">lbs</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wheel Size</label>
              <input 
                type="text" 
                value={currentBike.wheelSize}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Set when bike was created</p>
            </div>
          </div>
        </div>
      </div>
      
      {hasChanges && (
        <div className="bg-sunshine-gold-10 border border-sunshine-gold-30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sunshine-gold-dark">⚠️</span>
              <span className="text-sunshine-gold-dark font-medium">You have unsaved changes</span>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleReset}
                className="px-4 py-2 text-sunshine-gold-dark border border-sunshine-gold-50 rounded-md hover:bg-sunshine-gold-10 transition duration-150"
              >
                Reset
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!hasChanges && (
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 text-powder-blue">
            <span>✅</span>
            <span className="text-sm font-medium">All changes saved</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Main App component
function App() {
  const [bikes, setBikes] = useState([])
  const [currentBikeId, setCurrentBikeId] = useState(null)
  const [showAddBikeModal, setShowAddBikeModal] = useState(false)
  const [showEditBikeModal, setShowEditBikeModal] = useState(false)
  const [bikeToEdit, setBikeToEdit] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Get current bike object
  const currentBike = bikes.find(bike => bike.id === currentBikeId) || null

  // Load bikes from localStorage on mount, use mockBikes only if no saved data exists
  useEffect(() => {
    const savedBikes = localStorage.getItem('mtb-tracker-bikes')
    const savedCurrentBikeId = localStorage.getItem('mtb-tracker-current-bike-id')
    const dataVersion = localStorage.getItem('mtb-tracker-data-version')
    const currentVersion = '2.1' // Updated for smart migration
    
    if (savedBikes) {
      const parsedBikes = JSON.parse(savedBikes)
      
      if (dataVersion === currentVersion) {
        // Use saved data if it's current version
        setBikes(parsedBikes)
      } else {
        // Auto-backup before migration
        const backupData = {
          bikes: parsedBikes,
          currentBikeId: savedCurrentBikeId,
          backupDate: new Date().toISOString(),
          version: dataVersion || 'unknown'
        }
        localStorage.setItem('mtb-tracker-auto-backup', JSON.stringify(backupData))
        console.log('Auto-backup created before migration')
        
        // Migrate existing bikes with new maintenance items
        console.log('Migrating existing bikes with updated maintenance items...')
        const migratedBikes = parsedBikes.map(bike => {
          // Only update bikes that don't already have the new maintenance structure
          const needsUpdate = !bike.maintenanceItems || bike.maintenanceItems.length < 15
          
          if (needsUpdate) {
            // Find corresponding mock bike by type to get new maintenance items
            const mockBike = mockBikes.find(mock => mock.type === bike.type) || mockBikes[0]
            
            return {
              ...bike, // Preserve all existing bike data (name, brand, model, etc.)
              maintenanceItems: mockBike.maintenanceItems, // Update with new maintenance structure
              configuration: {
                ...mockBike.configuration, // New configuration structure with forkClicks, etc.
                ...bike.configuration, // Preserve any custom settings user had
                hasShock: bike.configuration?.hasShock ?? (bike.type === 'mountain'), // Smart default
              }
            }
          } else {
            // Bike already has updated structure, just ensure new config fields exist
            return {
              ...bike,
              configuration: {
                forkClicks: 0,
                shockClicks: 0,
                hasShock: bike.type === 'mountain',
                ...bike.configuration, // Preserve existing settings
              }
            }
          }
        })
        
        console.log('Migration complete. Updated', migratedBikes.length, 'bikes. Auto-backup available in localStorage.')
        setBikes(migratedBikes)
        
        // Save migrated data
        localStorage.setItem('mtb-tracker-bikes', JSON.stringify(migratedBikes))
        localStorage.setItem('mtb-tracker-data-version', currentVersion)
      }
      
      if (savedCurrentBikeId && parsedBikes.some(bike => bike.id === savedCurrentBikeId)) {
        setCurrentBikeId(savedCurrentBikeId)
      } else if (parsedBikes.length > 0) {
        setCurrentBikeId(parsedBikes[0].id)
      }
    } else {
      // Only use mock data if no saved data exists (first time user)
      console.log('Loading fresh maintenance data with', mockBikes[0].maintenanceItems.length, 'items for mountain bike')
      setBikes(mockBikes)
      setCurrentBikeId(mockBikes[0]?.id || null)
      // Save mock data to localStorage so it persists
      localStorage.setItem('mtb-tracker-bikes', JSON.stringify(mockBikes))
      localStorage.setItem('mtb-tracker-data-version', currentVersion)
      if (mockBikes[0]?.id) {
        localStorage.setItem('mtb-tracker-current-bike-id', mockBikes[0].id)
      }
    }
    
    setIsLoaded(true)
  }, [])

  // Save bikes to localStorage when they change (but only after initial load)
  useEffect(() => {
    if (isLoaded && bikes.length > 0) {
      localStorage.setItem('mtb-tracker-bikes', JSON.stringify(bikes))
    }
  }, [bikes, isLoaded])

  // Save current bike ID separately
  useEffect(() => {
    if (isLoaded && currentBikeId) {
      localStorage.setItem('mtb-tracker-current-bike-id', currentBikeId)
    }
  }, [currentBikeId, isLoaded])

  const handleBikeChange = (bike) => {
    setCurrentBikeId(bike.id)
  }

  const handleAddBike = () => {
    setShowAddBikeModal(true)
  }

  const handleSaveBike = (newBike) => {
    setBikes(prevBikes => [...prevBikes, newBike])
    setCurrentBikeId(newBike.id) // Switch to the new bike
  }

  const handleDeleteBike = (bikeId) => {
    setBikes(prevBikes => {
      const updatedBikes = prevBikes.filter(bike => bike.id !== bikeId)
      
      // If we deleted the current bike, switch to another bike or null
      if (bikeId === currentBikeId) {
        const newCurrentBike = updatedBikes.length > 0 ? updatedBikes[0] : null
        setCurrentBikeId(newCurrentBike?.id || null)
      }
      
      return updatedBikes
    })
  }

  const handleEditBike = (bike) => {
    setBikeToEdit(bike)
    setShowEditBikeModal(true)
  }

  const handleSaveEditedBike = (updatedBike) => {
    setBikes(prevBikes => 
      prevBikes.map(bike => 
        bike.id === updatedBike.id ? updatedBike : bike
      )
    )
    setShowEditBikeModal(false)
    setBikeToEdit(null)
  }

  const handleUpdateConfiguration = (bikeId, updatedConfig) => {
    setBikes(prevBikes => 
      prevBikes.map(bike => 
        bike.id === bikeId 
          ? { ...bike, configuration: updatedConfig }
          : bike
      )
    )
  }

  const handleUpdateLinks = (bikeId, updatedLinks) => {
    setBikes(prevBikes => 
      prevBikes.map(bike => 
        bike.id === bikeId 
          ? { ...bike, links: updatedLinks }
          : bike
      )
    )
  }

  const handleUpdateMaintenance = (bikeId, updatedMaintenanceItems) => {
    setBikes(prevBikes => 
      prevBikes.map(bike => 
        bike.id === bikeId 
          ? { ...bike, maintenanceItems: updatedMaintenanceItems }
          : bike
      )
    )
  }

  const handleManageBikes = () => {
    // Navigation to manage bikes page will be handled by React Router
    // This function can be used for additional logic if needed
  }

  // Data backup and restore functions
  const handleExportData = () => {
    const dataToExport = {
      bikes,
      currentBikeId,
      exportDate: new Date().toISOString(),
      version: '2.1'
    }
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mtb-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        if (importedData.bikes && Array.isArray(importedData.bikes)) {
          setBikes(importedData.bikes)
          if (importedData.currentBikeId) {
            setCurrentBikeId(importedData.currentBikeId)
          }
          // Save to localStorage
          localStorage.setItem('mtb-tracker-bikes', JSON.stringify(importedData.bikes))
          localStorage.setItem('mtb-tracker-data-version', '2.1')
          if (importedData.currentBikeId) {
            localStorage.setItem('mtb-tracker-current-bike-id', importedData.currentBikeId)
          }
          alert('Data imported successfully!')
        } else {
          alert('Invalid file format')
        }
      } catch (error) {
        alert('Error reading file: ' + error.message)
      }
    }
    reader.readAsText(file)
    // Reset the input
    event.target.value = ''
  }

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: 'rgba(0, 114, 206, 0.08)' }}>
        <Navbar
          bikes={bikes}
          currentBike={currentBike}
          onBikeChange={handleBikeChange}
          onAddBike={handleAddBike}
          onManageBikes={handleManageBikes}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard bikes={bikes} onAddBike={handleAddBike} />} 
            />
            <Route 
              path="/bike-details" 
              element={<BikeDetails currentBike={currentBike} onUpdateLinks={handleUpdateLinks} />} 
            />
            <Route 
              path="/maintenance" 
              element={<Maintenance currentBike={currentBike} onUpdateMaintenance={handleUpdateMaintenance} />} 
            />
            <Route 
              path="/config" 
              element={<Configuration currentBike={currentBike} onUpdateConfiguration={handleUpdateConfiguration} />} 
            />
            <Route 
              path="/manage-bikes" 
              element={<BikeManagement bikes={bikes} onDeleteBike={handleDeleteBike} onEditBike={handleEditBike} />} 
            />
          </Routes>
        </main>
        
        <AddBikeModal
          isOpen={showAddBikeModal}
          onClose={() => setShowAddBikeModal(false)}
          onSave={handleSaveBike}
        />
        
        <EditBikeModal
          isOpen={showEditBikeModal}
          onClose={() => {
            setShowEditBikeModal(false)
            setBikeToEdit(null)
          }}
          onSave={handleSaveEditedBike}
          bike={bikeToEdit}
        />
      </div>
    </Router>
  )
}

export default App
