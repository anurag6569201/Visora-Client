import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/Visions/visionform.css';

const VisionRequest = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    deadline: '',
    budget: '',
    visibility: true
  });
  const [tags, setTags] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    
    if (!window.Razorpay) {
      loadRazorpay();
    }
  }, []);

  const handlePayment = (amount) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_LcYoGkJW1B1wMM", // Replace with your Razorpay API Key
        amount: amount,
        currency: "INR",
        name: "Animation Platform",
        description: `Payment for ${formData.title}`,
        handler: function (response) {
          resolve(response.razorpay_payment_id);
        },
        theme: {
          color: "#d4224f",
        },
      };

      const rzp = new window.Razorpay({
        ...options,
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          }
        }
      });

      rzp.on('payment.failed', (response) => {
        reject(new Error(response.error.description));
      });

      rzp.open();
    });
  };

  const handleTagKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        e.target.value = '';
      }
    }
  };

  const handleTagPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const newTags = pastedData.split(/[, ]+/)
      .map(tag => tag.trim())
      .filter(tag => tag);
    setTags(prev => [...new Set([...prev, ...newTags])]);
    e.target.value = '';
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required';
    if (!formData.budget || isNaN(formData.budget) || formData.budget <= 0) {
      newErrors.budget = 'Valid budget amount is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const amountInPaise = Math.round(parseFloat(formData.budget) * 100);
      const paymentId = await handlePayment(amountInPaise);

      const token = localStorage.getItem('authToken');
      const formDataToSend = new FormData();
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '') formDataToSend.append(key, value);
      });
      
      formDataToSend.append('tags', JSON.stringify(tags));
      formDataToSend.append('payment_id', paymentId);
      
      if (attachments.length > 0) {
        attachments.forEach(file => {
          formDataToSend.append('attachments', file);
        });
      }

      const response = await axios.post('http://127.0.0.1:8000/requests/', formDataToSend, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const requestId = response.data.id;
      setSuccessMessage('Request submitted successfully!');
      
      setTimeout(() => {
        navigate(`/app/visions/requests/${requestId}`);
      }, 1500);

    } catch (error) {
      if (error.response?.data) {
        setErrors(prev => ({
          ...prev,
          ...error.response.data,
          general: 'Please fix the errors below'
        }));
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="animation-request-form">
      <h2 className='gradient-text'>Create Animation Request</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.general && <div className="error-message">{errors.general}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select Category</option>
            <option value="2D">2D Animation</option>
            <option value="3D">3D Animation</option>
            <option value="Motion Graphics">Motion Graphics</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label htmlFor="tagInput">Tags</label>
          <div className="tags-input">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  aria-label={`Remove ${tag} tag`}
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              id="tagInput"
              type="text"
              placeholder="Type and press Enter to add tags"
              onKeyDown={handleTagKeyDown}
              onPaste={handleTagPaste}
              aria-describedby="tagsHelp"
            />
          </div>
          <span id="tagsHelp" className="help-text">Separate tags with commas or Enter</span>
        </div>

        {/* Difficulty */}
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty *</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className={errors.difficulty ? 'error' : ''}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="budget">Budget (₹) *</label>
          <input
            id="budget"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={errors.budget ? 'error' : ''}
          />
          {errors.budget && <span className="error-message">{errors.budget}</span>}
        </div>


        {/* Attachments */}
        <div className="form-group">
          <label htmlFor="attachments">Attachments</label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={(e) => setAttachments(Array.from(e.target.files))}
          />
          <small>Maximum 5 files (PDF, images, ZIP)</small>
        </div>

        {/* Visibility */}
        <div className="form-group checkbox-group">
          <label style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <input
              type="checkbox"
              name="visibility"
              checked={formData.visibility}
              onChange={handleInputChange}
              style={{width:'20px',height:'20px'}}
            />
            Public Visibility
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? 'Processing...' : 'Submit & Pay'}
        </button>
      </form>
    </div>
  );
};

export default VisionRequest;