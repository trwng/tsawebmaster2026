// page navigation
function showPage(pageName) {
    // hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // show selected page
    document.getElementById('page-' + pageName).classList.add('active');
    // update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.onclick && link.onclick.toString().includes(pageName)) {
            link.classList.add('active');
        }
    });
    // scroll to top
    window.scrollTo(0, 0);
}

// volunteer data
var opportunities = [
    {
        id: "1",
        title: "Food Bank Sorting Drive",
        organization: "Gwinnett County Food Bank",
        description: "Help sort and organize donated food items for families in need. Great for groups!",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
        date: "Feb 15, 2026",
        duration: "3 hours",
        location: "Lawrenceville, GA",
        category: "Food Security"
    },
    {
        id: "2",
        title: "Community Tree Planting",
        organization: "Gwinnett Parks",
        description: "Plant native trees and beautify local parks. Tools provided!",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        date: "Feb 22, 2026",
        duration: "3 hours",
        location: "Duluth, GA",
        category: "Environment"
    },
    {
        id: "3",
        title: "After-School Tutoring",
        organization: "Gwinnett Library",
        description: "Tutor elementary students in reading and math.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
        date: "Every Tuesday",
        duration: "2 hours",
        location: "Suwanee, GA",
        category: "Education"
    },
    {
        id: "4",
        title: "Neighborhood Cleanup",
        organization: "Keep Gwinnett Beautiful",
        description: "Pick up litter and beautify public spaces.",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop",
        date: "Mar 1, 2026",
        duration: "3 hours",
        location: "Lilburn, GA",
        category: "Environment"
    },
    {
        id: "5",
        title: "Soup Kitchen Service",
        organization: "Hope Shelter",
        description: "Prepare and serve meals to those in need.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
        date: "Every Saturday",
        duration: "3 hours",
        location: "Duluth, GA",
        category: "Hunger Relief"
    }
];

var cards = [...opportunities];
var matched = [];
var lastSwiped = null;

// elements
var stack = document.getElementById('cardStack');
var endScreen = document.getElementById('endScreen');
var matchCount = document.getElementById('matchCount');
var resetBtn = document.getElementById('resetBtn');
var swipeButtons = document.getElementById('swipeButtons');
var rejectBtn = document.getElementById('rejectBtn');
var acceptBtn = document.getElementById('acceptBtn');
var undoBtn = document.getElementById('undoBtn');
var matchBadge = document.getElementById('matchBadge');
var matchCountBadge = document.getElementById('matchCountBadge');

function createCard(opp, index) {
    var isTop = index === cards.length - 1;
    var html = `
        <div class="swipe-card" data-id="${opp.id}" style="z-index:${index}; ${!isTop ? 'transform:scale(0.95) translateY(10px); opacity:0.8;' : ''}">
            <div class="card-image-container" style="background-image:url('${opp.image}')"></div>
            <div class="card-content">
                <h3 class="card-title">${opp.title}</h3>
                <p class="card-organization">${opp.organization}</p>
                <p class="card-description">${opp.description}</p>
                <div class="card-details">
                    <span>📅 ${opp.date}</span>
                    <span>⏰ ${opp.duration}</span>
                    <span>📍 ${opp.location}</span>
                </div>
            </div>
        </div>
    `;
    return html;
}

function renderCards() {
    if(!stack) return;
    stack.innerHTML = cards.map((o, i) => createCard(o, i)).join('');
    if(cards.length > 0) {
        var topCard = stack.querySelector('.swipe-card:last-child');
        if(topCard) setupDrag(topCard);
    }
}

function setupDrag(card) {
    var isDragging = false;
    var startX = 0;
    var currentX = 0;
    
    function handleStart(e) {
        isDragging = true;
        card.classList.add('dragging');
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
    
    function handleMove(e) {
        if(!isDragging) return;
        e.preventDefault();
        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        var deltaX = currentX - startX;
        var rotate = deltaX / 10;
        card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
    }
    
    function handleEnd() {
        if(!isDragging) return;
        isDragging = false;
        card.classList.remove('dragging');
        var deltaX = currentX - startX;
        
        if(deltaX > 100) {
            swipeCard('right', card);
        } else if(deltaX < -100) {
            swipeCard('left', card);
        } else {
            card.style.transform = '';
        }
    }
    
    card.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    card.addEventListener('touchstart', handleStart, {passive:false});
    document.addEventListener('touchmove', handleMove, {passive:false});
    document.addEventListener('touchend', handleEnd);
}

function swipeCard(direction, cardElement) {
    if(cards.length === 0) return;
    
    var swiped = cards[cards.length - 1];
    lastSwiped = swiped;
    
    if(direction === 'right') {
        matched.push(swiped);
        updateMatchBadge();
    }
    
    var card = cardElement || stack.querySelector('.swipe-card:last-child');
    if(card) {
        card.style.transform = `translateX(${direction === 'right' ? 300 : -300}px) rotate(${direction === 'right' ? 25 : -25}deg)`;
        card.style.opacity = '0';
        
        setTimeout(() => {
            cards.pop();
            checkEndState();
            renderCards();
            showUndoButton();
        }, 300);
    } else {
        cards.pop();
        checkEndState();
        renderCards();
        showUndoButton();
    }
}

function undoSwipe() {
    if(!lastSwiped) return;
    cards.push(lastSwiped);
    matched = matched.filter(o => o.id !== lastSwiped.id);
    lastSwiped = null;
    renderCards();
    hideUndoButton();
    updateMatchBadge();
    checkEndState();
}

function showUndoButton() {
    if(undoBtn) undoBtn.style.display = 'block';
}

function hideUndoButton() {
    if(undoBtn) undoBtn.style.display = 'none';
}

function updateMatchBadge() {
    if(!matchBadge) return;
    if(matched.length > 0 && cards.length > 0) {
        matchBadge.style.display = 'block';
        if(matchCountBadge) matchCountBadge.textContent = matched.length;
    } else {
        matchBadge.style.display = 'none';
    }
}

function checkEndState() {
    if(!stack || !endScreen) return;
    if(cards.length === 0) {
        stack.style.display = 'none';
        if(swipeButtons) swipeButtons.style.display = 'none';
        if(matchBadge) matchBadge.style.display = 'none';
        endScreen.style.display = 'block';
        if(matchCount) matchCount.textContent = `You matched with ${matched.length} opportunities!`;
    } else {
        stack.style.display = 'block';
        if(swipeButtons) swipeButtons.style.display = 'flex';
        endScreen.style.display = 'none';
    }
}

function reset() {
    cards = [...opportunities];
    matched = [];
    lastSwiped = null;
    renderCards();
    hideUndoButton();
    updateMatchBadge();
    checkEndState();
}

// event listeners
if(rejectBtn) rejectBtn.addEventListener('click', () => swipeCard('left'));
if(acceptBtn) acceptBtn.addEventListener('click', () => swipeCard('right'));
if(undoBtn) undoBtn.addEventListener('click', undoSwipe);
if(resetBtn) resetBtn.addEventListener('click', reset);

// contact form
var contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thanks! We will be in touch soon.');
        this.reset();
    });
}

// initialize
renderCards();
checkEndState();
