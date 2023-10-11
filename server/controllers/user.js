import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete({_id: id});
        res.status(200).json(deleteUser);
    } catch (error) {
        next(error);
    }
}

export const getAllUser = async (req, res, next) => {
    try {

        const allUser = await User.find();
        res.status(200).json(allUser);
    
    } catch (error) {
        next(error);
    }
}

export const findOneUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const OneUser = await User.findById({_id: id})
        res.status(200).json(OneUser)
    } catch (error) {
        next(error);
    }
}
