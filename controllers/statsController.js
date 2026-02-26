import Stats from "../models/Stats.js"

export const getStats = async (req, res) => {
  try {
    const data = await Stats.find()

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

export const createStats = async (req, res) => {
  try {
    const stats = await Stats.create(req.body)

    res.status(201).json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found"
      })
    }

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id)

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found"
      })
    }

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}