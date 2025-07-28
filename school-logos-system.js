const schoolsData = {
    'pathways_school': {
        name: 'Pathways School',
        location: 'Gurgaon',
        logo: 'images/pathways_school.jpeg',
        website: 'https://pathways.in',
        students: ['Mannat Gupta', 'Vidhi Madan'],
        established: '1998',
        type: 'International School'
    },
    'dps': {
        name: 'Delhi Public School',
        location: 'Bangalore',
        logo: 'images/dps.jpeg',
        website: 'https://dpseast.com',
        students: ['Lakshi Mehta'],
        established: '1949',
        type: 'Public School'
    },
    'euro_school': {
        name: 'Euro School',
        location: 'Bangalore',
        logo: 'images/euro_school.png',
        website: 'https://www.euroschoolindia.com',
        students: ['Ashita Sirkar', 'Bhargavi', 'Anya Deori', 'Sarah Hussain', 'Advay Avinash'],
        established: '2005',
        type: 'International School'
    },
    'legacy_school': {
        name: 'Legacy School',
        location: 'Bangalore',
        logo: 'images/legacy_school.jpeg',
        website: 'https://legacyschool.in',
        students: ['Adithi Bhamdipati', 'Shreyas Kartik'],
        established: '2008',
        type: 'Private School'
    },
    'premia_academy': {
        name: 'Premia Academy',
        location: 'Hyderabad',
        logo: 'images/premia_academy.jpeg',
        website: 'https://premiaacademy.com',
        students: ['Hansini Gajja'],
        established: '2010',
        type: 'Academy'
    },
    'shiv_nadar': {
        name: 'Shiv Nadar School',
        location: 'Faridabad',
        logo: 'images/shiv_nadar.png',
        website: 'https://shivnadarschool.edu.in',
        students: ['Sanvi Bhatia'],
        established: '2012',
        type: 'Private School'
    },
    'greenwood_high': {
        name: 'Greenwood High International',
        location: 'Bangalore',
        logo: 'images/greenwood_high.jpeg',
        website: 'https://greenwoodhigh.edu.in',
        students: ['Shrika Chitturi'],
        established: '2005',
        type: 'International School'
    },
    'chaman_bhartiya': {
        name: 'Chaman Bhartiya School',
        location: 'Bangalore',
        logo: 'images/chaman_bhartiya.png',
        website: 'https://chamanbhartiyaschool.com',
        students: ['Ahona Sircar', 'Leanna Bhatia'],
        established: '2007',
        type: 'Private School'
    },
    'sri_sankara': {
        name: 'Sri Sankara School',
        location: 'Chennai',
        logo: 'images/sri_sankara.png',
        website: 'https://srisankaraschool.net',
        students: ['Nikhilesh Manna'],
        established: '1999',
        type: 'Private School'
    },
    'sloka_waldorf': {
        name: 'Sloka Waldorf School',
        location: 'Hyderabad',
        logo: 'images/sloka_waldorf.png',
        website: 'https://slokawaldorf.org',
        students: ['Achal Kaur'],
        established: '2003',
        type: 'Waldorf School'
    },
    'homeschool': {
        name: 'Homeschooled',
        location: 'Various',
        logo: 'images/homeschool_icon.svg',
        website: '#',
        students: ['Ira S. B.'],
        established: 'N/A',
        type: 'Homeschool'
    }
};

const teamMembersWithSchools = [
    { name: 'Mannat Gupta', role: 'Project Manager + Book Design', grade: '9th Grade', school: 'pathways_school', gender: 'F', city: 'Gurgaon' },
    { name: 'Lakshi Mehta', role: 'Writers/interviewers', grade: '9th Grade', school: 'dps', gender: 'F', city: 'Bangalore' },
    { name: 'Adithi Bhamdipati', role: 'Writers/interviewers', grade: '10th Grade', school: 'legacy_school', gender: 'F', city: 'Bangalore' },
    { name: 'Advay Avinash', role: 'Podcasters', grade: '9th Grade', school: 'euro_school', gender: 'M', city: 'Bangalore' },
    { name: 'Hansini Gajja', role: 'Podcasters', grade: '9th Grade', school: 'premia_academy', gender: 'F', city: 'Hyderabad' },
    { name: 'Amritanshu Praveen', role: 'Video Editor', grade: '8th Grade', school: 'euro_school', gender: 'M', city: 'Bangalore' },
    { name: 'Sanvi Bhatia', role: 'Videographer', grade: '11th Grade', school: 'shiv_nadar', gender: 'F', city: 'Faridabad' },
    { name: 'Samant Patil', role: 'Website Designers', grade: '9th Grade', school: 'euro_school', gender: 'M', city: 'Bangalore' },
    { name: 'Shrika Chitturi', role: 'Website Designers', grade: '10th Grade', school: 'greenwood_high', gender: 'F', city: 'Bangalore' },
    { name: 'Ahona Sircar', role: 'Book Editors', grade: '8th Grade', school: 'chaman_bhartiya', gender: 'F', city: 'Bangalore' },
    { name: 'Nikhilesh Manna', role: 'Book Editors', grade: '12th Grade', school: 'sri_sankara', gender: 'M', city: 'Chennai' },
    { name: 'Ashita Sirkar', role: 'Illustrators', grade: '10th Grade', school: 'euro_school', gender: 'F', city: 'Bangalore' },
    { name: 'Bhargavi', role: 'Illustrators', grade: '8th Grade', school: 'euro_school', gender: 'F', city: 'Bangalore' },
    { name: 'Ira S. B.', role: 'Illustrators', grade: '8th Grade', school: 'homeschool', gender: 'F', city: 'Various' },
    { name: 'Anya Deori', role: 'Illustrators', grade: '9th Grade', school: 'euro_school', gender: 'F', city: 'Bangalore' },
    { name: 'Leanna Bhatia', role: 'Illustrators', grade: '6th Grade', school: 'chaman_bhartiya', gender: 'F', city: 'Bangalore' },
    { name: 'Achal Kaur', role: 'Marketing (Social media, Offline etc)', grade: '11th Grade', school: 'sloka_waldorf', gender: 'F', city: 'Hyderabad' },
    { name: 'Laksh Pandey', role: 'Marketing (Social media, Offline etc)', grade: '9th Grade', school: 'chaman_bhartiya', gender: 'M', city: 'Bangalore' },
    { name: 'Sarah Hussain', role: 'Marketing (Social media, Offline etc)', grade: '9th Grade', school: 'euro_school', gender: 'F', city: 'Bangalore' },
    { name: 'Vidhi Madan', role: 'Marketing (Social media, Offline etc)', grade: '10th Grade', school: 'pathways_school', gender: 'F', city: 'Gurgaon' },
    { name: 'Shreyas Kartik', role: 'Finance & Sponsorship Managers', grade: '11th Grade', school: 'legacy_school', gender: 'M', city: 'Bangalore' }
];

function initSchoolLogosSystem() {
    createSchoolPartnershipsSection();
    createSchoolStatsSection();
    updateAboutPageSchools();
    initSchoolTooltips();
    initSchoolFiltering();
}

function createSchoolPartnershipsSection() {
    const partnershipsHTML = `
    <section class="school-partnerships" id="school-partnerships">
        <div class="container">
            <div class="section-header animate-fade-up">
                <h2 class="section-title">Our Educational Partners</h2>
                <p class="section-subtitle">Representing excellence across India's top educational institutions</p>
            </div>
            
            <div class="partnership-stats animate-fade-up">
                <div class="stat-item">
                    <span class="stat-number" data-count="${Object.keys(schoolsData).length}">0</span>
                    <span class="stat-label">Partner Schools</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-count="${teamMembersWithSchools.length}">0</span>
                    <span class="stat-label">Student Contributors</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-count="${new Set(teamMembersWithSchools.map(m => m.city)).size}">0</span>
                    <span class="stat-label">Cities</span>
                </div>
            </div>
            
            <div class="schools-filter">
                <button class="filter-btn active" data-filter="all">All Schools</button>
                <button class="filter-btn" data-filter="international">International</button>
                <button class="filter-btn" data-filter="private">Private</button>
                <button class="filter-btn" data-filter="public">Public</button>
                <button class="filter-btn" data-filter="academy">Academy</button>
            </div>
            
            <div class="schools-grid" id="schoolsGrid">
                ${generateSchoolCards()}
            </div>
        </div>
    </section>
    `;
    
    const friendsSection = document.getElementById('friends');
    if (friendsSection) {
        friendsSection.insertAdjacentHTML('afterend', partnershipsHTML);
    } else {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.insertAdjacentHTML('beforebegin', partnershipsHTML);
        }
    }
}

function generateSchoolCards() {
    return Object.entries(schoolsData).map(([key, school]) => {
        const studentCount = school.students.length;
        const typeClass = school.type.toLowerCase().replace(/\s+/g, '-');
        
        return `
        <div class="school-card animate-pop" data-school="${key}" data-type="${typeClass}" style="--delay: 0.1s">
            <div class="school-header">
                <div class="school-logo-container">
                    <img src="${school.logo}" alt="${school.name}" class="school-logo" 
                         onerror="this.src='images/school-placeholder.svg'">
                    <div class="school-overlay">
                        <span class="student-count">${studentCount} contributor${studentCount !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div class="school-badge">${school.type}</div>
            </div>
            
            <div class="school-info">
                <h3 class="school-name">${school.name}</h3>
                <p class="school-location">📍 ${school.location}</p>
                <p class="school-established">Est. ${school.established}</p>
                
                <div class="school-contributors">
                    <h4>Our Contributors:</h4>
                    <div class="contributors-list">
                        ${school.students.map(student => {
                            const member = teamMembersWithSchools.find(m => m.name === student);
                            return `
                            <div class="contributor-item" title="${member ? member.role : 'Contributor'}">
                                <span class="contributor-name">${student}</span>
                                <span class="contributor-role">${member ? member.role.split(',')[0] : 'Contributor'}</span>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="school-actions">
                    ${school.website !== '#' ? `<a href="${school.website}" target="_blank" class="school-link">Visit Website</a>` : ''}
                    <button class="view-contributors-btn" onclick="showSchoolContributors('${key}')">View All</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function createSchoolStatsSection() {
    const statsHTML = `
    <div class="school-statistics">
        <div class="stats-header">
            <h3>Contribution Statistics</h3>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-visual">
                    <canvas id="schoolDistributionChart" width="200" height="200"></canvas>
                </div>
                <div class="stat-info">
                    <h4>Schools by Type</h4>
                    <div class="legend">
                        ${generateSchoolTypeLegend()}
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-visual">
                    <canvas id="cityDistributionChart" width="200" height="200"></canvas>
                </div>
                <div class="stat-info">
                    <h4>Contributors by City</h4>
                    <div class="legend">
                        ${generateCityLegend()}
                    </div>
                </div>
            </div>
            
            <div class="stat-card full-width">
                <h4>Role Distribution Across Schools</h4>
                <div class="role-distribution">
                    ${generateRoleDistribution()}
                </div>
            </div>
        </div>
    </div>
    `;
    
    const partnershipsSection = document.querySelector('.school-partnerships .container');
    if (partnershipsSection) {
        partnershipsSection.insertAdjacentHTML('beforeend', statsHTML);
    }
}

function generateSchoolTypeLegend() {
    const types = {};
    Object.values(schoolsData).forEach(school => {
        types[school.type] = (types[school.type] || 0) + 1;
    });
    
    const colors = ['#F45D01', '#EE6C4D', '#F5C125', '#EEB902', '#D45113'];
    
    return Object.entries(types).map(([type, count], index) => `
        <div class="legend-item">
            <span class="legend-color" style="background-color: ${colors[index % colors.length]}"></span>
            <span class="legend-text">${type} (${count})</span>
        </div>
    `).join('');
}

function generateCityLegend() {
    const cities = {};
    teamMembersWithSchools.forEach(member => {
        cities[member.city] = (cities[member.city] || 0) + 1;
    });
    
    const colors = ['#F45D01', '#EE6C4D', '#F5C125', '#EEB902', '#D45113', '#813405'];
    
    return Object.entries(cities).map(([city, count], index) => `
        <div class="legend-item">
            <span class="legend-color" style="background-color: ${colors[index % colors.length]}"></span>
            <span class="legend-text">${city} (${count})</span>
        </div>
    `).join('');
}

function generateRoleDistribution() {
    const roles = {};
    teamMembersWithSchools.forEach(member => {
        const mainRole = member.role.split(',')[0].trim();
        roles[mainRole] = (roles[mainRole] || 0) + 1;
    });
    
    const total = teamMembersWithSchools.length;
    
    return Object.entries(roles).map(([role, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return `
        <div class="role-bar">
            <div class="role-info">
                <span class="role-name">${role}</span>
                <span class="role-count">${count} (${percentage}%)</span>
            </div>
            <div class="role-progress">
                <div class="role-fill" style="width: ${percentage}%"></div>
            </div>
        </div>
        `;
    }).join('');
}

function updateAboutPageSchools() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const schoolRepresentation = `
    <div class="school-representation animate-fade-up">
        <h3>Representing India's Educational Excellence</h3>
        <p>Our contributors come from ${Object.keys(schoolsData).length} prestigious institutions across ${new Set(teamMembersWithSchools.map(m => m.city)).size} cities, bringing diverse perspectives and experiences to create this comprehensive guide.</p>
        
        <div class="school-logos-strip">
            ${Object.entries(schoolsData).slice(0, 8).map(([key, school]) => `
                <div class="logo-item" title="${school.name}, ${school.location}">
                    <img src="${school.logo}" alt="${school.name}" onerror="this.src='images/school-placeholder.svg'">
                </div>
            `).join('')}
        </div>
    </div>
    `;
    
    const featuresGrid = aboutSection.querySelector('.features-grid');
    if (featuresGrid) {
        featuresGrid.insertAdjacentHTML('afterend', schoolRepresentation);
    }
}

function initSchoolTooltips() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('school-logo') || e.target.closest('.logo-item')) {
            const tooltip = createTooltip(e.target);
            document.body.appendChild(tooltip);
            positionTooltip(tooltip, e);
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('school-logo') || e.target.closest('.logo-item')) {
            const tooltip = document.querySelector('.school-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        }
    });
}

function createTooltip(element) {
    const schoolCard = element.closest('.school-card');
    const logoItem = element.closest('.logo-item');
    
    let schoolKey, school;
    
    if (schoolCard) {
        schoolKey = schoolCard.dataset.school;
        school = schoolsData[schoolKey];
    } else if (logoItem) {
        const schoolName = logoItem.querySelector('img').alt;
        schoolKey = Object.keys(schoolsData).find(key => schoolsData[key].name === schoolName);
        school = schoolsData[schoolKey];
    }
    
    if (!school) return document.createElement('div');
    
    const tooltip = document.createElement('div');
    tooltip.className = 'school-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <img src="${school.logo}" alt="${school.name}" class="tooltip-logo">
            <div>
                <h4>${school.name}</h4>
                <p>${school.location} • Est. ${school.established}</p>
            </div>
        </div>
        <div class="tooltip-content">
            <p><strong>${school.students.length} contributors</strong> from ${school.type}</p>
            <div class="tooltip-students">
                ${school.students.slice(0, 3).join(', ')}${school.students.length > 3 ? '...' : ''}
            </div>
        </div>
    `;
    
    return tooltip;
}

function positionTooltip(tooltip, event) {
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = event.clientX + 10;
    let top = event.clientY - rect.height - 10;
    
    if (left + rect.width > viewportWidth) {
        left = event.clientX - rect.width - 10;
    }
    
    if (top < 0) {
        top = event.clientY + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

function initSchoolFiltering() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            filterSchoolCards(filter);
        }
    });
}

function filterSchoolCards(filter) {
    const schoolCards = document.querySelectorAll('.school-card');
    
    schoolCards.forEach(card => {
        const cardType = card.dataset.type;
        
        if (filter === 'all' || cardType.includes(filter)) {
            card.style.display = 'block';
            card.classList.add('animate-pop');
        } else {
            card.style.display = 'none';
        }
    });
}

function showSchoolContributors(schoolKey) {
    const school = schoolsData[schoolKey];
    if (!school) return;
    
    const modal = document.createElement('div');
    modal.className = 'contributors-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.contributors-modal').remove()">&times;</button>
            
            <div class="modal-header">
                <img src="${school.logo}" alt="${school.name}" class="modal-school-logo">
                <div class="modal-school-info">
                    <h2>${school.name}</h2>
                    <p>${school.location} • ${school.type}</p>
                    <p>Established ${school.established}</p>
                </div>
            </div>
            
            <div class="contributors-grid">
                ${school.students.map(studentName => {
                    const member = teamMembersWithSchools.find(m => m.name === studentName);
                    return `
                    <div class="contributor-card">
                        <div class="contributor-avatar">
                            ${studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div class="contributor-details">
                            <h3>${studentName}</h3>
                            <p class="contributor-role">${member ? member.role : 'Contributor'}</p>
                            <p class="contributor-grade">${member ? member.grade : 'Student'}</p>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            
            ${school.website !== '#' ? `
            <div class="modal-actions">
                <a href="${school.website}" target="_blank" class="visit-website-btn">
                    Visit ${school.name} Website
                </a>
            </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    if (window.gsap) {
        gsap.fromTo(modal.querySelector('.modal-content'), 
            {scale: 0.5, opacity: 0, y: 50},
            {scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)'}
        );
    }
}

function createSchoolCharts() {
    const schoolCtx = document.getElementById('schoolDistributionChart');
    if (schoolCtx) {
        const types = {};
        Object.values(schoolsData).forEach(school => {
            types[school.type] = (types[school.type] || 0) + 1;
        });
        
        drawPieChart(schoolCtx, types, ['#F45D01', '#EE6C4D', '#F5C125', '#EEB902', '#D45113']);
    }
    
    const cityCtx = document.getElementById('cityDistributionChart');
    if (cityCtx) {
        const cities = {};
        teamMembersWithSchools.forEach(member => {
            cities[member.city] = (cities[member.city] || 0) + 1;
        });
        
        drawPieChart(cityCtx, cities, ['#F45D01', '#EE6C4D', '#F5C125', '#EEB902', '#D45113', '#813405']);
    }
}

function drawPieChart(canvas, data, colors) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    let currentAngle = -Math.PI / 2;
    
    Object.entries(data).forEach(([label, value], index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initSchoolLogosSystem();
        createSchoolCharts();
    }, 1000);
});

window.SchoolLogosSystem = {
    initSchoolLogosSystem,
    showSchoolContributors,
    schoolsData,
    teamMembersWithSchools
};