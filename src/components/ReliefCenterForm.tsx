import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { ReliefCenter, FormErrors } from '../types';

interface ReliefCenterFormProps {
  onAddReliefCenter: (center: Omit<ReliefCenter, 'id'>) => void;
}

export default function ReliefCenterForm({ onAddReliefCenter }: ReliefCenterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    foodKitsAvailable: '',
    medkitsAvailable: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Center name is required';
    if (!formData.latitude) newErrors.latitude = 'Latitude is required';
    if (!formData.longitude) newErrors.longitude = 'Longitude is required';
    if (!formData.foodKitsAvailable) newErrors.foodKitsAvailable = 'Food kits available is required';
    if (!formData.medkitsAvailable) newErrors.medkitsAvailable = 'Medkits available is required';

    if (formData.latitude && (parseFloat(formData.latitude) < -90 || parseFloat(formData.latitude) > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    if (formData.longitude && (parseFloat(formData.longitude) < -180 || parseFloat(formData.longitude) > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddReliefCenter({
        name: formData.name.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        foodKitsAvailable: parseInt(formData.foodKitsAvailable),
        medkitsAvailable: parseInt(formData.medkitsAvailable)
      });
      setFormData({
        name: '',
        latitude: '',
        longitude: '',
        foodKitsAvailable: '',
        medkitsAvailable: ''
      });
      setErrors({});
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Building2 className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add Relief Center</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="center-name" className="block text-sm font-medium text-gray-700 mb-2">
            Center Name
          </label>
          <input
            id="center-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter relief center name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="center-lat" className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              id="center-lat"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => handleChange('latitude', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.latitude ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="22.5726"
            />
            {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
          </div>
          
          <div>
            <label htmlFor="center-lng" className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              id="center-lng"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => handleChange('longitude', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.longitude ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="88.3639"
            />
            {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="food-kits-available" className="block text-sm font-medium text-gray-700 mb-2">
              Food Kits Available
            </label>
            <input
              id="food-kits-available"
              type="number"
              min="0"
              value={formData.foodKitsAvailable}
              onChange={(e) => handleChange('foodKitsAvailable', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.foodKitsAvailable ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="100"
            />
            {errors.foodKitsAvailable && <p className="mt-1 text-sm text-red-600">{errors.foodKitsAvailable}</p>}
          </div>

          <div>
            <label htmlFor="medkits-available" className="block text-sm font-medium text-gray-700 mb-2">
              Medkits Available
            </label>
            <input
              id="medkits-available"
              type="number"
              min="0"
              value={formData.medkitsAvailable}
              onChange={(e) => handleChange('medkitsAvailable', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.medkitsAvailable ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="50"
            />
            {errors.medkitsAvailable && <p className="mt-1 text-sm text-red-600">{errors.medkitsAvailable}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Add Relief Center
        </button>
      </form>
    </div>
  );
}
