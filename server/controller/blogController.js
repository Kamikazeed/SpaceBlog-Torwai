import fs from 'fs'
import imagekit from '../config/imageKit.js';
import blogModel from '../model/blogModel.js';
import commentModel from '../model/commentModel.js';
import main from '../config/gemini.js';

export const addBlog = async (req, res) => {
  try {
    const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !subTitle || !imageFile || !category) {
      return res.json({success: false, message: 'Missing required fields'});
    }

    const response = await imagekit.files.upload({
      file: fs.createReadStream(imageFile.path), 
      fileName: imageFile.originalname,
      folder: '/blogs'
    });

    const optimizedImageUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        {quality: 'auto'},
        {format: 'webp'},
        {width: '1280'}
      ]
    });

    const image = optimizedImageUrl;
    await blogModel.create({title, subTitle, description, category, image, isPublished})

    res.json({success: true, message: 'Blog added successfully'});
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
    .find({isPublished: true})
    .select('title subTitle category image createdAt')
    .sort({createdAt: -1})
    .lean()

    res.json({success: true, blogs});
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const getBlogById = async (req, res) => {
  try {
    const  blogId = req.params.blogId;
    const blog = await blogModel.findById(blogId).lean()
    if (!blog) {
      return res.json({success: false, message: `Blog not found`});
    }

    res.json({success: true, blog});
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await blogModel.findByIdAndDelete(id)

    // Delete all comment associated with the blog
    await commentModel.deleteMany({blog: id});

    res.json({success: true, message: `Blog Deleted successfully`});
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await blogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save()
    res.json({success: true, message: `Blog status update`});
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const addComment = async (req, res) => {
  try {
    const {blog, name, content} = req.body;
    await commentModel.create({blog, name, content});
    res.json({success: true, message: `Comment added for review`});
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await commentModel.find({blog: blogId, isApproved: true}).sort({createdAt: -1}).lean();
    res.json({success: true, comments});
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const generateContent = async (req, res) => {
  try {
    const {prompt} = req.body;
    const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
    res.json({success: true, content})
    
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}