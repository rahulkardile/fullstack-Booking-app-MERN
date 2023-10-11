import Hotel from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
    try {
        const newHotel = await new Hotel(req.body);
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json(updateHotel);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteHotel = await Hotel.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteHotel);
    } catch (error) {
        next(error);
    }
}

export const getAllHotel = async (req, res, next) => {
    try {
        const { min, max, ...others} = req.query;
        const allHotel = await Hotel.find({...others, cheapestPrice: {$gt: min | 1, $lt: max || 99999}}) 
        res.status(200).json(allHotel);
    } catch (error) {
        next(error)
    }
}

export const findOneHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        const OneHotel = await Hotel.findById({ _id: id })
        res.status(200).json(OneHotel)
    } catch (error) {
        next(error);
    }
}

export const countByCity = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(",");
        const list = await Promise.all(cities.map(city => Hotel.countDocuments({ city: city })));
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {
    try {

        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([

            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },

        ])

    } catch (error) {
        next(error)
    }
}