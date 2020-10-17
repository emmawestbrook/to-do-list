const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const { response } = require('express');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "tasks" ("task", "is_complete")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.is_complete])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    let task = req.body; // task with updated status
    let id = req.params.id; // id of the task to update
    console.log(`Updating task ${id} with `, task);
    let queryString = `UPDATE "tasks" SET "is_complete"=TRUE WHERE "id"=$1;`;
    pool.query(queryString, [id])
        .then(result => {
            console.log("result from PUT", result);
            res.sendStatus(200);
        }).catch(err => {
            console.log("error from put", 500);
            res.sendStatus(500);
        })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id; // id of the thing to delete
    console.log('Delete task with id of', id);
    const queryString = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryString, [id])
        .then(response => {
            console.log("deleted");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log("error!", err);
            res.sendStatus(500);
        })
});


module.exports = router;