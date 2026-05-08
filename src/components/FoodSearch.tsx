'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/food/search?q=${query}`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFoods();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Search className="w-6 h-6 text-emerald-500" />
        Food Macros Search
      </h2>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for foods (e.g., Chicken, Rice)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <p className="text-zinc-400 text-center py-4">Loading...</p>
        ) : foods.length > 0 ? (
          foods.map((food) => (
            <div key={food.id} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/50 transition-colors">
              <div>
                <h3 className="font-semibold text-white text-lg">{food.name}</h3>
                <p className="text-emerald-400 font-medium">{food.calories} kcal</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col items-center bg-zinc-900 px-3 py-1.5 rounded-md">
                  <span className="text-zinc-400 text-xs">Protein</span>
                  <span className="text-white font-medium">{food.protein}g</span>
                </div>
                <div className="flex flex-col items-center bg-zinc-900 px-3 py-1.5 rounded-md">
                  <span className="text-zinc-400 text-xs">Carbs</span>
                  <span className="text-white font-medium">{food.carbs}g</span>
                </div>
                <div className="flex flex-col items-center bg-zinc-900 px-3 py-1.5 rounded-md">
                  <span className="text-zinc-400 text-xs">Fat</span>
                  <span className="text-white font-medium">{food.fat}g</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 text-center py-4">No foods found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
