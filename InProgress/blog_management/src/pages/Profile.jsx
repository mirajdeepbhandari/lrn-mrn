import { useState, useRef } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // User info state
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState(
    'Passionate developer and tech enthusiast. Love building amazing web experiences.'
  );

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile picture
  const [profilePicture, setProfilePicture] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  );
  const fileInputRef = useRef(null);

  // Messages
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Original values for cancel
  const [originalValues, setOriginalValues] = useState({});
  const [originalProfilePicture, setOriginalProfilePicture] = useState('');

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Preview profile picture
  const previewProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Enable edit mode
  const enableEdit = () => {
    setOriginalValues({ fullName, email, bio, currentPassword, newPassword, confirmPassword });
    setOriginalProfilePicture(profilePicture);
    setIsEditing(true);
    setSuccessMessage(false);
    setErrorMessage('');
  };

  // Cancel edit
  const cancelEdit = () => {
    setFullName(originalValues.fullName);
    setEmail(originalValues.email);
    setBio(originalValues.bio);
    setCurrentPassword(originalValues.currentPassword);
    setNewPassword(originalValues.newPassword);
    setConfirmPassword(originalValues.confirmPassword);
    setProfilePicture(originalProfilePicture);
    setIsEditing(false);
    setSuccessMessage(false);
    setErrorMessage('');
  };

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Save changes
  const saveChanges = () => {
    if (!fullName.trim()) return setErrorMessage('Full name is required');
    if (!email.trim()) return setErrorMessage('Email is required');
    if (!isValidEmail(email)) return setErrorMessage('Please enter a valid email address');

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) return setErrorMessage('Current password is required to change password');
      if (!newPassword) return setErrorMessage('New password is required');
      if (newPassword.length < 6) return setErrorMessage('New password must be at least 6 characters long');
      if (newPassword !== confirmPassword) return setErrorMessage('New password and confirm password do not match');
      if (newPassword === currentPassword) return setErrorMessage('New password must be different from current password');
    }

    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditing(false);
    setSuccessMessage(true);
    setErrorMessage('');

    setTimeout(() => setSuccessMessage(false), 4000);
  };

  return (
    <>
      <section className="profi-heroSection-contact">
        <div className="profi-heroContent-contact">
          <h1>Profile Settings</h1>
          <p>View and update your personal information, bio, email, and password to keep your account current and secure.</p>
        </div>
      </section>

      <div className="profi-profile-body">
        <div className="profi-profile-container">
          <div className={`profi-profile-header ${isEditing ? 'edit-mode' : ''}`}>
            <div className="profi-profile-picture-wrapper">
              <img src={profilePicture} alt="Profile" className="profi-profile-picture" />
              {isEditing && (
                <>
                  <button className="profi-edit-picture-btn" type="button" onClick={triggerFileInput}>
                    <i className="bi bi-camera"></i>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={previewProfilePicture}
                    id="profi-profilePictureInput"
                  />
                </>
              )}
            </div>
            <h1 className="profi-profile-name">{fullName}</h1>
            <p className="profi-profile-email">{email}</p>
          </div>

          <div className="profi-profile-content">
            {successMessage && (
              <div className="profi-success-message">
                <i className="bi bi-check-circle"></i> Changes saved successfully!
              </div>
            )}
            {errorMessage && (
              <div className="profi-error-message">
                <i className="bi bi-exclamation-circle"></i> {errorMessage}
              </div>
            )}

            <div className="profi-bio-section">
              <h3 className="profi-section-title">
                <i className="bi bi-person"></i> About Me
              </h3>
              <div className="profi-form-group"> 
                <label className="profi-form-label">Full Name</label>
                <br/>
                <input
                  type="text"
                  className="profi-form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="profi-form-group">
                <label className="profi-form-label">Email Address</label>
                 <br/>
                <input
                  type="email"
                  className="profi-form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="profi-form-group">
                <label className="profi-form-label">Bio</label>
                 <br/>
                <textarea
                  className="profi-form-control profi-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profi-password-section">
              <h3 className="profi-section-title">
                <i className="bi bi-lock"></i> Change Password
              </h3>
              <div className="profi-alert-info">
                <i className="bi bi-info-circle"></i> Leave blank if you don't want to change your password
              </div>

              {/* Current Password */}
              <div className="profi-form-group">
                <label className="profi-form-label">Current Password</label>
                <div className="profi-password-input-group">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="profi-form-control"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={!isEditing}
                  />
                  <button
                    className="profi-toggle-password"
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <i className={`bi ${showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="profi-form-group">
                <label className="profi-form-label">New Password</label>
                <div className="profi-password-input-group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="profi-form-control"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!isEditing}
                  />
                  <button
                    className="profi-toggle-password"
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="profi-form-group">
                <label className="profi-form-label">Confirm New Password</label>
                <div className="profi-password-input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="profi-form-control"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!isEditing}
                  />
                  <button
                    className="profi-toggle-password"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="profi-button-group">
              {!isEditing && (
                <button className="profi-btn-custom profi-btn-edit" onClick={enableEdit}>
                  <i className="bi bi-pencil"></i> Edit Profile
                </button>
              )}
              {isEditing && (
                <>
                  <button className="profi-btn-custom profi-btn-save" onClick={saveChanges}>
                    <i className="bi bi-save"></i> Save Changes
                  </button>
                  <button className="profi-btn-custom profi-btn-cancel" onClick={cancelEdit}>
                    <i className="bi bi-x"></i> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
