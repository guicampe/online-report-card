const pool = require("../config/db");
const { pushIfDefined } = require("../utils/pushIfDefined");
const { verifyRowsLength } = require("../utils/verifyRowsLength");

const updateGrades = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { grade1, grade2, total_classes, absences } = req.body;

        const fields = [];
        const values = [];

        pushIfDefined(fields, values, "grade1", grade1);
        pushIfDefined(fields, values, "grade2", grade2);
        pushIfDefined(fields, values, "total_classes", total_classes);
        pushIfDefined(fields, values, "absences", absences);

        if (fields.length === 0) {
            return res.status(400).json({ message: "Nenhum campo para atualizar" });
        }

        const gradeResult = await pool.query(
            "SELECT grade1, grade2 FROM grades WHERE user_id = $1",
            [userId]
        );

        const current = gradeResult.rows[0];
        const g1 = grade1 !== undefined ? grade1 : current.grade1;
        const g2 = grade2 !== undefined ? grade2 : current.grade2;

        if (g1 !== null && g2 !== null) {
            fields.push(`average = $${fields.length + 1}`);
            values.push((parseFloat(g1) + parseFloat(g2)) / 2);
        }

        values.push(userId);

        const result = await pool.query(
            `UPDATE grades SET ${fields.join(", ")} WHERE user_id = $${values.length} RETURNING *`,
            values
        );

        if (verifyRowsLength(result.rows, res, 404, "Registro não encontrado")) return;
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllGrades = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT users.id, users.name, users.email,
            grades.grade1, grades.grade2, grades.average,
            grades.total_classes, grades.absences
            FROM grades
            JOIN users ON grades.user_id = users.id
            ORDER BY users.name ASC   
        `);

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getMyGrades = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT grade1, grade2, average, total_classes, absences FROM grades WHERE user_id = $1",
            [userId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma nota encontrada")) return; 
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = { updateGrades, getAllGrades, getMyGrades }