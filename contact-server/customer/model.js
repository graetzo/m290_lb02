const sql = require('../db');

module.exports = class Customer {
    //Constructor
    constructor() {
    }

    create(newCustomer, cbResult) {
        sql.query('INSERT INTO customer SET ?', newCustomer, (err,result) => {
            if (err){
                console.log('error: ',err);
                cbResult(err,null);
                return;
            }
            console.log('created contact: ', {id: result.insertId, ...newCustomer});
            cbResult(null,{
                msg: "New contact has been inserted!", id: result.insertId, ...newCustomer});
        })

    }

    getAll(cbResult){
        sql.query('SELECT * FROM customer', (err,result) => {
            if (err){
                console.log("error: ", err);
                //Return error, data = null
                cbResult(err, null);
                return;
            }
            console.log("customer: ", result);
            //err = null, return data
            cbResult(null, result);
        })
    }

    updateById(id,customer, cbResult){
        let queryString = 'Update customer SET email = ?, firstName = ?, lastName = ?, password = ?, birthdate = ?, phone = ?, message = ?, newsletter = ?';
        queryString += ' WHERE id = ?';
        sql.query(queryString,
            [customer.email, customer.firstName, customer.lastName, customer.password, customer.birthdate, customer.phone, customer.message, customer.newsletter, parseInt(id)],
            (err, result) => {
                if (err){
                    console.log("error: ", err);
                    //Return error, data = null
                    cbResult(err, null);
                    return;
                }

                if (result.affectedRows === 0){
                    // No customer found with the id
                    cbResult({kind: "not_found"}, null);
                    return;
                }

                console.log("updated customer: ", {id: id, ...customer});
                //err = null, return data
                cbResult(null, {id: id, ...customer});

            });
    }
}