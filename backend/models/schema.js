const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;


const AdminSchema = Schema({
    ADMIN_ID: { type: Number, required: true },
    ADMIN_ROLE: { type: String, default: '' },
    ADMIN_NAME: { type: String, default: '' },
    ADMIN_PHONE: { type: Number, required: false, default: '' },
    ADMIN_EMAIL: { type: String, default: '' },
    ADMIN_ADD2: { type: String, default: '' },
    ADMIN_STATE: { type: String, default: '' },
    ADMIN_USERNAME: { type: String, default: '' },
    ADMIN_COMPANIES: { type: Array, default: [] },
  
  });