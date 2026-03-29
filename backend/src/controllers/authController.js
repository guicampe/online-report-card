const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyRowsLength } = require("../utils/verifyRowsLength");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        )
        
        await pool.query(
            "INSERT INTO grades (user_id) VALUES ($1)",
            [result.rows[0].id]
        )
        

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

        if (verifyRowsLength(result.rows, res, 401, "Credenciais inválidas")) return;
        
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Senha inválida" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
}