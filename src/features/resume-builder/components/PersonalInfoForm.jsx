import React, { memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input, Textarea } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { validateEmail, validateUrl } from '../../../utils/validation';

export const PersonalInfoForm = memo(function PersonalInfoForm({ errors = {}, setErrors }) {

  const { resumeData, updatePersonalInfo, addToast } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);

    // Dynamic field validation on change using centralized validators
    if (field === 'email') {
      const err = validateEmail(value);
      if (err) {
        setErrors(prev => ({ ...prev, email: err }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next.email;
          return next;
        });
      }
    }

    if (field === 'website') {
      const err = validateUrl(value);
      if (err) {
        setErrors(prev => ({ ...prev, website: err }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next.website;
          return next;
        });
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast('Invalid file format. Please select an image file (PNG, JPG, WebP).', 'error', 3500);
        return;
      }
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage
        addToast('Image size exceeds 1MB limit. Please choose a smaller image file.', 'error', 3500);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('avatar', reader.result);
        addToast('Profile picture uploaded successfully!', 'success', 2000);
      };
      reader.onerror = () => {
        addToast('Failed to read image file. Please try another image.', 'error', 3500);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    updatePersonalInfo('avatar', '');
    addToast('Profile picture removed.', 'info', 2000);
  };


  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/20 p-4 rounded-xl border border-slate-800">
        <div className="relative w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden group">
          {personalInfo.avatar ? (
            <img src={personalInfo.avatar} alt="Profile photo" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-300">Profile Image (Max 1MB)</label>
          <div className="flex gap-2">
            <label className="cursor-pointer px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                aria-label="Upload profile image"
              />
            </label>
            {personalInfo.avatar && (
              <Button variant="danger" size="sm" onClick={removeAvatar} className="!py-1.5">
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          id="fullName"
          placeholder="Jane Doe"
          value={personalInfo.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          required
        />
        <Input
          label="Job Title"
          id="jobTitle"
          placeholder="Senior Frontend Developer"
          value={personalInfo.jobTitle || ''}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="jane.doe@example.com"
          value={personalInfo.email || ''}
          error={errors.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={personalInfo.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Website/Portfolio URL"
          id="website"
          placeholder="https://janedoe.dev"
          value={personalInfo.website || ''}
          error={errors.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
        <Input
          label="Location"
          id="location"
          placeholder="New York, NY"
          value={personalInfo.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <Textarea
        label="Professional Summary"
        id="summary"
        placeholder="Brief overview of your experience, skills, and goals..."
        value={personalInfo.summary || ''}
        onChange={(e) => handleChange('summary', e.target.value)}
        helperText={`${personalInfo.summary?.length || 0} characters. Recommended: 150-300 characters.`}
      />
    </div>
  );
});

