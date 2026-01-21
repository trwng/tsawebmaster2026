// volunteer stuff 
var volunteerData = [
    {
        id: "1",
        title: "Food Bank Sorting Drive",
        organization: "Gwinnett County Food Bank",
        description: "Help sort and organize donated food items for families in need across Gwinnett County. Great for groups and first-time volunteers!",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
        date: "February 15, 2026",
        time: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        location: "550 Swanson Drive, Lawrenceville, GA 30043",
        category: "Food Security",
        additionalInfo: "Wear closed-toe shoes. Water provided."
    },
    {
        id: "2",
        title: "opportunity 2",
        organization: "organization 2",
        description: "description 2",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        date: "date 2",
        time: "time 2",
        duration: "duration 2",
        location: "location 2",
        category: "category",
        additionalInfo: "idk"
    },
    {
        id: "3",
        title: "3",
        organization: "3",
        description: "3",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
        date: "3",
        time: "3M",
        duration: "3",
        location: "3",
        category: "3",
        additionalInfo: "3"
    },
    {
        id: "4",
        title: "4",
        organization: "4",
        description: "4",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop",
        date: "4",
        time: "4",
        duration: "4",
        location: "4",
        category: "4",
        additionalInfo: "4"
    },
    {
        id: "5",
        title: "5",
        organization: "5",
        description: "P5",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
        date: "5",
        time: "5",
        duration: "5",
        location: "5",
        category: "5",
        additionalInfo: "5"
    }
];

// stuff i need 
var cardList = [...volunteerData];
var myMatches = [];
var lastThing = null;

// get elements
var stack = document.getElementById('cardStack');
var endThingy = document.getElementById('endScreen');
var matchText = document.getElementById('matchCount');
var resetButton = document.getElementById('resetBtn');
var btns = document.getElementById('swipeButtons');
var noBtn = document.getElementById('rejectBtn');
var yesBtn = document.getElementById('acceptBtn');
var undoButton = document.getElementById('undoBtn');
var badge = document.getElementById('matchBadge');
var badgeNum = document.getElementById('matchCountBadge');

// make card html
function makeCard(opp, idx) {
    var topOne = idx === cardList.length - 1;
    
    var html = `
        <div class="swipe-card" data-id="${opp.id}" data-index="${idx}" style="z-index: ${idx}; ${!topOne ? 'transform: scale(0.95) translateY(10px); opacity: 0.8;' : ''}">
            <div class="card">
                <div class="card-image-container">
                    <img src="${opp.image}" alt="${opp.title}" class="card-image">
                    <div class="card-image-overlay"></div>
                    <div class="card-category">${opp.category}</div>
                    <div class="card-accept">YES! ✓</div>
                    <div class="card-reject">NOPE</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${opp.title}</h3>
                    <p class="card-organization">${opp.organization}</p>
                    <p class="card-description">${opp.description}</p>
                    <div class="card-details">
                        <div class="card-detail">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>${opp.date}</span>
                        </div>
                        <div class="card-detail">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${opp.duration}</span>
                        </div>
                        <div class="card-detail card-detail-full">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${opp.location}</span>
                        </div>
                        ${opp.additionalInfo ? `
                        <div class="card-detail card-detail-full card-detail-info">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <span>${opp.additionalInfo}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    return html;
}

// show cards
function showCards() {
    stack.innerHTML = cardList.map((thing, i) => makeCard(thing, i)).join('');
    
    if(cardList.length > 0) {
        var topCard = stack.querySelector('.swipe-card:last-child');
        if(topCard) {
            makeDraggable(topCard);
        }
    }
}

// drag stuff
function makeDraggable(c) {
    var dragging = false;
    var startPos = 0;
    var currentPos = 0;
    
    var yesLabel = c.querySelector('.card-accept');
    var noLabel = c.querySelector('.card-reject');
    
    function start(e) {
        dragging = true;
        c.classList.add('dragging');
        startPos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentPos = startPos;
    }
    
    function move(e) {
        if(!dragging) return;
        
        e.preventDefault();
        var x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentPos = x;
        var diff = currentPos - startPos;
        var rot = diff / 10;
        
        c.style.transform = `translateX(${diff}px) rotate(${rot}deg)`;
        c.style.opacity = 1 - Math.abs(diff) / 400;
        
        if(diff > 50) {
            yesLabel.style.opacity = Math.min(diff / 100, 1);
            noLabel.style.opacity = 0;
        }
        else if(diff < -50) {
            noLabel.style.opacity = Math.min(Math.abs(diff) / 100, 1);
            yesLabel.style.opacity = 0;
        }
        else {
            yesLabel.style.opacity = 0;
            noLabel.style.opacity = 0;
        }
    }
    
    function end() {
        if(!dragging) return;
        
        dragging = false;
        c.classList.remove('dragging');
        
        var diff = currentPos - startPos;
        
        if(diff > 100) {
            doSwipe('right', c);
        }
        else if(diff < -100) {
            doSwipe('left', c);
        }
        else {
            c.style.transform = '';
            c.style.opacity = '';
            yesLabel.style.opacity = 0;
            noLabel.style.opacity = 0;
        }
    }
    
    c.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    
    c.addEventListener('touchstart', start, {passive: false});
    document.addEventListener('touchmove', move, {passive: false});
    document.addEventListener('touchend', end);
}

// swipe the card
function doSwipe(dir, cardEl = null) {
    if(cardList.length === 0) return;
    
    var thing = cardList[cardList.length - 1];
    lastThing = thing;
    
    if(dir === 'right') {
        myMatches.push(thing);
        fixBadge();
    }
    
    var theCard = cardEl || stack.querySelector('.swipe-card:last-child');
    if(theCard) {
        theCard.classList.add('swiping-out');
        var moveX = dir === 'right' ? 300 : -300;
        theCard.style.transform = `translateX(${moveX}px) rotate(${dir === 'right' ? 25 : -25}deg)`;
        theCard.style.opacity = '0';
        
        setTimeout(() => {
            cardList.pop();
            checkIfDone();
            showCards();
            showUndo();
        }, 300);
    }
    else {
        cardList.pop();
        checkIfDone();
        showCards();
        showUndo();
    }
}

// undo last one
function goBack() {
    if(!lastThing) return;
    
    cardList.push(lastThing);
    myMatches = myMatches.filter(x => x.id !== lastThing.id);
    lastThing = null;
    
    showCards();
    hideUndo();
    fixBadge();
    checkIfDone();
}

// show undo btn
function showUndo() {
    undoButton.style.display = 'flex';
}

function hideUndo() {
    undoButton.style.display = 'none';
}

// update badge thing
function fixBadge() {
    if(myMatches.length > 0 && cardList.length > 0) {
        badge.style.display = 'block';
        badgeNum.textContent = myMatches.length;
    }
    else {
        badge.style.display = 'none';
    }
}

// check if we're done
function checkIfDone() {
    if(cardList.length === 0) {
        stack.style.display = 'none';
        btns.style.display = 'none';
        badge.style.display = 'none';
        endThingy.style.display = 'block';
        matchText.textContent = `You matched with ${myMatches.length} volunteer ${myMatches.length === 1 ? 'opportunity' : 'opportunities'}`;
    }
    else {
        stack.style.display = 'flex';
        btns.style.display = 'flex';
        endThingy.style.display = 'none';
    }
}

// start over
function startOver() {
    cardList = [...volunteerData];
    myMatches = [];
    lastThing = null;
    
    showCards();
    hideUndo();
    fixBadge();
    checkIfDone();
}

// button clicks
noBtn.addEventListener('click', () => doSwipe('left'));
yesBtn.addEventListener('click', () => doSwipe('right'));
undoButton.addEventListener('click', goBack);
resetButton.addEventListener('click', startOver);

// smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// start everything
showCards();
checkIfDone();
