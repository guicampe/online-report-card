const pool = require("../config/db");

const getAllUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT id, name, email FROM users")

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}