import FoodSearch from '@/components/FoodSearch';
import DietSuggestions from '@/components/DietSuggestions';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Gym<span className="text-emerald-500">Diet</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Your personal nutrition assistant for optimal gym performance. Track macros, plan meals, and crush your goals.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <FoodSearch />
          </div>
          <div className="lg:col-span-7">
            <DietSuggestions />
          </div>
        </main>
      </div>
    </div>
  );
}
