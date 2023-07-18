const validator = require('../helpers/validate');
const newInventory = async (req, res, next) => {
    const validationRule = {
        "productCategory": "required|string",
        "productName": "required|string",
        "productDescription": "string",
        "brand": "required|string",
        "countryOrigin": "string",
        "productWidth": "integer",
        "productHeight": "integer",
        "productVolume": "integer",
        "productWeight": "integer",
        "packType": "string",
        "expiryDate": "date",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const newTask = async (req, res, next) => {
    const validationRule = {
        "taskName": "string|required",
        "taskInitiator": "string|required",
        "taskStartDate": "date|required",
        "responsiblePerson": "string|required",
        "taskDeadline": "date|required",
        "taskOutcome": "string",
        "assignedtask": "string",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const newUserInfo = async (req, res, next) => {
    const validationRule = {
            "firstName": "string | required ",
            "lastName": "string | required",
            "email": "email | required ",
            "phoneNumber": "integer",
            "birthday": "date",
            "address": "string",
            "interest": "string",
            "occupation": {
                "jobTitle": "string",
                "responsibilities": "string",
                "education": "string",
                "expertise": "string",
                "skills": "string",
                "salary": "string"
            }, 
            "emergencyContact": {
                "firstName": "string",
                "lastName": "string",
                "phoneNumber": "integer",
                "email": "email",
                'address': "string"
            }
        };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const newTeam = async (req, res, next) => {
    const validationRule = {
        "teamName": "string | required"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    newInventory,
    newTask,
    newUserInfo,
    newTeam
};