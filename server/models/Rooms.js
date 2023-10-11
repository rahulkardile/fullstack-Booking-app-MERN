import monngoose from "mongoose"

const RoomSchema = new monngoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },  
    description: {
        type: String,
        required: true,
    },
    roomNumbers: [{number: Number, unavailabelDates: {type: [Date]} }],
}, {timestamps: true} 
)

const Room = new monngoose.model("Room", RoomSchema);

export default Room;