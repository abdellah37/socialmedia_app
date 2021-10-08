import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import express from 'express';



export const signup = async (req,res) => {

    const { email , password , firstName, lastName , confirmedpass } = req.body ; 

    console.log(email);

    try{
        const existingUser = await User.findOne( { email } );

        console.log(existingUser);

        if (existingUser) return res.status(404).json( { message : " user already exist " } );

        if ( password !== confirmedpass) res.status(404).json(  { message : " passwored doesn't match "} );

        const hashedPassword = await bcrypt.hash(password, 12);

        console.log(hashedPassword);

        const result = await User.create( { email : email , password : hashedPassword , name : `${firstName} ${lastName}`});

        console.log(result);

        const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );
    

        console.log(token);
    

        res.status(200).json({ result , token });
    
    } catch (error) {                                    

        res.status(409).json( { message: error });

    }
};









export const signin = async (req,res) => {
    const { email , password } = req.body;
    
    try{
        const existingUser = await User.findOne( { email } );
        


        if (!existingUser) return res.status(404).json( { message : " User doesn't exist " } );

        const comparePassword = await bcrypt.compare(password, existingUser.password);

    
        console.log("compare" , comparePassword);
    

        if (!comparePassword) return res.status(400).json( { message : "password invalid "} );

        
        const token = jwt.sign( { email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" } );

        res.status(200).json({ result: existingUser , token });
        console.log("token" , token);
    
    } catch (error) {

        res.status(409).json( { message: error.message });

    }
};




