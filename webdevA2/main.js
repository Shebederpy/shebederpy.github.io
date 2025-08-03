// main.js - JavaScript for Crocodile Education App

// === PAGE MANAGEMENT SYSTEM ===

// Get references to all navigation buttons using querySelector
const introBtnNav = document.querySelector("#intro-btn");
const habitatBtnNav = document.querySelector("#habitat-btn");
const dietBtnNav = document.querySelector("#diet-btn");
const gameBtnNav = document.querySelector("#game-btn");

// Create audio objects for navigation sounds
const clickAudio = new Audio("sounds/Click.mp3");
const exploreAudio = new Audio("sounds/LetsGo.mp3"); // Special sound for explore button

// Get all page elements using querySelectorAll (returns NodeList)
const allPages = document.querySelectorAll(".page");

// Get the special explore button on intro page
const exploreBtn = document.querySelector("#explore-btn");

// Function to hide all pages by changing display and removing active class
function hideAllPages() {
    // Loop through all pages using for...of
    for(let onePage of allPages) {
        onePage.style.display = "none"; // Hide page using CSS display property
        onePage.classList.remove("active-page"); // Remove active CSS class
    }
}

// Function to show selected page by ID and update navigation
function showPage(pageId) {
    hideAllPages(); // Hide all pages first
    
    // Select and show the target page using string concatenation
    let selectedPage = document.querySelector("#" + pageId);
    selectedPage.style.display = "block"; // Make page visible
    selectedPage.classList.add("active-page"); // Add active CSS class for animations
    
    // Update which navigation button appears active
    updateNavButtons(pageId);
}

// Function to update navigation button states using conditional logic
function updateNavButtons(activePageId) {
    // Remove active class from all navigation buttons using forEach
    document.querySelectorAll(".nav-btn").forEach(function(btn) {
        btn.classList.remove("active"); // Remove active styling from all buttons
    });
    
    // Add active class to correct button using if/else conditions
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

// === NAVIGATION EVENT LISTENERS ===

// Add click event listeners to navigation buttons using addEventListener
introBtnNav.addEventListener("click", function() {
    playClickSound(); // Play navigation sound
    showPage("intro-page"); // Switch to intro page
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

// Special event listener for explore button with different sound
exploreBtn.addEventListener("click", function() {
    playExploreSound(); // Play special sound
    showPage("habitat-page"); // Go to habitat page
});

// === AUDIO FUNCTIONS ===

// Function to play regular navigation click sound
function playClickSound() {
    clickAudio.currentTime = 0; // Reset audio to beginning
    clickAudio.play(); // Play the audio file
    console.log("Playing navigation click sound"); // Debug message
}

// Function to play special explore sound
function playExploreSound() {
    exploreAudio.currentTime = 0; // Reset audio to beginning
    exploreAudio.play(); // Play the special sound
    console.log("Playing special explore sound - Let's Go!"); // Debug message
}

// === PAGE INITIALIZATION ===

// Initialize the app - hide all pages and show intro page on load
hideAllPages();
showPage("intro-page");

// === CROCODILE SOUNDS SYSTEM ===

// Variables for tracking sound experience using Set data structure
let soundsPlayed = new Set(); // Set automatically prevents duplicates
const totalSounds = 3; // Total number of available sounds

// Get DOM elements for sound interface using querySelector
const growlBtn = document.querySelector("#growl-btn");
const hissBtn = document.querySelector("#hiss-btn");
const snapBtn = document.querySelector("#snap-btn");

// Get elements for sound experience tracking
const soundCounter = document.querySelector("#sound-counter");
const progressFill = document.querySelector("#progress-fill");
const encourageText = document.querySelector("#encourage-text");

// Create audio objects for crocodile sounds
const growlAudio = new Audio("sounds/CrocGrowl.mp3");
const hissAudio = new Audio("sounds/CrocHiss.mp3");
const snapAudio = new Audio("sounds/CrocChomp.mp3");

// Wrapper functions for each sound type
function playGrowlSound() {
    playSound('growl', growlAudio, growlBtn); // Call main sound function
}

function playHissSound() {
    playSound('hiss', hissAudio, hissBtn);
}

function playSnapSound() {
    playSound('snap', snapAudio, snapBtn);
}

// Main sound playing function with visual feedback and tracking
function playSound(soundName, audioObject, buttonElement) {
    // Add sound to played set for tracking using Set.add()
    soundsPlayed.add(soundName);
    
    // Update button appearance using classList.add()
    buttonElement.classList.add('playing'); // CSS class triggers visual changes
    
    // Play the audio file
    audioObject.currentTime = 0; // Reset to start
    audioObject.play(); // Play audio
    console.log(`Playing ${soundName} sound`); // Template literal for dynamic message
    
    // Set up event handler for when sound ends using onended property
    audioObject.onended = function() {
        buttonElement.classList.remove('playing'); // Remove playing state
    };
    
    // Fallback timer using setTimeout in case onended doesn't fire
    setTimeout(function() {
        buttonElement.classList.remove('playing'); // Remove playing state after 3 seconds
    }, 3000);
    
    // Update the sound experience display immediately
    updateSoundExperience();
}

// Function to update sound experience UI based on progress
function updateSoundExperience() {
    const playedCount = soundsPlayed.size; // Get count from Set
    const percentage = (playedCount / totalSounds) * 100; // Calculate percentage
    
    // Update counter text using template literal
    soundCounter.innerText = `Sounds explored: ${playedCount}/${totalSounds}`;
    
    // Update progress bar width using CSS style property
    progressFill.style.width = percentage + '%';
    
    // Update encouragement text based on progress using conditional logic
    if (playedCount === 0) {
        encourageText.innerText = "Try listening to all three crocodile sounds!";
        encourageText.style.color = "#666"; // Gray color
    } else if (playedCount === 1) {
        encourageText.innerText = "Great start! Listen to the other sounds too!";
        encourageText.style.color = "#4a7c59"; // Green color
    } else if (playedCount === 2) {
        encourageText.innerText = "Almost there! One more sound to go!";
        encourageText.style.color = "#2d5016"; // Dark green
    } else if (playedCount === 3) {
        encourageText.innerText = "🎉 Awesome! You've heard all crocodile sounds!";
        encourageText.style.color = "#28a745"; // Success green
        encourageText.style.fontWeight = "bold"; // Make text bold
        
        // Add celebration animation using setTimeout for delay
        setTimeout(function() {
            encourageText.style.animation = "pulse 0.5s ease-in-out 3"; // CSS animation
        }, 100);
    }
    
    // Debug logging using template literal
    console.log(`Sound experience updated: ${playedCount}/${totalSounds} sounds played`);
}

// === SOUND EVENT LISTENERS ===

// Add event listeners to sound buttons with conditional checks
if (growlBtn) growlBtn.addEventListener("click", playGrowlSound);
if (hissBtn) hissBtn.addEventListener("click", playHissSound);
if (snapBtn) snapBtn.addEventListener("click", playSnapSound);

// Initialize sound experience display when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateSoundExperience(); // Set initial state
});

// === KEYBOARD SUPPORT ===

// Add keyboard event listener for sound shortcuts using keydown event
document.addEventListener('keydown', function(event) {
    // Don't interfere if user is focused on a button
    if (event.target.tagName === 'BUTTON') return;
    
    // Use switch statement to handle different key presses
    switch(event.key) {
        case '1':
            if (growlBtn) playGrowlSound(); // Play growl with key 1
            break;
        case '2':
            if (hissBtn) playHissSound(); // Play hiss with key 2
            break;
        case '3':
            if (snapBtn) playSnapSound(); // Play snap with key 3
            break;
    }
});

// === FORM HANDLING ===

// Get form element and add submit event listener
const feedbackForm = document.querySelector("#feedback-form");

feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    alert("Thanks for your feedback!"); // Show simple thank you message
});

// === INTERACTIVE CARDS (Event Delegation) ===

// Get content grid container for event delegation
const contentGrid = document.querySelector(".content-grid");

// Use event delegation - one listener on parent handles all card clicks
contentGrid.addEventListener("click", function(event) {
    // Find the closest info card using closest() method
    const clickedCard = event.target.closest(".info-card");
    
    if (clickedCard) {
        // Toggle clicked state using classList methods and conditional logic
        if (clickedCard.classList.contains("clicked")) {
            clickedCard.classList.remove("clicked"); // Remove if already clicked
        } else {
            // Remove clicked from all cards first using forEach
            document.querySelectorAll(".info-card").forEach(function(card) {
                card.classList.remove("clicked");
            });
            // Add clicked to this card
            clickedCard.classList.add("clicked");
        }
    }
});

// === IMAGE OVERLAY SYSTEM ===

// Get image container elements using querySelector
const imageContainer = document.querySelector("#intro-image-container");
const habitatContainer = document.querySelector("#habitat-image-container");
const dietContainer = document.querySelector("#diet-image-container");

// Variables for overlay timers using let (can be reassigned)
let overlayTimer;
let habitatOverlayTimer;
let dietOverlayTimer;

// Simple toggle function for intro image overlay
function toggleImageOverlay() {
    const container = document.querySelector("#intro-image-container");
    
    if (container.classList.contains("zoomed")) {
        clearTimeout(overlayTimer); // ← Uses overlayTimer
        container.classList.remove("zoomed");
    } else {
        container.classList.add("zoomed");
        overlayTimer = setTimeout(function() { // ← Sets overlayTimer
            container.classList.remove("zoomed");
        }, 5000);
    }
}

// Add click event listener to entire image container
imageContainer.addEventListener("click", function() {
    toggleImageOverlay(); // Call toggle function
});

// Habitat page overlay with auto-close timer
function toggleHabitatOverlay() {
    if (habitatContainer.classList.contains("zoomed")) {
        // Closing - clear the timeout using clearTimeout()
        clearTimeout(habitatOverlayTimer);
        habitatContainer.classList.remove("zoomed");
        console.log("Habitat overlay closed - timer cleared");
    } else {
        // Opening - start auto-close timer using setTimeout()
        habitatContainer.classList.add("zoomed");
        console.log("Habitat overlay opened - starting timer");
        
        // Set timeout to auto-close after 5 seconds
        habitatOverlayTimer = setTimeout(function() {
            habitatContainer.classList.remove("zoomed");
            console.log("Auto-closed habitat overlay after 5 seconds");
        }, 5000); // 5000 milliseconds = 5 seconds
    }
}

// Diet page overlay with auto-close timer (same pattern)
function toggleDietOverlay() {
    if (dietContainer.classList.contains("zoomed")) {
        clearTimeout(dietOverlayTimer); // Clear timer
        dietContainer.classList.remove("zoomed");
        console.log("Diet overlay closed - timer cleared");
    } else {
        dietContainer.classList.add("zoomed");
        console.log("Diet overlay opened - starting timer");
        
        // Auto-close timer
        dietOverlayTimer = setTimeout(function() {
            dietContainer.classList.remove("zoomed");
            console.log("Auto-closed diet overlay after 5 seconds");
        }, 5000);
    }
}

// Add event listeners with conditional checks for existence
if (habitatContainer) {
    habitatContainer.addEventListener("click", function() {
        toggleHabitatOverlay();
    });
}

if (dietContainer) {
    dietContainer.addEventListener("click", function() {
        toggleDietOverlay();
    });
}

// === HAMBURGER MENU SYSTEM ===

// Get hamburger menu elements using querySelector
const hamIcon = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector(".nav-buttons");

// Toggle menu function using classList.toggle() and conditional logic
function toggleMenus() {
    // Toggle the menuShow class using toggle() method
    menuItemsList.classList.toggle("menuShow");
    
    // Change button text based on menu state using innerHTML property
    if (menuItemsList.classList.contains("menuShow")) {
        hamIcon.innerHTML = "✕ Close Menu"; // Show close text
    } else {
        hamIcon.innerHTML = "☰ Menu"; // Show open text
    }
}

// Add click event listener to hamburger icon
hamIcon.addEventListener("click", toggleMenus);

// Function to close menu after navigation (better UX on mobile)
function closeMenuOnNavigate() {
    // Only close on mobile screens using window.innerWidth
    if (window.innerWidth <= 800) {
        menuItemsList.classList.remove("menuShow"); // Hide menu
        hamIcon.innerHTML = "☰ Menu"; // Reset button text
    }
}

// Update navigation event listeners to include menu closing
// Note: These duplicate the earlier listeners but add menu closing functionality
introBtnNav.addEventListener("click", function() {
    playClickSound();
    showPage("intro-page");
    closeMenuOnNavigate(); // Close mobile menu after navigation
});

habitatBtnNav.addEventListener("click", function() {
    playClickSound();
    showPage("habitat-page");
    closeMenuOnNavigate();
});

dietBtnNav.addEventListener("click", function() {
    playClickSound();
    showPage("diet-page");
    closeMenuOnNavigate();
});

gameBtnNav.addEventListener("click", function() {
    playClickSound();
    showPage("game-page");
    closeMenuOnNavigate();
});

// === CROCODILE HUNTER GAME ===

// Game state variables using let (mutable) and const (immutable)
let huntActive = false; // Boolean to track if game is running
let fishCaught = 0; // Counter for successful catches
let fishMissed = 0; // Counter for escaped fish
let gameTimeLeft = 30; // Countdown timer in seconds
let fishCount = 0; // Total fish spawned counter
const maxFishCaught = 5; // Win condition (constant)
let gameTimer; // Will store setInterval ID
let spawnTimer; // Will store setInterval ID for fish spawning

// Get game DOM elements using querySelector
const startHuntBtn = document.querySelector("#start-hunt");
const resetHuntBtn = document.querySelector("#reset-hunt");
const huntingGround = document.querySelector("#hunting-ground");
const gameInstruction = document.querySelector("#game-instruction");
const fishCaughtDisplay = document.querySelector("#fish-caught");
const fishMissedDisplay = document.querySelector("#fish-missed");
const gameTimerDisplay = document.querySelector("#game-timer");
const huntResults = document.querySelector("#hunt-results");
const instructionsOverlay = document.querySelector(".game-instructions-overlay");

// Game results display elements
const finalCaught = document.querySelector("#final-caught");
const finalMissed = document.querySelector("#final-missed");
const huntingRating = document.querySelector("#hunting-rating");

// Random number generator function using Math.random() and Math.round()
function GetRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

// Function to start the hunting game
function startHunt() {
    // Reset all game variables to initial state
    huntActive = true;
    fishCaught = 0;
    fishMissed = 0;
    gameTimeLeft = 30;
    fishCount = 0;
    
    // Update UI elements using style.display property
    startHuntBtn.style.display = "none"; // Hide start button
    resetHuntBtn.style.display = "none"; // Hide reset button
    huntResults.style.display = "none"; // Hide results
    instructionsOverlay.style.display = "none"; // Hide instructions
    
    // Update game displays
    updateGameDisplay();
    gameInstruction.innerText = "🐊 Hunt in progress! Click the moving fish!";
    
    // Start game timer using setInterval() - runs every 1000ms (1 second)
    gameTimer = setInterval(updateGameTimer, 1000);
    
    // Start fish spawning using setInterval() - spawns every 2000ms (2 seconds)
    spawnTimer = setInterval(spawnFish, 2000);
    
    // Spawn first fish immediately
    spawnFish();
}

// Function to update game timer countdown
function updateGameTimer() {
    gameTimeLeft--; // Decrement timer
    gameTimerDisplay.innerText = "Time: " + gameTimeLeft + "s"; // Update display
    
    // Check end conditions using logical OR operator
    if (gameTimeLeft <= 0 || fishCaught >= maxFishCaught) {
        endHunt(); // End game if time up or won
    }
}

// Function to create and spawn moving fish
function spawnFish() {
    if (!huntActive) return; // Exit if game not active
    
    fishCount++; // Increment fish counter
    
    // Create new fish element using createElement()
    const fish = document.createElement('div');
    fish.className = 'fish'; // Set CSS class
    fish.innerHTML = '🐟'; // Set emoji content
    
    // Determine starting side using random number
    const startingSide = GetRandom(0, 1);
    let fishX, fishY, velX, velY; // Variables for position and velocity
    
    // Set starting position and velocity based on side using conditional logic
    if (startingSide === 0) {
        // Start from left side
        fishX = -50; // Start off-screen left
        fishY = GetRandom(20, 250); // Random Y position
        velX = GetRandom(2, 5); // Positive X velocity (move right)
        velY = GetRandom(-1, 1); // Random Y velocity
    } else {
        // Start from right side
        fishX = huntingGround.offsetWidth + 10; // Start off-screen right
        fishY = GetRandom(20, 250);
        velX = GetRandom(-5, -2); // Negative X velocity (move left)
        velY = GetRandom(-1, 1);
    }
    
    // Set initial CSS position using style properties
    fish.style.left = fishX + "px";
    fish.style.top = fishY + "px";
    fish.style.position = "absolute"; // Required for free positioning
    
    // Add click event listener to fish using addEventListener
    fish.addEventListener("click", function() {
        catchFish(fish); // Call catch function when clicked
    });
    
    // Add fish to hunting ground using appendChild()
    huntingGround.appendChild(fish);
    
    // Store movement data as custom properties on the element
    fish.fishX = fishX; // Custom property for X position
    fish.fishY = fishY; // Custom property for Y position
    fish.velX = velX; // Custom property for X velocity
    fish.velY = velY; // Custom property for Y velocity
    
    // Start moving this fish using setInterval for animation
    const moveInterval = setInterval(function() {
        moveFish(fish, moveInterval); // Call move function repeatedly
    }, 50); // 50ms intervals for smooth movement
}

// Function to move fish across screen using custom properties
function moveFish(fishElement, moveInterval) {
    if (!huntActive) {
        clearInterval(moveInterval); // Stop movement if game ended
        return;
    }
    
    // Update position using stored velocity values
    fishElement.fishX += fishElement.velX; // Add velocity to position
    fishElement.fishY += fishElement.velY;
    
    // Update CSS position using style properties
    fishElement.style.left = fishElement.fishX + "px";
    fishElement.style.top = fishElement.fishY + "px";
    
    // Check if fish escaped off screen using boundary conditions
    const groundWidth = huntingGround.offsetWidth;
    if (fishElement.fishX < -60 || fishElement.fishX > groundWidth + 60) {
        // Fish escaped - update counters and remove
        fishMissed++; // Increment missed counter
        updateGameDisplay(); // Update UI
        
        fishElement.remove(); // Remove from DOM using remove()
        clearInterval(moveInterval); // Stop movement timer
        
        console.log("Fish escaped! Missed: " + fishMissed);
    }
    
    // Boundary bouncing for Y axis using conditional logic
    if (fishElement.fishY <= 10 || fishElement.fishY >= 260) {
        fishElement.velY = -fishElement.velY; // Reverse Y velocity
    }
}

// Function to handle fish catching
function catchFish(fishElement) {
    if (!huntActive) return; // Exit if game not active
    
    // Add caught animation using classList.add()
    fishElement.classList.add('caught'); // CSS animation will trigger
    
    // Update score
    fishCaught++; // Increment caught counter
    updateGameDisplay(); // Update UI display
    
    // Remove fish after animation using setTimeout()
    setTimeout(function() {
        fishElement.remove(); // Remove from DOM after delay
    }, 500); // 500ms delay for animation
    
    console.log("Fish caught! Total: " + fishCaught + "/" + maxFishCaught);
    
    // Check win condition
    if (fishCaught >= maxFishCaught) {
        setTimeout(function() {
            endHunt(); // End game after brief delay
        }, 500);
    }
}

// Function to update game display counters
function updateGameDisplay() {
    // Update display text using innerText property
    fishCaughtDisplay.innerText = "Fish Caught: " + fishCaught + "/" + maxFishCaught;
    fishMissedDisplay.innerText = "Fish Missed: " + fishMissed;
}

// Function to end hunt and show results
function endHunt() {
    huntActive = false; // Set game as inactive
    
    // Clear all timers using clearInterval()
    clearInterval(gameTimer); // Stop countdown timer
    clearInterval(spawnTimer); // Stop fish spawning
    
    // Remove all remaining fish using querySelectorAll and loop
    const allFish = document.querySelectorAll('.fish');
    for (let i = 0; i < allFish.length; i++) {
        allFish[i].remove(); // Remove each fish from DOM
    }
    
    // Calculate rating based on performance using conditional logic
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
    
    // Update results display using innerText
    finalCaught.innerText = "Fish Caught: " + fishCaught + "/" + maxFishCaught;
    finalMissed.innerText = "Fish Missed: " + fishMissed;
    huntingRating.innerText = rating;
    
    // Show results and reset button using style.display
    huntResults.style.display = "block";
    resetHuntBtn.style.display = "inline-block";
    
    // Update instruction text
    gameInstruction.innerText = "🎯 Hunt Complete! Check your results below.";
}

// Function to reset game to initial state
function resetHunt() {
    // Clear any remaining timers
    clearInterval(gameTimer);
    clearInterval(spawnTimer);
    
    // Remove all fish using querySelectorAll and loop
    const allFish = document.querySelectorAll('.fish');
    for (let i = 0; i < allFish.length; i++) {
        allFish[i].remove();
    }
    
    // Reset all variables to initial values
    huntActive = false;
    fishCaught = 0;
    fishMissed = 0;
    gameTimeLeft = 30;
    fishCount = 0;
    
    // Reset UI elements using style.display
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

// === GAME EVENT LISTENERS ===

// Add event listeners to game buttons with conditional checks
if (startHuntBtn) startHuntBtn.addEventListener("click", startHunt);
if (resetHuntBtn) resetHuntBtn.addEventListener("click", resetHunt);

// Initialize game display on page load
updateGameDisplay();

// === FULLSCREEN FUNCTIONALITY ===

// Get fullscreen buttons using querySelector
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");

// Add event listeners for fullscreen buttons
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

// Function to enter fullscreen mode with cross-browser support
function enterFullscreen() {
    // Check for different browser implementations using conditional logic
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen(); // Standard
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen(); // Firefox
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen(); // Internet Explorer/Edge
    }
}

// Function to exit fullscreen mode with cross-browser support
function exitFullscreen() {
    // Check for different browser implementations
    if (document.exitFullscreen) {
        document.exitFullscreen(); // Standard
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // Internet Explorer/Edge
    }
}