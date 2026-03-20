// ─── FIREBASE SETUP ──────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 REPLACE THESE WITH YOUR FIREBASE PROJECT CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyCaB7ZWO8H3yGb5HgYugPC5H34v04dQEIg",
    authDomain: "asdsa-dd21b.firebaseapp.com",
    projectId: "asdsa-dd21b",
    storageBucket: "asdsa-dd21b.firebasestorage.app",
    messagingSenderId: "974031166434",
    appId: "1:974031166434:web:cb10ff73b27d5938a6b7bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── NAVIGATION ──────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('data-target');
        if (!target) return;
        document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
        var pg = document.getElementById('page-' + target);
        if (pg) pg.classList.add('active');
        document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
        document.querySelectorAll('[data-target="' + target + '"]').forEach(function(l) { l.classList.add('active'); });
        document.getElementById('mobileNav').classList.remove('open');
        window.scrollTo(0, 0);
        if (target === 'home') startCounters();
    });
});

document.querySelectorAll('[data-target]').forEach(function(btn) {
    if (btn.tagName === 'BUTTON' || btn.classList.contains('btn-white') || btn.classList.contains('btn-outline') || btn.classList.contains('spot-btn') || btn.classList.contains('try-btn')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('data-target');
            if (!target) return;
            document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
            var pg = document.getElementById('page-' + target);
            if (pg) pg.classList.add('active');
            document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
            document.querySelectorAll('[data-target="' + target + '"].nav-link').forEach(function(l) { l.classList.add('active'); });
            window.scrollTo(0, 0);
        });
    }
});

document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('mobileNav').classList.toggle('open');
});

// ─── PARTICLES ───────────────────────────────────────────────────
var canvas = document.getElementById('particles');
if (canvas) {
    var ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    var pts = [];
    for (var i = 0; i < 55; i++) {
        pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2.5 + 1, dx: (Math.random() - .5) * .8, dy: (Math.random() - .5) * .8 });
    }
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pts.forEach(function(p) {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
}

// ─── ANIMATED COUNTERS ───────────────────────────────────────────
var countersStarted = false;
function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.ctr-n').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-to'));
        var start = 0;
        var step = target / 60;
        function tick() {
            start += step;
            if (start < target) { el.textContent = Math.floor(start).toLocaleString(); requestAnimationFrame(tick); }
            else { el.textContent = target.toLocaleString() + '+'; }
        }
        tick();
    });
}
var counterSection = document.querySelector('.counters');
if (counterSection) {
    var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) startCounters();
    }, { threshold: 0.4 });
    obs.observe(counterSection);
}

// ─── LIVE ACTIVITY FEED ──────────────────────────────────────────
var names = ['Sarah M.','James L.','Maria G.','David K.','Emily R.','Michael P.','Jessica T.','Robert H.','Lisa W.','Chris B.','Aisha N.','Tyler S.'];
var actions = ['signed up for Food Bank Sorting','volunteered at Tree Planting','completed a tutoring session','joined Neighborhood Cleanup','helped at Soup Kitchen','registered for Park Cleanup','joined the Library Reading Program','signed up for Senior Center Help'];
var locs = ['Lawrenceville','Duluth','Suwanee','Norcross','Buford','Lilburn'];

function addFeedItem() {
    var feed = document.getElementById('activityFeed');
    if (!feed) return;
    var n = names[Math.floor(Math.random() * names.length)];
    var a = actions[Math.floor(Math.random() * actions.length)];
    var l = locs[Math.floor(Math.random() * locs.length)];
    var m = Math.floor(Math.random() * 20) + 1;
    var item = document.createElement('div');
    item.className = 'feed-item';
    item.innerHTML = '<div class="feed-name">' + n + '</div><div class="feed-action">' + a + ' in ' + l + '</div><div class="feed-time">' + m + 'm ago</div>';
    feed.insertBefore(item, feed.firstChild);
    while (feed.children.length > 7) feed.removeChild(feed.lastChild);
}
for (var i = 0; i < 5; i++) { (function(delay) { setTimeout(addFeedItem, delay * 180); })(i); }
setInterval(addFeedItem, 4500);

// ─── DRAG PREVIEW CARDS ──────────────────────────────────────────
document.querySelectorAll('.drag-card').forEach(function(card) {
    var sx, sy, ox, oy, dragging = false;
    card.addEventListener('mousedown', function(e) { dragging = true; sx = e.clientX; sy = e.clientY; ox = 0; oy = 0; card.style.zIndex = 10; card.style.transition = 'none'; });
    document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        ox = e.clientX - sx; oy = e.clientY - sy;
        card.style.transform = 'translate(' + ox + 'px,' + oy + 'px) rotate(' + (ox * 0.06) + 'deg)';
    });
    document.addEventListener('mouseup', function() {
        if (!dragging) return; dragging = false;
        card.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
        card.style.transform = ''; card.style.zIndex = '';
    });
    card.addEventListener('touchstart', function(e) { dragging = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; card.style.transition='none'; }, {passive:true});
    card.addEventListener('touchmove', function(e) { if (!dragging) return; ox = e.touches[0].clientX - sx; oy = e.touches[0].clientY - sy; card.style.transform = 'translate('+ox+'px,'+oy+'px) rotate('+(ox*.06)+'deg)'; }, {passive:true});
    card.addEventListener('touchend', function() { dragging=false; card.style.transition='transform .4s cubic-bezier(.34,1.56,.64,1)'; card.style.transform=''; });
});

// ─── SEED RESOURCES (hardcoded defaults) ─────────────────────────
var seedResources = [
    { name: 'Gwinnett County Food Bank', cat: 'Food', loc: 'Lawrenceville', desc: 'Provides food assistance to 700+ families weekly through sorting drives, mobile pantries, and holiday meal programs.', phone: '(770) 963-6986', web: 'gcfoodbank.org', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Gwinnett Public Library', cat: 'Education', loc: 'Multiple Locations', desc: 'Free tutoring, ESL classes, digital literacy programs, and after-school support for all ages.', web: 'gwinnettpl.org', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Keep Gwinnett Beautiful', cat: 'Environment', loc: 'Gwinnett-wide', desc: 'Volunteer cleanups, tree plantings, and environmental education throughout the county. Free to join!', web: 'keepgwinnettbeautiful.org', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Gwinnett Hope Shelter', cat: 'Housing', loc: 'Duluth', desc: 'Emergency housing, meal service, and wraparound support for individuals experiencing homelessness.', phone: '(770) 476-7251', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Boys & Girls Club of Gwinnett', cat: 'Youth', loc: 'Lawrenceville', desc: 'After-school and summer programs for youth ages 6–18. Academic support, sports, and mentorship.', web: 'bgcgwinnett.org', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Gwinnett Senior Services', cat: 'Seniors', loc: 'Multiple Locations', desc: 'Meal delivery, transportation assistance, and social programs for adults 60+. Volunteers always needed.', phone: '(770) 995-0255', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Habitat for Humanity Gwinnett', cat: 'Housing', loc: 'Norcross', desc: 'Building affordable homes and repairing existing ones for low-income families. Weekend build days open to all.', web: 'habitatgwinnett.org', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Gwinnett Parks & Recreation', cat: 'Environment', loc: 'Multiple Parks', desc: 'Volunteers help maintain parks, run youth sports leagues, and organize community events year-round.', web: 'gwinnettcounty.com', img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Lilburn Cooperative Ministry', cat: 'Food', loc: 'Lilburn', desc: 'Emergency food pantry, utility assistance, and holiday food boxes for Gwinnett County families in need.', phone: '(770) 921-8504', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Lawrenceville Female Seminary', cat: 'Education', loc: 'Lawrenceville', desc: 'Historical preservation and educational programs promoting the rich history of Gwinnett County.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Gwinnett Medical Center Foundation', cat: 'Health', loc: 'Lawrenceville', desc: 'Free health screenings, wellness programs, and support groups for cancer patients and their families.', web: 'gwinnettmedical.org', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=300&fit=crop', fromFirebase: false },
    { name: 'Norcross Community Garden', cat: 'Environment', loc: 'Norcross', desc: 'Community growing plots, gardening workshops, and fresh produce donations to local food pantries.', img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=300&fit=crop', fromFirebase: false },
];

// Category → Unsplash fallback images
var catImages = {
    'Food': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=300&fit=crop',
    'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
    'Environment': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=300&fit=crop',
    'Housing': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    'Health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=300&fit=crop',
    'Youth': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop',
    'Seniors': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=300&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop',
};

// ─── COMBINED RESOURCE LIST (seed + firebase) ─────────────────────
var allResources = seedResources.slice();
var firebaseResources = []; // tracks what came from Firestore

// ─── RESOURCE GRID RENDER ─────────────────────────────────────────
function buildResourceGrid() {
    var grid = document.getElementById('resourceGrid');
    if (!grid) return;
    grid.innerHTML = allResources.map(function(r) {
        var newBadge = r.fromFirebase ? '<span class="res-new-badge">✨ New</span>' : '';
        return '<div class="res-card" data-cat="' + r.cat + '" data-name="' + r.name.toLowerCase() + '" data-loc="' + (r.loc || '').toLowerCase() + '">'
            + '<div class="res-top" style="background-image:url(\'' + (r.img || catImages[r.cat] || catImages['Other']) + '\')">'
            + '<span class="res-cat">' + r.cat + '</span>' + newBadge + '</div>'
            + '<div class="res-body"><h3>' + r.name + '</h3>'
            + '<p>' + r.desc + '</p>'
            + '<div class="res-meta">'
            + (r.phone ? '<span>📞 ' + r.phone + '</span>' : '')
            + (r.web ? '<span>🌐 ' + r.web + '</span>' : '')
            + (r.loc ? '<span>📍 ' + r.loc + '</span>' : '')
            + '</div></div></div>';
    }).join('');
    filterResources();
}

// ─── SEARCH + FILTER ─────────────────────────────────────────────
var activeFilter = 'all';
function filterResources() {
    var query = (document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '');
    var cards = document.querySelectorAll('.res-card');
    var shown = 0;
    cards.forEach(function(card) {
        var matchesCat = activeFilter === 'all' || card.getAttribute('data-cat') === activeFilter;
        var matchesSearch = !query || card.getAttribute('data-name').includes(query) || card.getAttribute('data-cat').toLowerCase().includes(query) || card.getAttribute('data-loc').includes(query) || card.querySelector('p').textContent.toLowerCase().includes(query);
        if (matchesCat && matchesSearch) { card.classList.remove('hidden'); shown++; } else { card.classList.add('hidden'); }
    });
    var noR = document.getElementById('noResults');
    if (noR) noR.style.display = shown === 0 ? 'block' : 'none';
}

var searchEl = document.getElementById('searchInput');
if (searchEl) searchEl.addEventListener('input', filterResources);

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        activeFilter = this.getAttribute('data-filter');
        filterResources();
    });
});

// ─── SWIPE DECK ───────────────────────────────────────────────────
// Seed swipe opportunities
var seedOpportunities = [
    { id: 's1', title: 'Food Bank Sorting Drive', org: 'Gwinnett County Food Bank', desc: 'Help sort donated food items for families in need. Great for groups and first-timers!', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop', date: 'Feb 15, 2026', duration: '3 hours', loc: 'Lawrenceville, GA' },
    { id: 's2', title: 'Community Tree Planting', org: 'Gwinnett Parks & Recreation', desc: 'Plant native trees and beautify local parks. Tools and gloves provided!', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop', date: 'Feb 22, 2026', duration: '3 hours', loc: 'Duluth, GA' },
    { id: 's3', title: 'After-School Tutoring', org: 'Gwinnett Public Library', desc: "Tutor elementary students in reading and math. Super rewarding, we promise.", img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop', date: 'Every Tuesday', duration: '2 hours', loc: 'Suwanee, GA' },
    { id: 's4', title: 'Neighborhood Cleanup Day', org: 'Keep Gwinnett Beautiful', desc: 'Pick up litter and beautify public spaces together. Trash bags provided.', img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=500&fit=crop', date: 'Mar 1, 2026', duration: '3 hours', loc: 'Lilburn, GA' },
    { id: 's5', title: 'Soup Kitchen Service', org: 'Gwinnett Hope Shelter', desc: 'Prepare and serve meals to those experiencing homelessness. Meaningful work.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop', date: 'Every Saturday', duration: '3 hours', loc: 'Duluth, GA' },
];

var allOpportunities = seedOpportunities.slice();
var deck = allOpportunities.slice();
var matched = [];
var lastSwiped = null;

var stackEl = document.getElementById('cardStack');
var endEl = document.getElementById('endScreen');
var matchTxt = document.getElementById('matchCountTxt');
var swipeBtns = document.getElementById('swipeBtns');
var rejectBtn = document.getElementById('rejectBtn');
var acceptBtn = document.getElementById('acceptBtn');
var undoBtn = document.getElementById('undoBtn');
var resetBtn = document.getElementById('resetBtn');
var matchBadge = document.getElementById('matchBadge');
var matchNum = document.getElementById('matchNum');

function buildCards() {
    if (!stackEl) return;
    stackEl.innerHTML = deck.map(function(o, i) {
        var isTop = i === deck.length - 1;
        var newTag = o.fromFirebase ? '<span class="sc-new-tag">✨ NEW</span>' : '';
        return '<div class="swipe-card" data-id="' + o.id + '" style="z-index:' + i + ';' + (!isTop ? 'transform:scale(.96) translateY(10px);opacity:.8;' : '') + '">'
            + '<div class="sc-img" style="background-image:url(\'' + o.img + '\')"></div>'
            + '<div class="sc-body">'
            + newTag
            + '<h3 class="sc-title">' + o.title + '</h3>'
            + '<p class="sc-org">' + o.org + '</p>'
            + '<p class="sc-desc">' + o.desc + '</p>'
            + '<div class="sc-meta">'
            + (o.date ? '<span>📅 ' + o.date + '</span>' : '')
            + (o.duration ? '<span>⏰ ' + o.duration + '</span>' : '')
            + (o.loc ? '<span>📍 ' + o.loc + '</span>' : '')
            + '</div></div></div>';
    }).join('');

    var top = stackEl.querySelector('.swipe-card:last-child');
    if (top) enableDrag(top);
}

function enableDrag(card) {
    var startX = 0, curX = 0, dragging = false;
    function onDown(e) { dragging = true; card.classList.add('dragging'); startX = e.touches ? e.touches[0].clientX : e.clientX; card.style.transition = 'none'; }
    function onMove(e) {
        if (!dragging) return; e.preventDefault && e.preventDefault();
        curX = (e.touches ? e.touches[0].clientX : e.clientX);
        var dx = curX - startX;
        card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 12) + 'deg)';
        card.style.borderColor = dx > 60 ? '#10B981' : dx < -60 ? '#DC2626' : 'transparent';
    }
    function onUp() {
        if (!dragging) return; dragging = false; card.classList.remove('dragging');
        var dx = curX - startX;
        card.style.transition = 'transform .3s,opacity .3s,border-color .2s';
        if (dx > 100) swipe('right', card); else if (dx < -100) swipe('left', card); else { card.style.transform = ''; card.style.borderColor = 'transparent'; }
    }
    card.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    card.addEventListener('touchstart', onDown, {passive:true});
    document.addEventListener('touchmove', onMove, {passive:false});
    document.addEventListener('touchend', onUp);
}

function swipe(dir, cardEl) {
    if (!deck.length) return;
    var item = deck[deck.length - 1];
    lastSwiped = item;
    if (dir === 'right') { matched.push(item); updateBadge(); }
    var c = cardEl || stackEl.querySelector('.swipe-card:last-child');
    if (c) { c.style.transform = 'translateX(' + (dir === 'right' ? 600 : -600) + 'px) rotate(' + (dir === 'right' ? 30 : -30) + 'deg)'; c.style.opacity = '0'; }
    setTimeout(function() { deck.pop(); buildCards(); checkDone(); showUndo(); }, 310);
}

function showUndo() { if (undoBtn) undoBtn.style.display = 'flex'; }
function hideUndo() { if (undoBtn) undoBtn.style.display = 'none'; }
function updateBadge() {
    if (!matchBadge) return;
    if (matched.length > 0 && deck.length > 0) { matchBadge.style.display = 'block'; if (matchNum) matchNum.textContent = matched.length; }
    else { matchBadge.style.display = 'none'; }
}
function checkDone() {
    if (!stackEl || !endEl) return;
    if (deck.length === 0) {
        stackEl.style.display = 'none'; if (swipeBtns) swipeBtns.style.display = 'none'; if (matchBadge) matchBadge.style.display = 'none';
        endEl.style.display = 'block'; if (matchTxt) matchTxt.textContent = 'You matched with ' + matched.length + ' opportunities!';
    } else {
        stackEl.style.display = 'block'; if (swipeBtns) swipeBtns.style.display = 'flex'; endEl.style.display = 'none';
    }
}

if (rejectBtn) rejectBtn.addEventListener('click', function() { swipe('left'); });
if (acceptBtn) acceptBtn.addEventListener('click', function() { swipe('right'); });
if (undoBtn) undoBtn.addEventListener('click', function() {
    if (!lastSwiped) return;
    deck.push(lastSwiped); matched = matched.filter(function(m) { return m.id !== lastSwiped.id; });
    lastSwiped = null; buildCards(); hideUndo(); updateBadge(); checkDone();
});
if (resetBtn) resetBtn.addEventListener('click', function() {
    deck = allOpportunities.slice(); matched = []; lastSwiped = null; buildCards(); hideUndo(); updateBadge(); checkDone();
});

buildCards(); checkDone();
buildResourceGrid();

// ─── FIREBASE REALTIME LISTENER ───────────────────────────────────
// Listens for new submitted resources in Firestore and adds them live
// to both the resource grid AND the swipe deck
var knownFirebaseIds = new Set();

var q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
onSnapshot(q, function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
            var data = change.doc.data();
            var id = change.doc.id;

            if (knownFirebaseIds.has(id)) return;
            knownFirebaseIds.add(id);

            var img = catImages[data.cat] || catImages['Other'];

            // Add to resource grid list
            var resEntry = {
                name: data.name,
                cat: data.cat,
                loc: data.loc || '',
                desc: data.desc,
                phone: data.phone || '',
                web: data.web || '',
                img: img,
                fromFirebase: true,
            };
            allResources.unshift(resEntry); // new ones go to top
            buildResourceGrid();

            // Add to swipe deck as a new opportunity
            var swipeEntry = {
                id: 'fb_' + id,
                title: data.name,
                org: data.name,
                desc: data.desc,
                img: img,
                date: 'Ongoing',
                duration: 'Flexible',
                loc: data.loc || 'Gwinnett County, GA',
                fromFirebase: true,
            };

            // Only add to deck if not already swiped through
            var alreadyInDeck = allOpportunities.some(function(o) { return o.id === swipeEntry.id; });
            if (!alreadyInDeck) {
                allOpportunities.push(swipeEntry);
                deck.push(swipeEntry);
                buildCards();
                checkDone();
                showNewResourceToast(data.name);
            }
        }
    });
});

// ─── TOAST NOTIFICATION ───────────────────────────────────────────
function showNewResourceToast(name) {
    var existing = document.getElementById('newResourceToast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'newResourceToast';
    toast.innerHTML = '✨ <strong>' + name + '</strong> was just added to the swipe deck!';
    toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1F2937;color:#fff;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,.25);animation:toastIn .3s ease;max-width:90vw;text-align:center;';
    document.body.appendChild(toast);

    // inject keyframe if not present
    if (!document.getElementById('toastStyle')) {
        var style = document.createElement('style');
        style.id = 'toastStyle';
        style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
        document.head.appendChild(style);
    }

    setTimeout(function() {
        toast.style.opacity = '0'; toast.style.transition = 'opacity .3s';
        setTimeout(function() { toast.remove(); }, 350);
    }, 4000);
}
// ─── QUIZ ─────────────────────────────────────────────────────────
var quizAnswers = {};

var quizOpps = [
    { title: 'Food Bank Sorting Drive', org: 'Gwinnett County Food Bank', desc: 'Help sort donated food items for families in need. Great for groups and first-timers!', date: 'Feb 15, 2026', duration: '3 hours', loc: 'Lawrenceville, GA', tags: ['families', 'people', 'short', 'once'] },
    { title: 'Community Tree Planting', org: 'Gwinnett Parks & Recreation', desc: 'Plant native trees and beautify local parks. Tools and gloves provided!', date: 'Feb 22, 2026', duration: '3 hours', loc: 'Duluth, GA', tags: ['environment', 'outdoor', 'med', 'once'] },
    { title: 'After-School Tutoring', org: 'Gwinnett Public Library', desc: 'Tutor elementary students in reading and math. Super rewarding, we promise.', date: 'Every Tuesday', duration: '2 hours', loc: 'Suwanee, GA', tags: ['youth', 'skills', 'short', 'weekly'] },
    { title: 'Neighborhood Cleanup Day', org: 'Keep Gwinnett Beautiful', desc: 'Pick up litter and beautify public spaces together. Trash bags provided.', date: 'Mar 1, 2026', duration: '3 hours', loc: 'Lilburn, GA', tags: ['environment', 'outdoor', 'med', 'once'] },
    { title: 'Soup Kitchen Service', org: 'Gwinnett Hope Shelter', desc: 'Prepare and serve meals to those experiencing homelessness. Meaningful work.', date: 'Every Saturday', duration: '3 hours', loc: 'Duluth, GA', tags: ['families', 'people', 'med', 'weekly'] },
    { title: 'Senior Center Companion', org: 'Gwinnett Senior Services', desc: 'Spend time with elderly residents — conversation, games, and activities.', date: 'Every Wednesday', duration: '2 hours', loc: 'Multiple Locations', tags: ['seniors', 'people', 'short', 'weekly'] },
    { title: 'Habitat Build Day', org: 'Habitat for Humanity Gwinnett', desc: 'Help build affordable homes for low-income families. No experience needed.', date: 'Weekend builds', duration: '6 hours', loc: 'Norcross, GA', tags: ['families', 'outdoor', 'long', 'monthly'] },
    { title: 'Park Maintenance Crew', org: 'Gwinnett Parks & Recreation', desc: 'Help maintain trails, benches, and green spaces across the county.', date: 'Monthly', duration: '4 hours', loc: 'Multiple Parks', tags: ['environment', 'outdoor', 'med', 'monthly'] },
];

function quizScore(opp) {
    var s = 0;
    Object.values(quizAnswers).forEach(function(v) { if (opp.tags.includes(v)) s++; });
    return s;
}

function getQuizMatches() {
    return quizOpps.slice().sort(function(a, b) {
        return quizScore(b) - quizScore(a) || Math.random() - .5;
    }).slice(0, 3);
}

function showQuizResults() {
    var matches = getQuizMatches();
    var list = document.getElementById('quizResultsList');
    if (!list) return;
    list.innerHTML = matches.map(function(m) {
        return '<div class="quiz-res-card">'
            + '<span class="quiz-res-tag">' + m.org + '</span>'
            + '<div class="quiz-res-name">' + m.title + '</div>'
            + '<div class="quiz-res-desc">' + m.desc + '</div>'
            + '<div class="quiz-res-meta">'
            + '<span>📅 ' + m.date + '</span>'
            + '<span>⏰ ' + m.duration + '</span>'
            + '<span>📍 ' + m.loc + '</span>'
            + '</div></div>';
    }).join('');
}

// Wire up each step
for (var qi = 0; qi < 4; qi++) {
    (function(stepIndex) {
        var step = document.getElementById('qstep-' + stepIndex);
        if (!step) return;
        var opts = step.querySelectorAll('.quiz-opt');
        var nextBtn = document.getElementById('qnext-' + stepIndex);

        opts.forEach(function(opt) {
            opt.addEventListener('click', function() {
                opts.forEach(function(o) { o.classList.remove('selected'); });
                opt.classList.add('selected');
                quizAnswers['q' + stepIndex] = opt.getAttribute('data-val');
                if (nextBtn) nextBtn.disabled = false;
            });
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                step.classList.remove('active');
                var progress = ((stepIndex + 1) / 4) * 100;
                var progBar = document.getElementById('quizProg');
                if (progBar) progBar.style.width = progress + '%';

                if (stepIndex < 3) {
                    var nextStep = document.getElementById('qstep-' + (stepIndex + 1));
                    if (nextStep) nextStep.classList.add('active');
                } else {
                    var results = document.getElementById('qstep-results');
                    if (results) results.classList.add('active');
                    showQuizResults();
                }
            });
        }
    })(qi);
}

// Restart
var quizRestartBtn = document.getElementById('quizRestart');
if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', function() {
        quizAnswers = {};
        document.querySelectorAll('.quiz-step').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.quiz-opt').forEach(function(o) { o.classList.remove('selected'); });
        for (var i = 0; i < 4; i++) {
            var btn = document.getElementById('qnext-' + i);
            if (btn) btn.disabled = true;
        }
        var progBar = document.getElementById('quizProg');
        if (progBar) progBar.style.width = '0%';
        var first = document.getElementById('qstep-0');
        if (first) first.classList.add('active');
    });
}

// ─── SUBMIT FORM → FIREBASE ───────────────────────────────────────
var submitForm = document.getElementById('submitForm');
if (submitForm) {
    submitForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        var inputs = submitForm.querySelectorAll('input, select, textarea');
        var name = inputs[0].value.trim();
        var cat = inputs[1].value;
        var web = inputs[2].value.trim();
        var phone = inputs[3].value.trim();
        var loc = inputs[4].value.trim();
        var desc = inputs[5].value.trim();

        if (!name || !cat || !loc || !desc) return;

        var submitBtn = submitForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            await addDoc(collection(db, 'resources'), {
                name: name,
                cat: cat,
                web: web,
                phone: phone,
                loc: loc,
                desc: desc,
                createdAt: new Date(),
            });

            submitForm.style.display = 'none';
            document.getElementById('submitSuccess').style.display = 'block';
        } catch (err) {
            console.error('Firebase write failed:', err);
            alert('Something went wrong. Please try again.');
            submitBtn.textContent = 'Submit Resource →';
            submitBtn.disabled = false;
        }
    });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Replace button with inline success
        var btn = contactForm.querySelector('.submit-btn');
        btn.textContent = '✅ Sent! We\'ll be in touch.';
        btn.style.background = '#10B981';
        btn.disabled = true;
        setTimeout(function() {
            contactForm.reset();
            btn.textContent = 'Send It →';
            btn.style.background = '';
            btn.disabled = false;
        }, 3500);
    });
}
