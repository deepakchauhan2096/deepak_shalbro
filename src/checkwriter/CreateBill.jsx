import React, { useState } from 'react';

const  CreateBill = () => {
  const [formData, setFormData] = useState({
    payee: '',
    bank: '',
    invoiceNumber: '',
    poNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: '',
    accountNumber: '',
    memo: '',
    category: '',
    vendorCredit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API.
    console.log(formData);
  };

  return (
    <div>
      <h2>Invoice Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="payee">Select Payee:</label>
          <select name="payee" id="payee" onChange={handleInputChange}>
            {/* Add options for payees */}
          </select>
        </div>
        <div>
          <label htmlFor="bank">Select Bank:</label>
          <select name="bank" id="bank" onChange={handleInputChange}>
            {/* Add options for banks */}
          </select>
        </div>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            name="invoiceNumber"
            id="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="poNumber">PO Number:</label>
          <input
            type="text"
            name="poNumber"
            id="poNumber"
            value={formData.poNumber}
          />
        </div>
        <div>
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            type="date"
            name="invoiceDate"
            id="invoiceDate"
            value={formData.invoiceDate}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={formData.dueDate}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            id="accountNumber"
            value={formData.accountNumber}
          />
        </div>
        <div>
          <label htmlFor="memo">Memo:</label>
          <textarea
            name="memo"
            id="memo"
            value={formData.memo}
          />
        </div>
        <div>
          <label htmlFor="category">Select Category:</label>
          <select name="category" id="category" onChange={handleInputChange}>
            {/* Add options for categories */}
          </select>
        </div>
        <div>
          <label htmlFor="vendorCredit">Vendor Credit:</label>
          <input
            type="text"
            name="vendorCredit"
            id="vendorCredit"
            value={formData.vendorCredit}
          />
        </div>
        <div>
          <label htmlFor="attachment">Add Attachment:</label>
          <input type="file" name="attachment" id="attachment" />
        </div>
        <div>
          <label htmlFor="comments">Add Comments:</label>
          <textarea name="comments" id="comments" />
        </div>
        <div>
          <label htmlFor="items">Add Items:</label>
          <input
            type="text"
            name="items"
            id="items"
            value={formData.items}
          />
        </div>
        <div>
          <label htmlFor="uploadAndExtract">Upload and Extract:</label>
          <input type="file" name="uploadAndExtract" id="uploadAndExtract" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBill;
