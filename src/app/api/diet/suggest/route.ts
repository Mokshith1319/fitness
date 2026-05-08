import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const goal = searchParams.get('goal') || 'muscle_gain';
  const weight = parseInt(searchParams.get('weight') || '75', 10);

  let targetCalories = 0;
  let targetProtein = 0;

  if (goal === 'muscle_gain') {
    targetCalories = weight * 2.2 * 16; // rough estimate
    targetProtein = weight * 2.2; // 1g per lb
  } else if (goal === 'weight_loss') {
    targetCalories = weight * 2.2 * 12;
    targetProtein = weight * 2.2 * 1.2; // higher protein for retention
  } else {
    // maintenance
    targetCalories = weight * 2.2 * 14;
    targetProtein = weight * 2.2 * 0.8;
  }

  const schedule = [
    {
      time: "08:00 AM",
      meal: "Breakfast",
      suggestion: "Oats with Whey Protein and a spoonful of Peanut Butter.",
      reason: "Provides slow-digesting carbs for sustained energy and fast-acting protein to break the overnight fast."
    },
    {
      time: "11:00 AM",
      meal: "Mid-Morning Snack",
      suggestion: "Greek Yogurt with a handful of Almonds.",
      reason: "High in casein protein for steady amino acid release, plus healthy fats for satiety."
    },
    {
      time: "01:00 PM",
      meal: "Lunch",
      suggestion: "Chicken Breast, Brown Rice, and Broccoli.",
      reason: "Lean protein for muscle repair, complex carbs to refuel glycogen, and micronutrients."
    },
    {
      time: "04:30 PM",
      meal: "Pre-Workout (60-90 mins before training)",
      suggestion: "Sweet Potato or White Rice with a small portion of easily digestible protein (e.g., egg whites).",
      reason: "Quick energy source for the upcoming training session without sitting heavy in the stomach."
    },
    {
      time: "07:00 PM",
      meal: "Post-Workout (Within 60 mins after training)",
      suggestion: "Whey Protein shake immediately, followed by Salmon and White Rice 45 mins later.",
      reason: "Fast-absorbing protein to kickstart recovery, simple carbs to spike insulin and drive nutrients into muscles."
    },
    {
      time: "09:30 PM",
      meal: "Before Bed",
      suggestion: "Cottage Cheese",
      reason: "Rich in slow-digesting casein protein to feed muscles overnight."
    }
  ];

  return NextResponse.json({
    targets: {
      calories: Math.round(targetCalories),
      protein: Math.round(targetProtein),
      carbs: Math.round(targetCalories * 0.4 / 4), // 40% of calories from carbs
      fat: Math.round(targetCalories * 0.25 / 9) // 25% of calories from fat
    },
    schedule
  });
}
