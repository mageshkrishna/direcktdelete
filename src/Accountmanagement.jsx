import  { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './AccountManagement.css'; // Import CSS file

const AccountManagement = () => {
  const [showCustomer, setShowCustomer] = useState(true);
  const [customerDelete, setCustomerDelete] = useState(false);
  const [shopOwnerDelete, setShopOwnerDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [shopOwnerEmail, setShopOwnerEmail] = useState("");
  const [shopOwnerPassword, setShopOwnerPassword] = useState("");

  const handleCustomerDelete = async () => {
    // Validate customer email and password
    if (!customerEmail || !customerPassword) {
      alert('Please enter both email and password!');
      return;
    }

    try {
      setLoading(true); // Show loader
      const formData = { email: customerEmail, password: customerPassword };
      const response = await axios.post(
        "https://direckt-copy1.onrender.com/auth/deletecustomer",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Perform actions after successful account deletion
      console.log(response.data); // Log the response from the server
      setCustomerDelete(false); // Hide the confirmation dialog
      alert("Customer account deleted successfully!"); // Show success message to the user
    } catch (error) {
      // Handle errors during account deletion
      console.error("Error deleting customer account:", error);
      alert("An error occurred while deleting the customer account. Please try again."); // Show error message to the user
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleShopOwnerDelete = async () => {
    // Validate shop owner email and password
    if (!shopOwnerEmail || !shopOwnerPassword) {
      alert('Please enter both email and password!');
      return;
    }

    try {
      setLoading(true); // Show loader
      const formData = { email: shopOwnerEmail, password: shopOwnerPassword };
      const response = await axios.post(
        "https://direckt-copy1.onrender.com/auth/deleteshopowner",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Perform actions after successful account deletion
      console.log(response.data); // Log the response from the server
      setShopOwnerDelete(false); // Hide the confirmation dialog
      alert("Shop owner account deleted successfully!"); // Show success message to the user
    } catch (error) {
      // Handle errors during account deletion
      console.error("Error deleting shop owner account:", error);
      alert("An error occurred while deleting the shop owner account. Please try again."); // Show error message to the user
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="account-management">
      <div className="toggle-buttons">
        <button onClick={() => setShowCustomer(true)}>Customer</button>
        <button onClick={() => setShowCustomer(false)}>Shop Owner</button>
      </div>
      {showCustomer ? (
        <div className="customer-section">
          <h2>Customer Account</h2>
          <form>
            <label>
              Email:
              <input type="email" name="email" required value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" name="password" required value={customerPassword} onChange={(e) => setCustomerPassword(e.target.value)} />
            </label>
          </form>
          <button onClick={() => setCustomerDelete(true)}>Delete Account</button>
          {customerDelete && (
            <div>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={handleCustomerDelete} disabled={loading}>{loading ? 'Deleting...' : 'Yes, Delete My Account'}</button>
              <button onClick={() => setCustomerDelete(false)} disabled={loading}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <div className="shop-owner-section">
          <h2>Shop Owner Account</h2>
          <form>
            <label>
              Email:
              <input type="email" name="email" required value={shopOwnerEmail} onChange={(e) => setShopOwnerEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" name="password" required value={shopOwnerPassword} onChange={(e) => setShopOwnerPassword(e.target.value)} />
            </label>
          </form>
          <button onClick={() => setShopOwnerDelete(true)}>Delete Account</button>
          {shopOwnerDelete && (
            <div>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={handleShopOwnerDelete} disabled={loading}>{loading ? 'Deleting...' : 'Yes, Delete My Account'}</button>
              <button onClick={() => setShopOwnerDelete(false)} disabled={loading}>Cancel</button>
            </div>
          )}
        </div>
      )}
      {loading && <div className="loader">Loading...</div>}
    </div>
  );
};

export default AccountManagement;
