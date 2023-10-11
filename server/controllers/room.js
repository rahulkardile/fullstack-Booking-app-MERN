import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js"
import { } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const saveRoom = await newRoom.save();
        try {

            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: saveRoom._id },

            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveRoom);
    } catch (error) {
        next(error);
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json(updateRoom);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {

    const { id, hotelId } = req.params;

    try {
        const deleteRoom = await Room.findByIdAndDelete({ _id: id });

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: id }
            })
        } catch (error) {
            next(error)
        }

        res.status(200).json("Room Has been Deleted");

    } catch (error) {
        next(error);
    }
}

export const getAllRoom = async (req, res, next) => {
    try {

        const allRoom = await Room.find();
        res.status(200).json(allRoom);

    } catch (error) {
        next(error);
    }
}

export const findOneRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const OneRoom = await Room.findById({ _id: id })

        res.status(200).json(OneRoom)
    } catch (error) {
        next(error);
    }
}
