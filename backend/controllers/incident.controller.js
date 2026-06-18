const pool = require("../db");

// ALL INCIDENTS
exports.getAll = async (req, res) => {
  const result = await pool.query(`
    SELECT id, title, description, type,
           ST_X(geom) as lng,
           ST_Y(geom) as lat
    FROM incidents
    ORDER BY created_at DESC
  `);

  res.json(result.rows);
};

// CREATE
exports.create = async (req, res) => {
  const { title, description, type, lat, lng } = req.body;

  const result = await pool.query(
    `
    INSERT INTO incidents (title, description, type, geom)
    VALUES ($1, $2, $3,
      ST_SetSRID(ST_MakePoint($4, $5), 4326)
    )
    RETURNING *
  `,
    [title, description, type, lng, lat],
  );

  res.json(result.rows[0]);
};

// NEARBY 5KM (CORE GIS FEATURE)
exports.getNearby = async (req, res) => {
  const { lat, lng } = req.query;

  const result = await pool.query(
    `
    SELECT id, title, description, type,
           ST_X(geom) as lng,
           ST_Y(geom) as lat
    FROM incidents
    WHERE ST_DWithin(
      geom::geography,
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
      5000
    )
  `,
    [lng, lat],
  );

  res.json(result.rows);
};
