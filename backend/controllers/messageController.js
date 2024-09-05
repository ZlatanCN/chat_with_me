import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import chalk from 'chalk';

const sendMessage = async (req, res) => {
  try {
    let { message } = req.body;
    if (!message) {
      message = req.files;
    }
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Add message to the conversation and save it
    const newMessage = new Message({
      senderId,
      receiverId,
      content: message === req.files ? '' : message,
      imageObj: message === req.files ? req.files.imageObj[0].buffer : undefined,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);

      // Run in parallel
      await Promise.all([newMessage.save(), conversation.save()]);

      // // Emit the message to the receiver
      // const receiverSocketId = getReceiverSocketId(receiverId);
      // if (receiverSocketId) {
      //   io.to(receiverSocketId).emit('newMessage', newMessage);
      // }

      res.status(200).json({
        message: newMessage,
        conversation: conversation,
      });
    } else {
      res.status(400).json({ error: 'Message not sent' });
    }
  } catch (error) {
    console.log(chalk.red('Error in sending message:'), error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const myId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [myId, userId] },
      // 'Populate' is used to get the messages objects, not just their ids
    }).populate('messages');

    // If conversation doesn't exist, return an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    // Return messages
    const messages = conversation.messages;
    res.status(200).json({ messages });
  } catch (error) {
    console.log(chalk.red('Error in getting messages:'), error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { sendMessage, getMessages };