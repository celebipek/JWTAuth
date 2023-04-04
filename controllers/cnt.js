const User = require('../models/User');

exports.deneme = async (req,res)=>{
    const userss = await User.find({});
    res.status(200).render('home',{
        userss
    })
}

exports.create = async (req,res)=>{
    console.log(req.body);

    const userss = await User.create({...req.body});
    res.status(201).json({
        message: 'Eklendi',
        userss
    })
}
