const connection = require('../models/db.connection');
const express = require('express');
const { authorized } = require('../models/db.connection');
const router = express.Router();


router.patch('/update',(req, res) => {
    let student = req.body;
    var query = "update student set name=?,lastName=?,age=?,address=?,nationality=? WHERE id=?";
    connection.query(query,
        [student.name,
        student.lastName,
        student.age,
        student.address,
        student.nationality,
        student.id
        ],
        (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "id does not exits" })
                }
                return res.status(200).json({ message: "updated successfully" })
            }
            else {
                return res.status(500).json(err)
            }
        })
})

router.delete('/delete/:id', (req, res) => {
    var query = "delete from student where id=?";
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "user is does not exit" })
            }
            return res.status(200).json({ message: "deleted successfully" })
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.delete('/delete',(req,res)=>{
  var query = "delete from student";
  connection.query(query,(err,result)=>{
    if(!err){
        return res.status(200).json({message:"data is deleted successfully "})
    }
    else{
        return res.status(500).json(err)
    }
  })
})

module.exports = router;


// CURD OF APIS FINISHED 


// UPDATE BY ID (NOT WORKING)
router.put('update/:id', (req, res) => {
    const UserId = req.params.id;
    let student = req.body;
    let query3 = "update student set name=?,lastName=?,age=?,address=?,nationality=? WHERE id=?"

    connection.query(query3,
        [student.name,
        student.lastName,
        student.age,
        student.address,
        student.nationality],
        [UserId], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
});