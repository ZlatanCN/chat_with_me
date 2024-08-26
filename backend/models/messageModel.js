import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
  },
  imageObj: {
    type: Buffer,
  },
  // Timestamps give us createdAt and updatedAt fields
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;