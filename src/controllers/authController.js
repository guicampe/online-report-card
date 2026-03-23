const pool = require("../config/db");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Senha inválida" });
        }

        res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
}