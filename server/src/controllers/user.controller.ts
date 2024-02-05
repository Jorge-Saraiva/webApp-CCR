import { Request, Response } from 'express';
import connection from '../db/connection';

export const getUsers = (req: Request, res: Response) => {
    connection.query('SELECT * FROM users', (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}


export const getUsersById = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query(`DELETE FROM users WHERE id = ${id}`, (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Usuário excluído com sucesso"
        })
    })
}

export const createUser = (req: Request, res: Response) => {
    const { body } = req;

    connection.query('INSERT INTO users SET ?', [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Usuário criado com sucesso"
        })
    })
}

export const updateUser = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    connection.query('UPDATE users SET ? WHERE id = ?', [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Usuário alterado com sucesso"
        })
    })
}