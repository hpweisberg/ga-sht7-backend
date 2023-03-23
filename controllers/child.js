import { Child } from '../models/child.js'
import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import { v2 as cloudinary } from 'cloudinary'


async function index(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile).populate('children')
    const children = profile.children
    res.json(children)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


async function create(req, res) {
  try {
    console.log(1)
    const user = await User.findById(req.user._id).populate('profile')
    console.log(2)
    const child = new Child(req.body)
    console.log(3)
    if (!user.profile.children) {
      console.log(4)
      user.profile.children = []
      console.log(5)
    }
    console.log(6)
    child.parent = user.profile._id
    console.log(7)
    user.profile.children.push(child)
    console.log(8)
    await user.profile.save()
    console.log(9)
    await child.save()
    console.log(10)
    res.status(200).json(child)
    console.log(11)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}




async function show(req, res) {
  try {
    const child = Child.findById(req.params.id)
    .populate('tasks')
    if (!child){
      return res.status(404).json({ message: 'Child not found'})
    }
    res.status(200).json(child)
  } catch (error) {
    console.log(error)
  }
}

async function update(req, res) {
  try {
    // const profile = await Profile.findById(req.params.id)
    const child = await Child.findByIdAndUpdate(req.params.id, req.body, {new: true})
    child.set(req.body)
    child.save()
    res.json(child)
    }
    // res.status(200).json(child);
    catch (error) {
    console.log(error);
  }
}



export { 
  index, 
  create,
  show,
  update,
}
