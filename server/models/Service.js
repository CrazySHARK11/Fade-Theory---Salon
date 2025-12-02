import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  price: { type: Number, required: true },
  deletedPrice: { type: Number, default: null },
  description: String,
  imageUrl: [{ type: String }],
  reviews: [ReviewSchema],
  averageRating: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now, index: true },
});

ServiceSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

ServiceSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const avg = this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
    this.averageRating = avg;
  }
  next();
});

export default mongoose.model("Service", ServiceSchema);
