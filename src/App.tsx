import React, { useState } from 'react';
import { Heart, Rocket } from 'lucide-react';
import VillageForm from './components/VillageForm';
import ReliefCenterForm from './components/ReliefCenterForm';
import MapPanel from './components/MapPanel';
import RouteSummary from './components/RouteSummary';
import { Village, ReliefCenter, RouteData } from './types';

function App() {
  const [villages, setVillages] = useState<Village[]>([{
    id: 'village-1',
    name: 'Rampur',
    latitude: 23.51,
    longitude: 88.34,
    foodKitsNeeded: 50,
    medkitsNeeded: 20
  }]);
  const [reliefCenters, setReliefCenters] = useState<ReliefCenter[]>([{
    id: 'center-1',
    name: 'Relief Center A',
    latitude: 22.57,
    longitude: 88.36,
    foodKitsAvailable: 100,
    medkitsAvailable: 50
  }]);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddVillage = (villageData: Omit<Village, 'id'>) => {
    const newVillage: Village = {
      id: `village-${Date.now()}`,
      ...villageData
    };
    setVillages(prev => [...prev, newVillage]);
  };

  const handleAddReliefCenter = (centerData: Omit<ReliefCenter, 'id'>) => {
    const newCenter: ReliefCenter = {
      id: `center-${Date.now()}`,
      ...centerData
    };
    setReliefCenters(prev => [...prev, newCenter]);
  };

  const generateReliefPlan = async () => {
    if (villages.length === 0 || reliefCenters.length === 0) return;

    setIsGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/generate_plan", {
        method: "POST"
      });
      const data: RouteData[] = await res.json();
      console.log("API Response:", data);
      setRoutes(data);
    } catch (err) {
      console.error("Error generating relief plan:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const hasData = villages.length > 0 && reliefCenters.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Disaster Relief Optimizer</h1>
              <p className="text-sm text-gray-600">Optimize relief distribution routes for maximum impact</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <VillageForm onAddVillage={handleAddVillage} />

            <div className="border-t border-gray-200"></div>

            <ReliefCenterForm onAddReliefCenter={handleAddReliefCenter} />

            <div className="border-t border-gray-200"></div>

            {/* Generate Relief Plan Button */}
            <button
              onClick={generateReliefPlan}
              disabled={!hasData || isGenerating}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                hasData && !isGenerating
                  ? 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Rocket className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating Relief Plan...' : 'Generate Relief Plan'}
            </button>

            {!hasData && (
              <p className="text-sm text-gray-500 text-center">
                Add at least one village and one relief center to generate a plan
              </p>
            )}

            {/* Data Summary */}
            {hasData && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">Current Data</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• {villages.length} village{villages.length !== 1 ? 's' : ''} added</p>
                  <p>• {reliefCenters.length} relief center{reliefCenters.length !== 1 ? 's' : ''} added</p>
                  <p>• Total food kits needed: {villages.reduce((sum, v) => sum + v.foodKitsNeeded, 0)}</p>
                  <p>• Total medkits needed: {villages.reduce((sum, v) => sum + v.medkitsNeeded, 0)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Map & Simulation */}
          <div className="lg:col-span-3">
            <MapPanel 
              villages={villages}
              reliefCenters={reliefCenters}
              routes={routes}
            />
            <RouteSummary
              routes={routes}
              isVisible={routes.length > 0}
              onUpdateRoutes={setRoutes}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
