import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

import express from "express";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log("pagedyalna", page);

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    console.log(startIndex);

    const total = await PostMessage.countDocuments({});
    console.log(total);

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  console.log("iddteb", _id);

  try {
    const post = await PostMessage.findById(_id);

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const searchposts = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log("back data ", searchQuery);
  console.log("back data é", tags);

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with this id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with this id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "post deleted successfuly !" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with this id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((idu) => idu === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log(comment);

  const post = await PostMessage.findById(id);

  post.comments.push(comment);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
