import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function getDb() {
  if (db) {
    return db;
  }

  db = await open({
    filename: './gymdiet.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      calories REAL NOT NULL,
      protein REAL NOT NULL,
      carbs REAL NOT NULL,
      fat REAL NOT NULL
    );
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM foods');
  if (count.count === 0) {
    // Seed database
    const initialFoods = [
      { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { name: 'White Rice (100g, cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
      { name: 'Brown Rice (100g, cooked)', calories: 112, protein: 2.6, carbs: 24, fat: 0.9 },
      { name: 'Eggs (Large, 1)', calories: 72, protein: 6, carbs: 0.6, fat: 5 },
      { name: 'Whey Protein (1 scoop)', calories: 120, protein: 24, carbs: 3, fat: 1.5 },
      { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
      { name: 'Oats (100g, raw)', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
      { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
      { name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
      { name: 'Almonds (100g)', calories: 579, protein: 21, carbs: 22, fat: 50 },
      { name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fat: 8 },
      { name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { name: 'Cottage Cheese (100g)', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 }
    ];

    const stmt = await db.prepare('INSERT INTO foods (name, calories, protein, carbs, fat) VALUES (?, ?, ?, ?, ?)');
    for (const food of initialFoods) {
      await stmt.run(food.name, food.calories, food.protein, food.carbs, food.fat);
    }
    await stmt.finalize();
  }

  return db;
}
