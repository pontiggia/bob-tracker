const User = require('../models/usersModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// exports.createUser = async (req, res) => {
//     try {
//         const newUser = await User.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 user: newUser
//             }
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err
//         });
//     }
// }
