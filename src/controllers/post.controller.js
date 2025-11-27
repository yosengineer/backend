import { Post } from '../models/post.model.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        // Basic validation
        if (!name || !description || !age) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create new post
        const newPost = await Post.create({ name, description, age });
        await newPost.save();

        return res.status(201).json({
            message: 'Post created successfully.',
            post: newPost
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        // Basic validation to check if the body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided for update.' });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        
        return res.status(200).json({
            message: 'Post updated successfully.',
            post
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

export { createPost, getPosts, updatePost, deletePost };