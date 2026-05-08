export interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const initialFoods: Food[] = [
  { id: 1, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 2, name: 'White Rice (100g, cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 3, name: 'Brown Rice (100g, cooked)', calories: 112, protein: 2.6, carbs: 24, fat: 0.9 },
  { id: 4, name: 'Eggs (Large, 1)', calories: 72, protein: 6, carbs: 0.6, fat: 5 },
  { id: 5, name: 'Whey Protein (1 scoop)', calories: 120, protein: 24, carbs: 3, fat: 1.5 },
  { id: 6, name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { id: 7, name: 'Oats (100g, raw)', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { id: 8, name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 9, name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
  { id: 10, name: 'Almonds (100g)', calories: 579, protein: 21, carbs: 22, fat: 50 },
  { id: 11, name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fat: 8 },
  { id: 12, name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { id: 13, name: 'Cottage Cheese (100g)', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 }
];
