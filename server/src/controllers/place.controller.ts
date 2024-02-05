import { Request, Response } from 'express';
import connection from '../db/connection';

export const getPlaces = (req: Request, res: Response) => {
    connection.query('SELECT * FROM places', (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}

export const getPlacesById = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM places WHERE id = ${id}`, (err, data) => {
        if (err) throw err;
        res.json(data[0])
    })
}

export const deletePlace = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query(`DELETE FROM places WHERE id = ${id}`, (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Endereço excluído com sucesso"
        })
    })
}

export const createPlace = (req: Request, res: Response) => {
    const { body } = req;

    connection.query('INSERT INTO places SET ?', [body], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Endereço criado com sucesso"
        })
    })
}

export const updatePlace = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    connection.query('UPDATE places SET ? WHERE id = ?', [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: "Endereço alterado com sucesso"
        })
    })
}