// main.js - Clean JavaScript for Crocodile Education App



// Target all navigation buttons
const introBtnNav = document.querySelector("#intro-btn");
const habitatBtnNav = document.querySelector("#habitat-btn");
const dietBtnNav = document.querySelector("#diet-btn");
const gameBtnNav = document.querySelector("#game-btn");

const clickAudio = new Audio("sounds/Click.mp3");
const exploreAudio = new Audio("sounds/LetsGo.mp3"); // Special sound for explores button


// Target all pages
const allPages = document.querySelectorAll(".page");

// Target the explore button on intro page
const exploreBtn = document.querySelector("#explore-btn");

// Function to hide all pages
function hideAllPages() {
    for(let onePage of allPages) {
        onePage.style.display = "none";
        onePage.classList.remove("active-page");
    }
}

// Function to show selected page
function showPage(pageId) {
    hideAllPages(); // Hide everything first
    
    // Show the selected page
    let selectedPage = document.querySelector("#" + pageId);
    selectedPage.style.display = "block";
    selectedPage.classList.add("active-page");
    
    // Update navigation button styles
    updateNavButtons(pageId);
}

// Function to update which navigation button looks "active"
function updateNavButtons(activePageId) {
    // Remove active class from all nav buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    // Add active class to correct button
    if(activePageId === "intro-page") {
        introBtnNav.classList.add("active");
    } else if(activePageId === "habitat-page") {
        habitatBtnNav.classList.add("active");
    } else if(activePageId === "diet-page") {
        dietBtnNav.classList.add("active");
    } else if(activePageId === "game-page") {
        gameBtnNav.classList.add("active");
    }
}

// Event listeners for navigation WITH regular click sounds
introBtnNav.addEventListener("click", function() {
    playClickSound(); 
    showPage("intro-page");
});

habitatBtnNav.addEventListener("click", function() {
    playClickSound(); 
    showPage("habitat-page");
});

dietBtnNav.addEventListener("click", function() {
    playClickSound(); 
    showPage("diet-page");
});

gameBtnNav.addEventListener("click", function() {
    playClickSound();
    showPage("game-page");
});

// Event listener for the SPECIAL "Start Exploring" button WITH unique sound
exploreBtn.addEventListener("click", function() {
    playExploreSound(); 
    showPage("habitat-page");
});

// Function to play regular navigation click sound
function playClickSound() {
    clickAudio.currentTime = 0; // Reset to start
    clickAudio.play().then(() => {
        console.log("Playing navigation click sound");
    }).catch(error => {
        console.log("Could not play click sound:", error);
    });
}

// Function to play special explore sound
function playExploreSound() {
    exploreAudio.currentTime = 0; // Reset to start
    exploreAudio.play().then(() => {
        console.log("Playing special explore sound - Let's Go!");
    }).catch(error => {
        console.log("Could not play explore sound:", error);
    });
}

// Initialize - hide all pages except intro on page load
hideAllPages();
showPage("intro-page");

// ===== ENHANCED CROCODILE SOUNDS SECTION =====
// Variables for the new sound experience
let soundsPlayed = new Set(); // Track which sounds have been played
const totalSounds = 3;

// Get the enhanced sound elements
const growlBtn = document.querySelector("#growl-btn");
const hissBtn = document.querySelector("#hiss-btn");
const snapBtn = document.querySelector("#snap-btn");

const soundCounter = document.querySelector("#sound-counter");
const progressFill = document.querySelector("#progress-fill");
const encourageText = document.querySelector("#encourage-text");

// Audio objects (keep your existing audio files)
const growlAudio = new Audio("sounds/CrocGrowl.mp3");
const hissAudio = new Audio("sounds/CrocHiss.mp3");
const snapAudio = new Audio("sounds/CrocChomp.mp3");

// Enhanced sound playing functions
function playGrowlSound() {
    playSound('growl', growlAudio, growlBtn);
}

function playHissSound() {
    playSound('hiss', hissAudio, hissBtn);
}

function playSnapSound() {
    playSound('snap', snapAudio, snapBtn);
}

// Main sound playing function with enhanced features
function playSound(soundName, audioObject, buttonElement) {
    // Add to played sounds set
    soundsPlayed.add(soundName);
    
    // Update button appearance
    buttonElement.classList.add('playing');
    
    // Play the audio
    audioObject.currentTime = 0; // Reset to start
    audioObject.play().then(() => {
        console.log(`Playing ${soundName} sound`);
    }).catch(error => {
        console.log(`Could not play ${soundName} sound:`, error);
    });
    
    // Handle when sound ends
    audioObject.onended = function() {
        buttonElement.classList.remove('playing');
        // Don't add 'played' class - just return to original state
    };
    
    // Remove playing class after 3 seconds (fallback)
    setTimeout(() => {
        buttonElement.classList.remove('playing');
        // Don't add 'played' class - just return to original state
    }, 3000);
    
    // Update experience immediately
    updateSoundExperience();
}

// Update the sound experience display
function updateSoundExperience() {
    const playedCount = soundsPlayed.size;
    const percentage = (playedCount / totalSounds) * 100;
    
    // Update counter text
    soundCounter.innerText = `Sounds explored: ${playedCount}/${totalSounds}`;
    
    // Update progress bar
    progressFill.style.width = percentage + '%';
    
    // Update encourage text based on progress
    if (playedCount === 0) {
        encourageText.innerText = "Try listening to all three crocodile sounds!";
        encourageText.style.color = "#666";
    } else if (playedCount === 1) {
        encourageText.innerText = "Great start! Listen to the other sounds too!";
        encourageText.style.color = "#4a7c59";
    } else if (playedCount === 2) {
        encourageText.innerText = "Almost there! One more sound to go!";
        encourageText.style.color = "#2d5016";
    } else if (playedCount === 3) {
        encourageText.innerText = "🎉 Awesome! You've heard all crocodile sounds!";
        encourageText.style.color = "#28a745";
        encourageText.style.fontWeight = "bold";
        
        // Add a little celebration effect
        setTimeout(() => {
            encourageText.style.animation = "pulse 0.5s ease-in-out 3";
        }, 100);
    }
    
    // Log for debugging
    console.log(`Sound experience updated: ${playedCount}/${totalSounds} sounds played`);
}



// Add event listeners for the enhanced sound buttons
if (growlBtn) growlBtn.addEventListener("click", playGrowlSound);
if (hissBtn) hissBtn.addEventListener("click", playHissSound);
if (snapBtn) snapBtn.addEventListener("click", playSnapSound);

// Initialize the sound experience display
document.addEventListener('DOMContentLoaded', function() {
    updateSoundExperience();
});

// Optional: Add keyboard support for sound buttons
document.addEventListener('keydown', function(event) {
    if (event.target.tagName === 'BUTTON') return; // Don't interfere with button focus
    
    switch(event.key) {
        case '1':
            if (growlBtn) playGrowlSound();
            break;
        case '2':
            if (hissBtn) playHissSound();
            break;
        case '3':
            if (snapBtn) playSnapSound();
            break;
        
    }
});

// ===== FORM HANDLING =====
const feedbackForm = document.querySelector("#feedback-form");

feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thanks for your feedback!");
});

// ===== INTERACTIVE CARDS (Event Delegation) =====
const contentGrid = document.querySelector(".content-grid");

contentGrid.addEventListener("click", function(event) {
    const clickedCard = event.target.closest(".info-card");
    
    if (clickedCard) {
        // Simple effect - just add/remove a "clicked" class
        if (clickedCard.classList.contains("clicked")) {
            clickedCard.classList.remove("clicked");
        } else {
            // Remove clicked from all cards
            document.querySelectorAll(".info-card").forEach(card => {
                card.classList.remove("clicked");
            });
            // Add clicked to this card
            clickedCard.classList.add("clicked");
        }
    }
});

// === SUPER SIMPLE IMAGE OVERLAY - Fresh Approach ===
// Get the image and container
const crocImage = document.querySelector("#intro-main-image");
const imageContainer = document.querySelector("#intro-image-container");
// Get the habitat page image and container
const habitatImage = document.querySelector("#habitat-main-image");
const habitatContainer = document.querySelector("#habitat-image-container");

// Get the diet page image and container  
const dietImage = document.querySelector("#diet-main-image");
const dietContainer = document.querySelector("#diet-image-container");

// Variables for overlay timers (like lecture pattern)
let overlayTimer;
let habitatOverlayTimer;
let dietOverlayTimer;

// Simple toggle function (like your toggleCard functions)
function toggleImageOverlay() {
    if (imageContainer.classList.contains("zoomed")) {
        // If open, close it
        imageContainer.classList.remove("zoomed");
        console.log("Overlay closed");
    } else {
        // If closed, open it
        imageContainer.classList.add("zoomed");
        console.log("Overlay opened");
    }
}

// ONE event listener on the entire container (not just image)
imageContainer.addEventListener("click", function() {
    toggleImageOverlay();
});

// Habitat page overlay toggle function (same pattern as intro)
function toggleHabitatOverlay() {
    if (habitatContainer.classList.contains("zoomed")) {
        // Closing - clear timer (like lecture clearTimeout example)
        clearTimeout(habitatOverlayTimer);
        habitatContainer.classList.remove("zoomed");
        console.log("Habitat overlay closed - timer cleared");
    } else {
        // Opening - start timer (exact lecture pattern)
        habitatContainer.classList.add("zoomed");
        console.log("Habitat overlay opened - starting timer");
        
        // setTimeout with anonymous function (like lecture Example 12a)
        habitatOverlayTimer = setTimeout(function() {
            habitatContainer.classList.remove("zoomed");
            console.log("Auto-closed habitat overlay after 5 seconds");
        }, 5000); // 5 seconds
    }
}

// Diet page overlay toggle function (same pattern as intro)
function toggleDietOverlay() {
    if (dietContainer.classList.contains("zoomed")) {
        // Closing - clear timer (like lecture clearTimeout example)
        clearTimeout(dietOverlayTimer);
        dietContainer.classList.remove("zoomed");
        console.log("Diet overlay closed - timer cleared");
    } else {
        // Opening - start timer (exact lecture pattern)
        dietContainer.classList.add("zoomed");
        console.log("Diet overlay opened - starting timer");
        
        // setTimeout with anonymous function (like lecture Example 12a)
        dietOverlayTimer = setTimeout(function() {
            dietContainer.classList.remove("zoomed");
            console.log("Auto-closed diet overlay after 5 seconds");
        }, 5000); // 5 seconds
    }
}

// Event listeners for habitat page (like lecture pattern)
if (habitatContainer) {
    habitatContainer.addEventListener("click", function() {
        toggleHabitatOverlay();
    });
}

// Event listeners for diet page (like lecture pattern)
if (dietContainer) {
    dietContainer.addEventListener("click", function() {
        toggleDietOverlay();
    });
}


// === HAMBURGER MENU JAVASCRIPT (Exact Lecture Pattern) ===

// Get hamburger button and menu list (like lecture)
const hamIcon = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector(".nav-buttons");

// Toggle menu function (exact same as lecture toggleMenus)
function toggleMenus() {
    // Toggle menuShow class (like lecture)
    menuItemsList.classList.toggle("menuShow");
    
    // Change button text based on menu state (like lecture)
    if (menuItemsList.classList.contains("menuShow")) {
        hamIcon.innerHTML = "✕ Close Menu"; // Change to close
    } else {
        hamIcon.innerHTML = "☰ Menu"; // Change back to open
    }
}

// Add event listener to hamburger icon (like lecture)
hamIcon.addEventListener("click", toggleMenus);

// Close menu when navigation button is clicked (good UX)
function closeMenuOnNavigate() {
    if (window.innerWidth <= 800) { // Only on mobile
        menuItemsList.classList.remove("menuShow");
        hamIcon.innerHTML = "☰ Menu";
    }
}

// Updated hamburger menu navigation WITH click sounds
introBtnNav.addEventListener("click", function() {
    playClickSound(); // Regular click sound
    showPage("intro-page");
    closeMenuOnNavigate(); // Close menu after navigation
});

habitatBtnNav.addEventListener("click", function() {
    playClickSound(); // Regular click sound
    showPage("habitat-page");
    closeMenuOnNavigate();
});

dietBtnNav.addEventListener("click", function() {
    playClickSound(); // Regular click sound
    showPage("diet-page");
    closeMenuOnNavigate();
});

gameBtnNav.addEventListener("click", function() {
    playClickSound(); // Regular click sound
    showPage("game-page");
    closeMenuOnNavigate();
});

// Updated toggle function with setTimeout (like lecture Example 12a)
function toggleImageOverlay() {
    const container = document.querySelector("#intro-image-container");
    
    if (container.classList.contains("zoomed")) {
        // Closing - clear timer (like lecture clearTimeout example)
        clearTimeout(overlayTimer);
        container.classList.remove("zoomed");
        console.log("Overlay closed - timer cleared");
    } else {
        // Opening - start timer (exact lecture pattern)
        container.classList.add("zoomed");
        console.log("Overlay opened - starting timer");
        
        // setTimeout with anonymous function (like lecture Example 12a)
        overlayTimer = setTimeout(function() {
            container.classList.remove("zoomed");
            console.log("Auto-closed overlay after 10 seconds");
        }, 5000); // 10 seconds (10000ms)
    }
}


// === CROCODILE HUNTER GAME (Fixed Version) ===
// Replace the entire hunter game section in your main.js with this fixed version

// Game variables
let huntActive = false;
let fishCaught = 0;
let fishMissed = 0;
let gameTimeLeft = 30;
let fishCount = 0;
const maxFishCaught = 5;
let gameTimer;
let spawnTimer;

// Get game elements
const startHuntBtn = document.querySelector("#start-hunt");
const resetHuntBtn = document.querySelector("#reset-hunt");
const huntingGround = document.querySelector("#hunting-ground");
const gameInstruction = document.querySelector("#game-instruction");
const fishCaughtDisplay = document.querySelector("#fish-caught");
const fishMissedDisplay = document.querySelector("#fish-missed");
const gameTimerDisplay = document.querySelector("#game-timer");
const huntResults = document.querySelector("#hunt-results");
const instructionsOverlay = document.querySelector(".game-instructions-overlay");

// Results elements
const finalCaught = document.querySelector("#final-caught");
const finalMissed = document.querySelector("#final-missed");
const huntingRating = document.querySelector("#hunting-rating");

// Random number function (exact lecture pattern)
function GetRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

// Start Hunt Game
function startHunt() {
    // Reset variables
    huntActive = true;
    fishCaught = 0;
    fishMissed = 0;
    gameTimeLeft = 30;
    fishCount = 0;
    
    // Update UI
    startHuntBtn.style.display = "none";
    resetHuntBtn.style.display = "none";
    huntResults.style.display = "none";
    instructionsOverlay.style.display = "none";
    
    // Update displays
    updateGameDisplay();
    gameInstruction.innerText = "🐊 Hunt in progress! Click the moving fish!";
    
    // Start game timer (countdown)
    gameTimer = setInterval(updateGameTimer, 1000);
    
    // Start spawning fish
    spawnTimer = setInterval(spawnFish, 2000);
    
    // Spawn first fish immediately
    spawnFish();
}

// Update game timer
function updateGameTimer() {
    gameTimeLeft--;
    gameTimerDisplay.innerText = "Time: " + gameTimeLeft + "s";
    
    if (gameTimeLeft <= 0 || fishCaught >= maxFishCaught) {
        endHunt();
    }
}

// Spawn moving fish
function spawnFish() {
    if (!huntActive) return;
    
    fishCount++;
    
    // Create fish element
    //dynamically create a fish
    const fish = document.createElement('div');
    fish.className = 'fish';
    fish.innerHTML = '🐟';
    
    // Starting position
    const startingSide = GetRandom(0, 1);
    let fishX, fishY, velX, velY;
    
    if (startingSide === 0) {
        // Start from left
        fishX = -50;
        fishY = GetRandom(20, 250);
        velX = GetRandom(2, 5);
        velY = GetRandom(-1, 1);
    } else {
        // Start from right
        fishX = huntingGround.offsetWidth + 10;
        fishY = GetRandom(20, 250);
        velX = GetRandom(-5, -2);
        velY = GetRandom(-1, 1);
    }
    
    // Set initial position
    fish.style.left = fishX + "px";
    fish.style.top = fishY + "px";
    fish.style.position = "absolute";
    
    // Add click event
    fish.addEventListener("click", function() {
        catchFish(fish);
    });
    
    // Add to hunting ground
    huntingGround.appendChild(fish);
    
    // Store movement data on the element itself (simple approach)
    fish.fishX = fishX;
    fish.fishY = fishY;
    fish.velX = velX;
    fish.velY = velY;
    
    // Start moving this fish
    const moveInterval = setInterval(function() {
        moveFish(fish, moveInterval);
    }, 50);
}

// Move fish across screen (FIXED VERSION)
function moveFish(fishElement, moveInterval) {
    if (!huntActive) {
        clearInterval(moveInterval);
        return;
    }
    
    // Update position using stored values
    fishElement.fishX += fishElement.velX;
    fishElement.fishY += fishElement.velY;
    
    // Update CSS position
    fishElement.style.left = fishElement.fishX + "px";
    fishElement.style.top = fishElement.fishY + "px";
    
    // Check if fish escaped
    const groundWidth = huntingGround.offsetWidth;
    if (fishElement.fishX < -60 || fishElement.fishX > groundWidth + 60) {
        // Fish escaped!
        fishMissed++;
        updateGameDisplay();
        
        // Remove fish
        fishElement.remove();
        clearInterval(moveInterval);
        
        console.log("Fish escaped! Missed: " + fishMissed);
    }
    
    // Boundary bouncing for Y axis
    if (fishElement.fishY <= 10 || fishElement.fishY >= 260) {
        fishElement.velY = -fishElement.velY;
    }
}

// Catch fish function
function catchFish(fishElement) {
    if (!huntActive) return;
    
    // Add caught animation
    fishElement.classList.add('caught');
    
    // Update score
    fishCaught++;
    updateGameDisplay();
    
    // Remove element after animation
    setTimeout(function() {
        fishElement.remove();
    }, 500);
    
    console.log("Fish caught! Total: " + fishCaught + "/" + maxFishCaught);
    
    // Check win condition
    if (fishCaught >= maxFishCaught) {
        setTimeout(function() {
            endHunt();
        }, 500);
    }
}

// Update game display
function updateGameDisplay() {
    fishCaughtDisplay.innerText = "Fish Caught: " + fishCaught + "/" + maxFishCaught;
    fishMissedDisplay.innerText = "Fish Missed: " + fishMissed;
}

// End hunt and show results (FIXED VERSION)
function endHunt() {
    huntActive = false;
    
    // Clear all timers
    clearInterval(gameTimer);
    clearInterval(spawnTimer);
    
    // Remove all remaining fish (FIXED)
    const allFish = document.querySelectorAll('.fish');
    for (let i = 0; i < allFish.length; i++) {
        allFish[i].remove();
    }
    
    // Calculate results
    let rating = "";
    
    if (fishCaught >= 5) {
        rating = "🏆 Master Hunter! (Like a real crocodile!)";
    } else if (fishCaught >= 3) {
        rating = "🎯 Good Hunter! (Better than average)";
    } else if (fishCaught >= 1) {
        rating = "🔰 Learning Hunter (Keep practicing!)";
    } else {
        rating = "🐌 Patient Observer (Crocodiles wait too!)";
    }
    
    // Update results display
    finalCaught.innerText = "Fish Caught: " + fishCaught + "/" + maxFishCaught;
    finalMissed.innerText = "Fish Missed: " + fishMissed;
    huntingRating.innerText = rating;
    
    // Show results and reset button
    huntResults.style.display = "block";
    resetHuntBtn.style.display = "inline-block";
    
    // Update instruction
    gameInstruction.innerText = "🎯 Hunt Complete! Check your results below.";
}

// Reset hunt function
function resetHunt() {
    // Clear any remaining timers
    clearInterval(gameTimer);
    clearInterval(spawnTimer);
    
    // Remove all fish
    const allFish = document.querySelectorAll('.fish');
    for (let i = 0; i < allFish.length; i++) {
        allFish[i].remove();
    }
    
    // Reset variables
    huntActive = false;
    fishCaught = 0;
    fishMissed = 0;
    gameTimeLeft = 30;
    fishCount = 0;
    
    // Reset UI
    huntResults.style.display = "none";
    startHuntBtn.style.display = "inline-block";
    resetHuntBtn.style.display = "none";
    instructionsOverlay.style.display = "block";
    gameInstruction.innerText = "Click 'Start Hunt' to begin your crocodile hunting challenge!";
    
    // Reset displays
    updateGameDisplay();
    gameTimerDisplay.innerText = "Time: 30s";
    
    console.log("Hunt reset");
}

// Event listeners
if (startHuntBtn) startHuntBtn.addEventListener("click", startHunt);
if (resetHuntBtn) resetHuntBtn.addEventListener("click", resetHunt);

// Initialize display
updateGameDisplay();


// === DESKTOP FULL-SCREEN FUNCTIONALITY (Week 14 - Lecturer Code) ===

// Get full-screen buttons (exact lecturer pattern)
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");

// Add event listeners (exact lecturer pattern)
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

// Enter full-screen function (exact lecturer code with full browser support)
function enterFullscreen() { // must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// Exit full-screen function (exact lecturer code with full browser support)
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
