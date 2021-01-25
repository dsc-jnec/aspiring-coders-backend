import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
    name: string;
    email: string;
    picURL: string;
    role: string;
    comitee: string;
}

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picURL: {
        type: String,
    },
    githubId: {
        type: String,
    },
    role: {
        type: String,
    },
    comitee: {
        type: String,
    },
});

export default mongoose.model<IMember>('Member', MemberSchema);
