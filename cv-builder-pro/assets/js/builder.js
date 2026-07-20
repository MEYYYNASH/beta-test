/**
 * CV Builder Pro - Core Builder Logic
 */

// State Management
let resumeData = {
  template: 'minimal-ats',
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  setupEventListeners();
  
  // Handle URL Template Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const tplParam = urlParams.get('template');
  
  if (tplParam && tplParam.trim() !== '') {
    const thumb = document.querySelector(`[onclick*="'${tplParam}'"]`);
    if (thumb) {
      setTemplate(tplParam, thumb);
    } else {
      setTemplate('minimal-ats', document.querySelector('[onclick*="\'minimal-ats\'"]'));
    }
  } else {
    // Default to Minimal ATS if no param
    setTemplate('minimal-ats', document.querySelector('[onclick*="\'minimal-ats\'"]'));
  }
});

function setupEventListeners() {
  // Real-time input sync
  const inputs = document.querySelectorAll('#resumeForm input, #resumeForm textarea');
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const key = e.target.getAttribute('data-key');
      if (key) {
        resumeData[key] = e.target.value;
        updatePreview();
      }
    });
  });

  // Zoom Controls
  let zoom = 0.8;
  const preview = document.getElementById('resume-preview');
  const zoomLevelDisplay = document.getElementById('zoomLevel');

  document.getElementById('zoomIn').addEventListener('click', () => {
    zoom = Math.min(zoom + 0.1, 1.5);
    preview.style.transform = `scale(${zoom})`;
    zoomLevelDisplay.innerText = `${Math.round(zoom * 100)}%`;
  });

  document.getElementById('zoomOut').addEventListener('click', () => {
    zoom = Math.max(zoom - 0.1, 0.4);
    preview.style.transform = `scale(${zoom})`;
    zoomLevelDisplay.innerText = `${Math.round(zoom * 100)}%`;
  });

  // Export PDF
  document.getElementById('exportPdf').addEventListener('click', () => {
    window.print();
  });

  // Save Data
  document.getElementById('saveResume').addEventListener('click', () => {
    localStorage.setItem('cv_builder_pro_data', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  });
}

function setTemplate(templateName, el) {
  // Update State
  resumeData.template = templateName;
  
  // Update UI (Sidebar)
  document.querySelectorAll('.tpl-thumb').forEach(thumb => thumb.classList.remove('active'));
  if (el) el.classList.add('active');

  // Apply to Preview
  const preview = document.getElementById('resume-preview');
  // Remove all tpl- classes
  const classes = preview.className.split(' ').filter(c => !c.startsWith('tpl-'));
  preview.className = [...classes, `tpl-${templateName}`].join(' ');

  updatePreview();
}

function updatePreview() {
  const preview = document.getElementById('resume-preview');
  
  // Specific layout adjustments for complex templates
  if (resumeData.template === 'modern-pro') {
    preview.innerHTML = `
      <div class="preview-header">
        <h1 id="preview-fullName">${resumeData.fullName || getPlaceholder('fullName')}</h1>
        <p id="preview-jobTitle" style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 0.5rem;">${resumeData.jobTitle || getPlaceholder('jobTitle')}</p>
      </div>
      <div class="preview-left">
        <div class="preview-section">
          <h3>Contact</h3>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 0.5rem;"><i class="fas fa-envelope"></i> ${resumeData.email || getPlaceholder('email')}</p>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 0.5rem;"><i class="fas fa-phone"></i> ${resumeData.phone || getPlaceholder('phone')}</p>
          <p style="font-size: 0.875rem; color: #475569;"><i class="fas fa-location-dot"></i> ${resumeData.location || getPlaceholder('location')}</p>
        </div>
        <div class="preview-section">
          <h3>Skills</h3>
          <p style="font-size: 0.875rem; line-height: 1.6;">${resumeData.skills || getPlaceholder('skills')}</p>
        </div>
      </div>
      <div class="preview-right">
        <div class="preview-section">
          <h3>Summary</h3>
          <p>${resumeData.summary || getPlaceholder('summary')}</p>
        </div>
        <div class="preview-section">
          <h3>Experience</h3>
          <div id="preview-experience-list"></div>
        </div>
        <div class="preview-section">
          <h3>Education</h3>
          <div id="preview-education-list"></div>
        </div>
      </div>
    `;
    // Re-fill dynamic lists for this custom layout
    const expList = document.getElementById('preview-experience-list');
    expList.innerHTML = resumeData.experience.map(exp => `
      <div class="preview-item">
        <div class="preview-item-header">
          <span>${exp.title || 'Position'}</span>
          <span>${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
        </div>
        <div class="preview-item-sub">${exp.company || 'Company Name'} | ${exp.location || 'Location'}</div>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">${exp.description || ''}</p>
      </div>
    `).join('');
    const eduList = document.getElementById('preview-education-list');
    eduList.innerHTML = resumeData.education.map(edu => `
      <div class="preview-item">
        <div class="preview-item-header">
          <span>${edu.degree || 'Degree'}</span>
          <span>${edu.startDate || ''} - ${edu.endDate || ''}</span>
        </div>
        <div class="preview-item-sub">${edu.school || 'University'} | ${edu.location || ''}</div>
      </div>
    `).join('');
    return; // Exit early as we manually handled modern-pro
  }

  // Standard Layout (used by most other templates)
  preview.innerHTML = `
    <div class="preview-header">
      <h1 id="preview-fullName">Your Name</h1>
      <p id="preview-jobTitle" style="font-size: 1.25rem; color: #475569; margin-bottom: 0.5rem;">Professional Title</p>
      <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: #64748b;">
        <span id="preview-email"><i class="fas fa-envelope"></i> email@example.com</span>
        <span id="preview-phone"><i class="fas fa-phone"></i> +1 234 567 890</span>
        <span id="preview-location"><i class="fas fa-location-dot"></i> Location</span>
      </div>
    </div>
    <div class="preview-section" id="preview-summary-section">
      <h3>Professional Summary</h3>
      <p id="preview-summary"></p>
    </div>
    <div class="preview-section">
      <h3>Experience</h3>
      <div id="preview-experience-list"></div>
    </div>
    <div class="preview-section">
      <h3>Education</h3>
      <div id="preview-education-list"></div>
    </div>
    <div class="preview-section">
      <h3>Skills</h3>
      <p id="preview-skills"></p>
    </div>
  `;

  // Sync basic fields
  Object.keys(resumeData).forEach(key => {
    const el = document.getElementById(`preview-${key}`);
    if (el) {
      el.innerText = resumeData[key] || getPlaceholder(key);
    }
  });

  // Sync Experience
  const expList = document.getElementById('preview-experience-list');
  if (expList) {
    expList.innerHTML = resumeData.experience.map(exp => `
      <div class="preview-item">
        <div class="preview-item-header">
          <span>${exp.title || 'Position'}</span>
          <span>${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
        </div>
        <div class="preview-item-sub">${exp.company || 'Company Name'} | ${exp.location || 'Location'}</div>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">${exp.description || ''}</p>
      </div>
    `).join('');
  }

  // Sync Education
  const eduList = document.getElementById('preview-education-list');
  if (eduList) {
    eduList.innerHTML = resumeData.education.map(edu => `
      <div class="preview-item">
        <div class="preview-item-header">
          <span>${edu.degree || 'Degree'}</span>
          <span>${edu.startDate || ''} - ${edu.endDate || ''}</span>
        </div>
        <div class="preview-item-sub">${edu.school || 'University'} | ${edu.location || ''}</div>
      </div>
    `).join('');
  }
}

function getPlaceholder(key) {
  const placeholders = {
    fullName: 'Your Name',
    jobTitle: 'Professional Title',
    email: 'email@example.com',
    phone: '+1 234 567 890',
    location: 'Location',
    summary: 'Write a compelling summary about your career goals and achievements here.',
    skills: 'List your top skills here.'
  };
  return placeholders[key] || '';
}

// Dynamic Lists Management
function addExperience() {
  const id = Date.now();
  const exp = { id, title: '', company: '', location: '', startDate: '', endDate: '', description: '' };
  resumeData.experience.push(exp);
  
  const container = document.getElementById('experience-list');
  const item = document.createElement('div');
  item.className = 'dynamic-item';
  item.id = `exp-${id}`;
  item.innerHTML = `
    <i class="fas fa-times remove-btn" onclick="removeExperience(${id})"></i>
    <div class="form-group">
      <label>Job Title</label>
      <input type="text" oninput="updateExp(${id}, 'title', this.value)" placeholder="Senior Developer">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" oninput="updateExp(${id}, 'company', this.value)" placeholder="Tech Corp">
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
      <div class="form-group">
        <label>Start Date</label>
        <input type="text" oninput="updateExp(${id}, 'startDate', this.value)" placeholder="Jan 2020">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="text" oninput="updateExp(${id}, 'endDate', this.value)" placeholder="Present">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea oninput="updateExp(${id}, 'description', this.value)" rows="3" placeholder="Describe your responsibilities..."></textarea>
    </div>
  `;
  container.appendChild(item);
  updatePreview();
}

function updateExp(id, field, value) {
  const exp = resumeData.experience.find(e => e.id === id);
  if (exp) {
    exp[field] = value;
    updatePreview();
  }
}

function removeExperience(id) {
  resumeData.experience = resumeData.experience.filter(e => e.id !== id);
  document.getElementById(`exp-${id}`).remove();
  updatePreview();
}

function addEducation() {
  const id = Date.now();
  const edu = { id, degree: '', school: '', location: '', startDate: '', endDate: '' };
  resumeData.education.push(edu);
  
  const container = document.getElementById('education-list');
  const item = document.createElement('div');
  item.className = 'dynamic-item';
  item.id = `edu-${id}`;
  item.innerHTML = `
    <i class="fas fa-times remove-btn" onclick="removeEducation(${id})"></i>
    <div class="form-group">
      <label>Degree / Major</label>
      <input type="text" oninput="updateEdu(${id}, 'degree', this.value)" placeholder="B.S. Computer Science">
    </div>
    <div class="form-group">
      <label>School / University</label>
      <input type="text" oninput="updateEdu(${id}, 'school', this.value)" placeholder="Harvard University">
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
      <div class="form-group">
        <label>Start Date</label>
        <input type="text" oninput="updateEdu(${id}, 'startDate', this.value)" placeholder="2016">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="text" oninput="updateEdu(${id}, 'endDate', this.value)" placeholder="2020">
      </div>
    </div>
  `;
  container.appendChild(item);
  updatePreview();
}

function updateEdu(id, field, value) {
  const edu = resumeData.education.find(e => e.id === id);
  if (edu) {
    edu[field] = value;
    updatePreview();
  }
}

function removeEducation(id) {
  resumeData.education = resumeData.education.filter(e => e.id !== id);
  document.getElementById(`edu-${id}`).remove();
  updatePreview();
}

// AI Mock
function generateAISummary() {
  const summaries = [
    "Results-oriented Professional with over 5 years of experience in the industry. Proven track record of leading successful teams and delivering high-impact projects on time and within budget.",
    "Dynamic and creative Software Engineer with a passion for building scalable web applications. Expert in React, Node.js, and modern cloud architectures.",
    "Strategic Marketing Specialist with expertise in digital growth and brand development. Skilled at identifying market trends and executing data-driven campaigns."
  ];
  const random = summaries[Math.floor(Math.random() * summaries.length)];
  resumeData.summary = random;
  document.querySelector('textarea[data-key="summary"]').value = random;
  updatePreview();
}

function loadSavedData() {
  const saved = localStorage.getItem('cv_builder_pro_data');
  if (saved) {
    resumeData = JSON.parse(saved);
    // Fill basic inputs
    Object.keys(resumeData).forEach(key => {
      const input = document.querySelector(`[data-key="${key}"]`);
      if (input) input.value = resumeData[key];
    });
    // Re-add dynamic items (logic omitted for brevity but can be added if needed)
  }
}
