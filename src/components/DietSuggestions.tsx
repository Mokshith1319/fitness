'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Dumbbell, Target } from 'lucide-react';

interface ScheduleItem {
  time: string;
  meal: string;
  suggestion: string;
  reason: string;
}

interface DietData {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  schedule: ScheduleItem[];
}

export default function DietSuggestions() {
  const [data, setData] = useState<DietData | null>(null);
  const [goal, setGoal] = useState('muscle_gain');
  const [weight, setWeight] = useState(75);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/diet/suggest?goal=${goal}&weight=${weight}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [goal, weight]);

  if (!data && !loading) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-emerald-500" />
          Diet Plan & Timings
        </h2>

        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="muscle_gain">Muscle Gain (Bulk)</option>
            <option value="weight_loss">Weight Loss (Cut)</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="bg-transparent w-16 text-white focus:outline-none"
            />
            <span className="text-zinc-400 ml-1">kg</span>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400 text-center py-8">Generating optimal plan...</p>
      ) : data ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
              <Target className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
              <div className="text-zinc-400 text-sm">Target Calories</div>
              <div className="text-xl font-bold text-white">{data.targets.calories}</div>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
              <div className="text-zinc-400 text-sm mb-2">Protein (g)</div>
              <div className="text-xl font-bold text-white">{data.targets.protein}</div>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
              <div className="text-zinc-400 text-sm mb-2">Carbs (g)</div>
              <div className="text-xl font-bold text-white">{data.targets.carbs}</div>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
              <div className="text-zinc-400 text-sm mb-2">Fat (g)</div>
              <div className="text-xl font-bold text-white">{data.targets.fat}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Schedule</h3>
            <div className="relative border-l-2 border-zinc-800 ml-3 md:ml-4 space-y-6">
              {data.schedule.map((item, index) => (
                <div key={index} className="relative pl-6 md:pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-zinc-900" />
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 hover:border-emerald-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="flex items-center text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.time}
                      </span>
                      <span className="font-bold text-white">{item.meal}</span>
                    </div>
                    <p className="text-zinc-200 mb-2 font-medium">{item.suggestion}</p>
                    <p className="text-zinc-400 text-sm italic">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
