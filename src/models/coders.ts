const mongoose = require('mongoose');

const CoderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        codechefId: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Coder', CoderSchema);
