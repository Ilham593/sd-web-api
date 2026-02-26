import Guru from "../models/Guru.js"

// GET all
export const getGuru = async (req, res) => {
  try {
    const data = await Guru.find()
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
// POST
export const createGuru = async (req, res) => {
  try {
    const guru = await Guru.create(req.body)

    res.status(201).json({
      success: true,
      data: guru
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
// PUT
export const updateGuru = async (req, res) => {
  try {
    const guru = await Guru.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!guru) {
      return res.status(404).json({
        success: false,
        message: "Guru not found"
      })
    }

    res.status(200).json({
      success: true,
      data: guru
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// DELETE
export const deleteGuru = async (req, res) => {
  try {
    const guru = await Guru.findByIdAndDelete(req.params.id)

    if (!guru) {
      return res.status(404).json({
        success: false,
        message: "Guru not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Guru deleted"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}