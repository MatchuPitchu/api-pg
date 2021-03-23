const pool = require('../db/pg');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNew = async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;
    const result = await pool.query('INSERT INTO users(first_name, last_name, age) values($1, $2, $3) RETURNING *;', [
      first_name,
      last_name,
      age
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
    if (!result.rowCount) res.status(404).json({ message: 'No user found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  try {
    const result = await pool.query('UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;', [
      first_name,
      last_name,
      age,
      id
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1;', [id]);
    res.json({ message: 'Success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, createNew, getSingle, update, remove };
