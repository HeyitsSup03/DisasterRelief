import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { Village, FormErrors } from '../types';

interface VillageFormProps {
  onAddVillage: (village: Omit<Village, 'id'>) => void;
  onSubmitSuccess?: () => void;
}

export default function VillageForm({ onAddVillage, onSubmitSuccess }: VillageFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    foodKitsNeeded: '',
    medkitsNeeded: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Village name is required';
    if (!formData.latitude) newErrors.latitude = 'Latitude is required';
    if (!formData.longitude) newErrors.longitude = 'Longitude is required';
    if (!formData.foodKitsNeeded) newErrors.foodKitsNeeded = 'Food kits needed is required';
    if (!formData.medkitsNeeded) newErrors.medkitsNeeded = 'Medkits needed is required';

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (!isNaN(lat) && (lat < -90 || lat > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    if (!isNaN(lng) && (lng < -180 || lng > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const payload: Omit<Village, 'id'> = {
      name: formData.name.trim(),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      foodKitsNeeded: parseInt(formData.foodKitsNeeded),
      medkitsNeeded: parseInt(formData.medkitsNeeded)
    };

    // Pass to parent
    onAddVillage(payload);

    // Reset form
    setFormData({
      name: '',
      latitude: '',
      longitude: '',
      foodKitsNeeded: '',
      medkitsNeeded: ''
    });

    setErrors({});
    setLoading(false);

    if (onSubmitSuccess) onSubmitSuccess();
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
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add Village</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="village-name" className="block text-sm font-medium text-gray-700 mb-2">Village Name</label>
          <input
            id="village-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter village name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          {['latitude', 'longitude'].map(coord => (
            <div key={coord}>
              <label htmlFor={`village-${coord}`} className="block text-sm font-medium text-gray-700 mb-2">
                {coord.charAt(0).toUpperCase() + coord.slice(1)}
              </label>
              <input
                id={`village-${coord}`}
                type="number"
                step="any"
                value={formData[coord]}
                onChange={(e) => handleChange(coord, e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${errors[coord] ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                placeholder={coord === 'latitude' ? "22.5726" : "88.3639"}
              />
              {errors[coord] && <p className="mt-1 text-sm text-red-600">{errors[coord]}</p>}
            </div>
          ))}
        </div>

        {/* Kits */}
        <div className="grid grid-cols-2 gap-4">
          {['foodKitsNeeded', 'medkitsNeeded'].map(kits => (
            <div key={kits}>
              <label htmlFor={kits} className="block text-sm font-medium text-gray-700 mb-2">
                {kits === 'foodKitsNeeded' ? 'Food Kits Needed' : 'Medkits Needed'}
              </label>
              <input
                id={kits}
                type="number"
                min="0"
                value={formData[kits]}
                onChange={(e) => handleChange(kits, e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${errors[kits] ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                placeholder={kits === 'foodKitsNeeded' ? '50' : '15'}
              />
              {errors[kits] && <p className="mt-1 text-sm text-red-600">{errors[kits]}</p>}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          {loading ? 'Adding...' : 'Add Village'}
        </button>
      </form>
    </div>
  );
}
