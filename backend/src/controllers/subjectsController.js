const pool = require("../config/db");
const { verifyRowsLength } = require("../utils/verifyRowsLength");

const getAllSubjects = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT id, name FROM subjects ORDER BY name ASC"
        )

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getMySubjects = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(`
            SELECT subjects.id, subjects.name
            FROM subjects
            JOIN grades ON grades.subject_id = subjects.id
            WHERE grades.user_id = $1
            `, [userId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma matéria encontrada")) return;

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getSubjectById = async (req, res, next) => {
    try {
        const { subjectId } = req.params;

        const result = await pool.query(
            "SELECT id, name FROM subjects WHERE id = $1",
            [subjectId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Matéria não encontrada")) return;
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getSubjectsById = async (req, res, next) => {
    try {
        const { subjectId }  = req.params;

        const result = await pool.query(`
            SELECT
                users.id AS user_id,
                users.name AS user_name,
                subjects.name AS subject_name,
                grades.grade1,
                grades.grade2,
                grades.average,
                grades.total_classes,
                grades.absences,
                grades.attendance
            FROM grades
            JOIN users ON grades.user_id = users.id
            JOIN subjects ON grades.subject_id = subjects.id
            WHERE grades.subject_id = $1
            `, [subjectId]
        );

        if (verifyRowsLength(result.rows, res, 404, "Nenhuma aluno(a) encontrado(a)")) return; 
        
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const createSubject = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await pool.query(
            "INSERT INTO subjects (name) VALUES ($1) RETURNING id, name",
            [name]
        )

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const addStudentToSubject = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        const { userId } = req.body;

        const result = await pool.query(`
                INSERT INTO grades (user_id, subject_id)
                VALUES ($1, $2)
                RETURNING *
            `, [userId, subjectId]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateSubject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await pool.query(
            "UPDATE subjects SET name = $1 WHERE id = $2 RETURNING id, name",
            [name, id]
        )

        if (verifyRowsLength(result.rows, res, 404, "Matéria não encontrada")) return;

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteSubject = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM subjects WHERE id = $1 RETURNING id",
            [id]
        )

        if (verifyRowsLength(result.rows, res, 404, "Matéria não encontrada")) return;

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllSubjects,
    getMySubjects,
    getSubjectById,
    getSubjectsById,
    createSubject,
    addStudentToSubject,
    updateSubject,
    deleteSubject,
}