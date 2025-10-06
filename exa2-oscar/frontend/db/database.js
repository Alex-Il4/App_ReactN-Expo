//inicializar base de datos

export async function initializeDatabase(db) {
    //crear tabla para guardar los datos
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            puertas INTEGER NOT NULL,
            formattedPrice TEXT NOT NULL,
            reviewCount INTEGER,
            imageUrl TEXT NOT NULL,
            imageAlt TEXT,
            rating REAL DEFAULT 4.5
        );
    `);
}