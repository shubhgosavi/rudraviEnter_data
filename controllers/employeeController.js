const express = require('express');
var router = express.Router();
/*const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});*/

router.get('/data', (req, res) => {
    console.log("hi");
    try{
        const data = Employee.find();
      // console.log("*********************",data);
      console.log(typeof(data));
       console.log("response changes is",data);
       res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
/*

router.get('/data', async (req, res) => {
    const items =  Employee.find();
    res.json(items);
  });

router.post('/', (req, res) => {
    console.log("hi from post employee",req.body);
    //if (req.body._id == '')
    
        insertRecord(req, res);
      //  else
        //updateRecord(req, res);
});


function insertRecord(req, res) {
    console.log("hi from post insert");

    var employee = new Employee(req.body);
    console.log("object is ------------------------------------------",employee);
    employee.save((err, doc) => {
        if (!err)
{
    console.log("hi from inserted sccess");
    //res.redirect('employee/list');
}       
        else {
    console.log("hi from  else sccess",err);

            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;


*/


const Item = require('../models/employee.model');
const model = require('../models/user')


const itemController = {
  getAllItems: async (req, res) => {
    try {
        const items = await model.find();
        console.log("itmems data",items);
        res.json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

},
  createItem: async (req, res) => {
    try {
        const newItem = new model(req.body);
        console.log(newItem);
        const savedItem = await newItem.save();
        res.json(savedItem);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
 


  },

  updateItem: async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};


module.exports = itemController;
