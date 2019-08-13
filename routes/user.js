var express  = require('express');
var router   = express.Router();
//dodala dva za autentifikaciju
var passport=require('passport');
var jwt=require('jsonwebtoken');
var expressValidator = require('express-validator');
router.use(expressValidator());

var User     = require('../models/user');
var Hotel    = require('../models/hotel');
var Booking  = require('../models/reservation');

const bcrypt = require('bcryptjs');



/*
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
   // res.redirect('/');
    return res.status(404).send("niste ulogovani");
}

function isAdminLoggedIn(req, res, next) {
    if(req.isAuthenticated() && req.user.isAdmin === true){
        return next();
    }
    res.redirect('/');
  
}


function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json( { redirect: '/login' } );
    } else {
        next();
    }
}
*/

//signup sa faksa
router.post('/signup', function (req, res, next) {
    if(!req.body.firstName){
        return res.status(442).send('Firstname is required');
    }else if(!req.body.lastName){
        return res.status(442).send('Lastname is required');
    }
    if (!req.body.email || !req.body.password) {
    
        return res.status(442).send('Email and Password required');
    }  
    var user = new User({
         firstName: req.body.firstName,
        lastName: req.body.lastName ,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin     
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

//login sa faksa
router.post('/login', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});
/*
//ne moramo da pisemo /user/signup-automatski to koristi
//route za registraciju
router.post('/signup', function(req, res, next) {

    if(!req.body.firstName){
        return res.status(442).send('Firstname is required');
    }else if(!req.body.lastName){
        return res.status(442).send('Lastname is required');
    }
    if (!req.body.email || !req.body.password) {
    
        return res.status(442).send('Email and Password required');
    }  
    
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
           // return res.json(err);
           return res.status(442).send("You got some errors1: " + JSON.stringify(err, undefined, 2));
        }
        if (user.error) {
            //return res.json({ error: user.error });
            return res.status(442).send(JSON.stringify(user.error, undefined, 2));
        }
        req.logIn(user, function(err) {
            if (err) {
                //return res.json(err);
                return res.status(442).send("You got some errors3: " + JSON.stringify(err, undefined, 2));
            }
           
           //return res.json({redirect: '/profile'});
           return res.status(200).send("Uspesno ste se registrovali");
        });
    })(req, res);
});

//route za login zahtjev
router.post('/login', function(req, res, next) {



    if(!req.body.email || !req.body.password){
        return res.json({ error: 'Email and Password required' });
    }
    passport.authenticate('local-login', function(err, user, info) {
        if(err){
            return res.status(404);
        }
        if (user.error) {
            return res.status(401).send({ error: user.error });
           
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(err);
            }
            
            return res.status(200).send("uspesno ste se ulogovali");
            
        });
    })(req, res);
});
*/

//route za logout zahtjev
router.post('/logout', function(req, res) {
    req.logout();
    res.json({ success: 'You have been logout successfully!!!.' });
});

//vraca hotele-valjda ne treba ni korisnik ni admin da bude
//radi
router.get('/getHotels', function(req,res){
    Hotel.find((err, docs) => {
        if(!err){
          
            res.send(docs);
        }else{
            console.log("Error in retrieving hotels: " + JSON.stringify(err, undefined, 2));
        }
    })
});

//da ucitam da bi mogla da ga obrisem
router.get('/getUsers',   function(req, res) {
     User.find((err, docs) => {
        if(!err){         
            res.send(docs);
        }else{
            console.log("Error in retrieving users: " + JSON.stringify(err, undefined, 2));
        }
    })
});
//za verifikaciju

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});



router.post('/addBooking', function(req, res,next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Hotel.findOne({ _id: req.body.hotel_id }, function(err, hotel){

         var booking = new Booking({
              
                creditCard : req.body.creditCard,
                roomType : req.body.roomType,
                checkInDate : new Date(req.body.checkInDate),
                checkOutDate : new Date(req.body.checkOutDate),
                hotel : req.body.hotel_id,
                user : user

                });

        console.log("id hotela: " + req.body.hotel_id);
        console.log(booking.user._id);
        console.log(decoded.user._id);
      //  console.log(user.userId);
        if(err){
            return res.json(err);
        }
         if (!hotel) {
            return res.status(500).json({
                title: 'No Hotel Found!',
                error: {message: 'Hotel not found'}
            });
        }
        
        if (booking.user._id != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        if(hotel){

            hotel.bookHotel(function(err, hotel){
                if(err){
                    throw err;
                }
                

                booking.save(function(err){
                    if (err) {
                        throw err;
                    }
                    return res.status(200).send("uspesno rezervisanje");
                });
            });
        }
        else {
            return res.json(err);
        }
        
    });
});
});
    

    /*
    Hotel.findOne({ _id: req.body.hotel_id }, function(err, hotel){

         var booking = new Booking({
              
                creditCard : req.body.creditCard,
                roomType : req.body.roomType,
                checkInDate : new Date(req.body.checkInDate),
                checkOutDate : new Date(req.body.checkOutDate),
                hotel : req.body.hotel_id,
                user : req.body.userId

                });

        console.log("id hotela: " + req.body.hotel_id);
        console.log(req.body.userId);
        console.log(decoded.user._id);
      //  console.log(user.userId);
        if(err){
            return res.json(err);
        }
         if (!hotel) {
            return res.status(500).json({
                title: 'No Hotel Found!',
                error: {message: 'Hotel not found'}
            });
        }
        
        if (booking.userId != decoded.user.id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        if(hotel){

            hotel.bookHotel(function(err, hotel){
                if(err){
                    throw err;
                }
                

                booking.save(function(err){
                    if (err) {
                        throw err;
                    }
                    return res.status(200).send("uspesno rezervisanje");
                });
            });
        }
        else {
            return res.json(err);
        }
    });
    
});*/

//DOVDJE
router.get('/api/hotels/:id?', function(req, res){
    if(req.params.id){
        Hotel.findOne({ _id: req.params.id }, function(err, hotel) {
            if (err) {
                return res.json(err);
            }
            if(hotel){
                return res.json(hotel); // return hotel in JSON format
            }
            else{
                return res.json(err);
            }
        });
    }else{
        Hotel.find(function(err, hotels) {
            if (err) {
                return res.json(err);
            }
            return res.json(hotels); // return all hotels in JSON format
        });
    }
});



//search cu da izbacim vjerovatno
router.post('/api/hotels/search',  function(req, res){
    var regex = new RegExp(req.body.term, 'i');  // 'i' makes it case insensitive
    Hotel.find({name: regex}).where('roomCount').gt(0).sort('name').exec(function(err, hotels){
        if (err) {
            return res.json(err);
        }
        if(!hotels.length){
            return res.json({ error: 'No hotel found for the given search input. ' });
        }
        Booking.find({user: req.user}).populate('hotel').exec(function(err, bookings) {
            if (err) {
                return res.json(err);
            }
            if(!bookings.length){
                return res.json(hotels); // return all hotels in JSON format
            }
            var resultHotels = [];
            for (var i = hotels.length-1; i >= 0; i--) {
                if (bookings.indexOf(hotels[i]) !==-1) {
                    resultHotels.push(hotels);
                }
            }
            if(!resultHotels.length){
                return res.json({ error: 'No hotel found for the given search input. ' });
            }
            return res.json(resultHotels); // return all hotels in JSON format
        });
    });
});


router.get('/api/bookings',  function(req, res){
    Booking.find({user: req.user}, function(err, bookings) {
        if (err) {
            return res.json(err);
        }
        return res.json(bookings); // return all bookings in JSON format
    });
});

/*
router.post('/addBooking', isLoggedIn, function(req, res){

    Hotel.findOne({ _id: req.body.hotel_id }, function(err, hotel){

        console.log("id hotela: " + req.body.hotel_id);
        if(err){
            return res.json(err);
        }
        if(hotel){
            
            hotel.bookHotel(function(err, hotel){
                if(err){
                    throw err;
                }
                
                var booking = new Booking();
              
                booking.creditCard = req.body.creditCard;  
                booking.roomType = req.body.roomType;
                booking.checkInDate = new Date(req.body.checkInDate);
                booking.checkOutDate = new Date(req.body.checkOutDate);
                booking.hotel = req.body.hotel_id;

                booking.save(function(err){
                    if (err) {
                        throw err;
                    }
                    return res.status(200).send("uspesno rezervisanje");
                });
            });
        }else{
            return res.json(err);
        }
    });
    */
/*
    var booking = new Booking();
              
    booking.creditCard = req.body.creditCard;
    booking.roomType = req.body.roomType;
    booking.checkInDate = new Date(req.body.checkInDate);
    booking.checkOutDate = new Date(req.body.checkOutDate);
  
    booking.save(function(err){
        if (err) {
            throw err;
        }
        return res.json( { redirect: '/home' } );
    });*/
    

    /*
    Hotel.findOne({ _id: req.body.hotel._id }, function(err, hotel){
        if(err){
            return res.json(err);
        }
        
        
        
        if(hotel){
            hotel.bookHotel(function(err, hotel){
                if(err){
                    throw err;
                }
                
                var booking = new Booking();
              
                booking.creditCard = req.body.creditCard;
                
                booking.roomType = req.body.roomType;
                booking.checkInDate = new Date(req.body.checkInDate);
                booking.checkOutDate = new Date(req.body.checkOutDate);
              
                booking.save(function(err){
                    if (err) {
                        throw err;
                    }
                    return res.json( { redirect: '/profile' } );
                });
            });
        }else{
            return res.json(err);
        }
    });

});
*/


router.delete('/api/bookings/:id', function(req, res){
    Booking.findOne({ _id: req.params.id, user: req.user._id}).exec(function(err, booking){
        if(err){
            return res.json(err);
        }

        if(booking){
            Hotel.findOne({ _id: booking.hotel }, function(err, hotel){
                if(err){
                    return res.json(err);
                }
                hotel.cancelHotel(function(err, hotel){
                    if(err){
                        throw err;
                    }
                    booking.remove();
                    return res.json( { redirect: '/profile' } );
                });
            });
        }else{
            return res.json(err);
        }
    });
});


router.get('*', function(req, res) {
    res.render('index', { title: 'Hotel Booking System', user: req.user ? req.user : null });
});

module.exports = router;
