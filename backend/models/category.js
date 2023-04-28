// If you want to allow users to filter Places by category 
// a Category model to store information about each Place category.

import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    icon: String
});

const Category = new mongoose.model("Category", categorySchema);
export default Category;