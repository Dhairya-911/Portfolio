require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const contacts = await Contact.find({});
    console.log('Total contacts found:', contacts.length);
    
    if (contacts.length > 0) {
      console.log('Recent contacts:');
      contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Name: ${contact.name}, Email: ${contact.email}, Date: ${contact.createdAt}`);
      });
    } else {
      console.log('No contacts found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error);
    process.exit(1);
  }
}

checkDatabase();
