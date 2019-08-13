var express  = require('express');
var router   = express.Router();
//dodala dva za autentifikaciju
var passport=require('passport');
var jwt=require('jsonwebtoken');

var User     = require('../models/user');
var Hotel    = require('../models/hotel');
var Booking  = require('../models/reservation');

const bcrypt = require('bcryptjs');
//za verifikaciju
/*
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if(req.decoded.data.isAdmin==true)
        {
            next();
        }
        else {
            return res.status(401).json({
                title: 'Not Authenticated to perform this operation',
                error: err
            });
        }
    });
});*/
/*
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
       var decoded = jwt.decode(req.query.token);
       console.log(decoded.user.isAdmin);
       if(decoded.user.isAdmin){
           next();
       }
       else if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        
       
        
    })
});
*/


router.post('/addHotel', function(req, res,next) {
    console.log("STIGAO");
    var decoded = jwt.decode(req.query.token);
  //  console.log(decoded);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        
        var hotel = new Hotel({
            name         : req.body.name,
            price        : req.body.price,
            category     : req.body.category,
            roomCount    : req.body.roomCount
        });
        hotel.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //user.notes.push(result);
            //user.save();
            res.status(201).json({
                message: 'Saved hotel',
                obj: result
            });
       });
    });
});

router.delete('/deleteHotel',  function(req, res,next) {
    console.log("stigao");
  //  var decoded = jwt.decode(req.query.token);
    Hotel.findOne(req.params.id,function (err, hotel) {
         console.log(req.params.id);
         console.log(req.body.hotel_id);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!hotel) {
            console.log("Plaki");
            return res.status(500).json({
                title: 'No Hotel Found!',
                error: {message: 'Hotel not found'}
            });
        }
        /*if (note.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        */
        hotel.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted hotel',
                obj: result
            });
        });
    });
});

//brisanje korisnika
router.delete('/deleteUser',  function(req, res,next) {
    var decoded = jwt.decode(req.query.token);
    User.findOne(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No Note Found!',
                error: {message: 'User not found'}
            });
        }
        /*
        if (note.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }*/
        user.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted user',
                obj: result
            });
        });
    });
});
module.exports = router;