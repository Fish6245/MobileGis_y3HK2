const pool = require("../db");

exports.getTraffic = async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      color,
      ST_AsGeoJSON(geom) as geometry
    FROM traffic
  `);

  const data = result.rows.map((r) => ({
    id: r.id,
    color: r.color,
    coordinates: JSON.parse(r.geometry).coordinates,
  }));

  res.json(data);
};
