import jwt from "jsonwebtoken";
import blogModel from "../model/blogModel.js";
import commentModel from "../model/commentModel.js";

export const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({success: false, message: 'Invalid Credentials'});
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({success: true, token});
    
  } catch (err) {
    res.json({success: false, message: err.message});
  }
}

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({createdAt: -1}).lean();
    res.json({success: true, blogs})
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find({}).populate('blog').sort({createdAt: -1}).lean()
    res.json({success: true, comments})
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const getDashboard = async (req, res) => {
  try {
    const [recentBlogs, blogs, comments, drafts] = await Promise.all([
      blogModel.find({}).sort({createdAt: -1}).limit(5).lean(),
      blogModel.countDocuments(),
      commentModel.countDocuments(),
      blogModel.countDocuments({isPublished: false})
    ])

    const dashboardData = {
      blogs, comments, drafts, recentBlogs
    }
    res.json({success: true, dashboardData})
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const deleteCommentById = async (req, res) => {
  try {
    const {id} = req.body
    await commentModel.findByIdAndDelete(id);
    res.json({success: true, message: `Comment deleted successfully`})
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}

export const approvedCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    await commentModel.findByIdAndUpdate(id, {isApproved: true});
    res.json({success: true, message: `Comment approved successfully`})
    
  } catch (err) {
    res.json({success: false, message: `เกิดข้อผิดพลาด: ${err.message}`});
  }
}