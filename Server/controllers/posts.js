import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

  
import express from 'express';

export const getPosts = async (req,res) => {

    try{
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
    } catch (error) {
     res.status(400).json( { message: error.message });
    }
};



export const createPosts = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
     await newPost.save();
     res.status(201).json( { message: 'insertion reussi' }) ;
    
    } catch (error) {
        res.status(409).json( { message: error.message });

    }
};

export const updatePost = async (req,res) => {
    const {id : _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with this id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post , {new :true} );

    res.json(updatedPost);
    
}

export const deletePost = async (req,res) => {
    const { id } = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');

    await PostMessage.findByIdAndRemove(id);

    res.json( { message : "post deleted successfuly !"} );
    
}

export const likePost = async (req,res) => {

    const { id } = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');

    const post = await PostMessage.findById(id);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount : post.likeCount + 1} , {new :true} );

    res.json(updatedPost);
    

}


