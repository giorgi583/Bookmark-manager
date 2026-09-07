import mongoose, { Schema} from "mongoose";

const bookmarkSchema = new Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    favicon: {type: String},
    tags: {type: [String], default: []},
    createdAt: {type: Date, default: Date.now},
    isFavorite: {type: Boolean, default: false},
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);