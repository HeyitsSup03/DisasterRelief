import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, MapPin, Package, Building2 } from 'lucide-react';
import { RouteData } from '../types';

interface RouteSummaryProps {
  routes: RouteData[];
  isVisible: boolean;
  onUpdateRoutes: (newRoutes: RouteData[]) => void; // 🔁 Add this to allow updating from parent
}

export default function RouteSummary({ routes, isVisible, onUpdateRoutes }: RouteSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isVisible) return null;

  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const totalFood = routes.reduce((sum, route) => sum + route.deliveries.food, 0);
  const totalMedkits = routes.reduce((sum, route) => sum + route.deliveries.medkits, 0);

  const generatePlan = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/generate_plan", {
        method: "POST",
      });
      const routePlan: RouteData[] = await res.json();
      onUpdateRoutes(routePlan); // 🔁 Update parent-held route data
    } catch (err) {
      console.error("Error generating plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
      >
        {/* ...summary header */}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          {/* ✅ Generate Plan Button */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={generatePlan}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>
          </div>

          {/* ...rest of table stays the same */}
        </div>
      )}
    </div>
  );
}
