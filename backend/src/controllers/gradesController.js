const pool = require("../config/db");
const { pushIfDefined } = require("../utils/pushIfDefined");
const { verifyRowsLength } = require("../utils/verifyRowsLength");
const { resolveValue } = require("../utils/resolveValue");
const { isValueValid } = require("../utils/isValueValid");

const getAllGrades = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT users.id, users.name, users.email,
            grades.grade1, grades.grade2, grades.average,
            grades.total_classes, grades.absences, grades.attendance,
            subjects.id AS subject_id, subjects.name AS subject_name
            FROM grades
            JOIN users ON grades.user_id = users.id
            JOIN subjects ON grades.subject_id = subjects.id
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

        const result = await pool.query(`
            SELECT grades.grade1, grades.grade2, grades.average,
            grades.total_classes, grades.absences, grades.attendance,
            subjects.id AS subject_id, subjects.name AS subject_name
            FROM grades 
            JOIN subjects ON grades.subject_id = subjects.id
            WHERE user_id = $1
            `, [userId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma nota encontrada")) return; 
        
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getGradesById = async (req, res, next) => {
    try {
        const { userId }  = req.params;

        const result = await pool.query(`
            SELECT grades.grade1, grades.grade2, grades.average,
            grades.total_classes, grades.absences, grades.attendance,
            subjects.id AS subject_id, subjects.name AS subject_name
            FROM grades 
            JOIN subjects ON grades.subject_id = subjects.id
            WHERE user_id = $1
            `, [userId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma nota encontrada")) return; 
        
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateGrades = async (req, res, next) => {
    try {
        const { userId, subjectId } = req.params;
        const { grade1, grade2, total_classes, absences } = req.body;

        const current = await pool.query(
            "SELECT grade1, grade2, total_classes, absences FROM grades WHERE user_id = $1 AND subject_id = $2",
            [userId, subjectId]
        );

        const curr = current.rows[0] || {};
        const g1 = resolveValue(grade1, current.grade1);
        const g2 = resolveValue(grade2, current.grade2);
        const tc = resolveValue(total_classes, current.total_classes);
        const ab = resolveValue(absences, current.absences);

        const average = isValueValid(g1, g2)
            ? (parseFloat(g1) + parseFloat(g2)) / 2
            : null;
        
        const attendance = isValueValid(tc, ab)
            ? Math.ceil(((tc - ab) / tc) * 100)
            : null;

        const result = await pool.query(`
            INSERT INTO grades (user_id, subject_id, grade1, grade2, total_classes, absences, average, attendance)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (user_id, subject_id) DO UPDATE
            SET grade1 = COALESCE(EXCLUDED.grade1, grades.grade1),
                grade2 = COALESCE(EXCLUDED.grade2, grades.grade2),
                total_classes = COALESCE(EXCLUDED.total_classes, grades.total_classes),
                absences = COALESCE(EXCLUDED.absences, grades.absences),
                average = COALESCE(EXCLUDED.average, grades.average),
                attendance = COALESCE(EXCLUDED.attendance, grades.attendance)
            RETURNING *
            `, [userId, subjectId, grade1 ?? null, grade2 ?? null, total_classes ?? null, absences ?? null, average, attendance]
        )

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteGrades = async (req, res, next) => {
    try {
        const { userId, subjectId } = req.params;

        const result = await pool.query(`
            DELETE FROM grades 
            WHERE user_id = $1 
            AND subject_id = $2 
            RETURNING id
            `, [userId, subjectId]
        )

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma nota encontrada")) return;

        res.status(204).json();
    } catch (error) {
        next (error);
    }
}

module.exports = { 
    getAllGrades, 
    getMyGrades,
    getGradesById, 
    updateGrades,
    deleteGrades,
}