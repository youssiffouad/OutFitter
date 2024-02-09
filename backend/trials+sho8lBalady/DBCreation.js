const sqlite3 = require("sqlite3").verbose();

// Open database in memory
let db = new sqlite3.Database("mydatabase.db");

// Create Users table
db.serialize(() => {
  db.run(`CREATE TABLE Users (
        user_id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        profile_photo TEXT,
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

  // Create ClothesCategories table
  db.run(`CREATE TABLE ClothesCategories (
        category_id INTEGER PRIMARY KEY,
        category_name TEXT UNIQUE
    )`);

  // Create Materials table
  db.run(`CREATE TABLE Materials (
        material_id INTEGER PRIMARY KEY,
        material_name TEXT UNIQUE
    )`);

  // Create WeatherConditions table
  db.run(`CREATE TABLE WeatherConditions (
        condition_id INTEGER PRIMARY KEY,
        condition_name TEXT UNIQUE
    )`);

  // Create OccasionTypes table
  db.run(`CREATE TABLE OccasionTypes (
        occasion_id INTEGER PRIMARY KEY,
        occasion_name TEXT UNIQUE
    )`);

  // Create Clothes table
  db.run(`CREATE TABLE Clothes (
        clothes_id INTEGER PRIMARY KEY,
        user_id INTEGER,
        category_id INTEGER,
        color TEXT,
        material_id INTEGER,
        weather_condition_id INTEGER,
        photo TEXT,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (category_id) REFERENCES ClothesCategories(category_id),
        FOREIGN KEY (material_id) REFERENCES Materials(material_id),
        FOREIGN KEY (weather_condition_id) REFERENCES WeatherConditions(condition_id)
    )`);

  // Create ClothesOccasions table
  db.run(`CREATE TABLE ClothesOccasions (
        clothes_id INTEGER,
        occasion_id INTEGER,
        PRIMARY KEY (clothes_id, occasion_id),
        FOREIGN KEY (clothes_id) REFERENCES Clothes(clothes_id),
        FOREIGN KEY (occasion_id) REFERENCES OccasionTypes(occasion_id)
    )`);

  // Create Outfits table
  db.run(`CREATE TABLE Outfits (
        outfit_id INTEGER PRIMARY KEY,
        user_id INTEGER,
        name TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )`);

  // Create OutfitClothes table
  db.run(`CREATE TABLE OutfitClothes (
        outfit_id INTEGER,
        clothes_id INTEGER,
        PRIMARY KEY (outfit_id, clothes_id),
        FOREIGN KEY (outfit_id) REFERENCES Outfits(outfit_id),
        FOREIGN KEY (clothes_id) REFERENCES Clothes(clothes_id)
    )`);

  // Create OutfitOccasions table
  db.run(`CREATE TABLE OutfitOccasions (
        outfit_id INTEGER,
        occasion_id INTEGER,
        PRIMARY KEY (outfit_id, occasion_id),
        FOREIGN KEY (outfit_id) REFERENCES Outfits(outfit_id),
        FOREIGN KEY (occasion_id) REFERENCES OccasionTypes(occasion_id)
    )`);
});

// Close the database
db.close();
