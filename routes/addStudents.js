const connection = require('../models/db.connection');
const express = require('express');
const router = express.Router();
// ADD STUDENTS 
router.post('/add', (req, res) => {
    let student = req.body;
    var query1 = "insert into student (name,lastName,age,address,nationality) values (?,?,?,?,?)";
    connection.query(query1, [
        student.name,
        student.lastName,
        student.age,
        student.address,
        student.nationality
    ], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "student is added", result })
        }
        else {
            return res.status(500).json(err)
        }
    })
});
// GET ALL STUDENTS
router.get('/getAllStudents', (req, res) => {
    var query2 = "select * from student"
    connection.query(query2, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err);
        }
    })
});
// UPDATE BY BODY ID
router.put('/update/:id', (req, res) => {
    let id = req.params.id
    let student = req.body;
    var query5 = "update student set name=?,lastName=?,age=?,address=?,nationality=? where id=" + id;
    connection.query(query5,
        [student.name,
        student.lastName,
        student.age,
        student.address,
        student.nationality,
        student.id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "student id does not found" })
                }
                return res.status(200).json({ message: "student updated successfully" });
            }
            else {
                return res.status(500).json(err)
            }
        })
});

// DELETE BY ID
router.delete('/delete/:id', (req, res) => {
    // const id = req.params.id;
    var query6 = "delete from student where id=" + req.params.id;
    connection.query(query6, (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Student id does not exits" })
            }
            return res.status(200).json({ message: "Student deleted successfully" })
        }
        else {
            return res.status(500).json(err)
        }
    })
});

// DELETE ALL VALUES 
router.delete('/delete', (req, res) => {
    var query7 = "DELETE FROM student";
    // connection.query(query, (err, result) => {
    //     if (err) throw err;
    //     res.send(result)
    // })
    connection.query(query7, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "data is deleted", result })
        }
        else {
            return res.status(500).json(err)
        }
    })
})
// GET STUDENT BY ID  
router.get('/getById/:id', (req, res) => {
    let id = req.params.id
    var query = "select * from student where id=" + id;
    // connection.query(query, (err, result) => {
    //     if (err) throw err;
    //     res.send(result)
    // })
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({ msg: "success", result })
        }
        else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router;



