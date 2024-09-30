document.addEventListener("DOMContentLoaded", () => {
    // Brightness Slider
    const slider = document.getElementById('brightness-range');
    const percentage = document.querySelector('.brightness-percentage span');

    // Load the saved brightness value from localStorage
    const brightnessValue = localStorage.getItem('brightness-range') || 70;

    // Set the slider and percentage display based on saved value
    slider.value = brightnessValue;
    percentage.textContent = `${brightnessValue}%`;

    // Update the percentage display as the slider changes
    slider.oninput = function() {
        percentage.textContent = `${this.value}%`;
    };

    // Save the brightness value to localStorage when the slider changes
    slider.addEventListener('change', () => {
        localStorage.setItem('brightness-range', slider.value);
    });

    // Get references to all room sections (these return NodeLists)
    const bed = document.querySelectorAll('.bed');
    const living = document.querySelectorAll('.living');
    const kitch = document.querySelectorAll('.kitch');
    const bath = document.querySelectorAll('.bath');
    const room = document.querySelector('.room'); // Main room area where the background image changes
    const roomButtons = document.querySelectorAll('.room-item'); // All room buttons

    // Helper function to set display for all elements in a NodeList
    function setDisplay(nodeList, displayValue) {
        nodeList.forEach(node => {
            node.style.display = displayValue;
        });
    }

    // Function to save room state to localStorage
    function saveRoomState(roomName, backgroundImageUrl) {
        localStorage.setItem('activeRoom', roomName);  // Save active room name
        localStorage.setItem('roomBackground', backgroundImageUrl);  // Save room background image URL
    }

    // Load the saved room state from localStorage on page load
    function loadRoomState() {
        const activeRoom = localStorage.getItem('activeRoom');
        const roomBackground = localStorage.getItem('roomBackground');

        if (activeRoom && roomBackground) {
            // Change the background image
            room.style.backgroundImage = `url(${roomBackground})`;

            // Display the appropriate room navigation
            if (activeRoom === 'Bedroom') {
                setDisplay(bed, 'block');
                setDisplay(living, 'none');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'none');
            } else if (activeRoom === 'Kitchen') {
                setDisplay(bed, 'none');
                setDisplay(living, 'none');
                setDisplay(kitch, 'block');
                setDisplay(bath, 'none');
            } else if (activeRoom === 'Livingroom') {
                setDisplay(bed, 'none');
                setDisplay(living, 'block');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'none');
            } else if (activeRoom === 'Bathroom') {
                setDisplay(bed, 'none');
                setDisplay(living, 'none');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'block');
            }

            // Mark the corresponding button as active
            roomButtons.forEach(button => {
                if (button.classList.contains(activeRoom)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    }

    // Add event listeners to each room button
    roomButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove the 'active' class from all buttons
            roomButtons.forEach(btn => btn.classList.remove('active'));

            // Add the 'active' class to the clicked button
            this.classList.add('active');

            // Change the displayed room navigation and background image based on which button was clicked
            if (this.classList.contains('Bedroom')) {
                setDisplay(bed, 'block');
                setDisplay(living, 'none');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'none');

                // Change background image
                const backgroundImageUrl = 'https://assets.wfcdn.com/im/34877607/resize-h500-w750%5Ecompr-r85/1602/160268356/default_name.jpg';
                room.style.backgroundImage = `url(${backgroundImageUrl})`;

                // Save the state
                saveRoomState('Bedroom', backgroundImageUrl);

            } else if (this.classList.contains('Kitchen')) {
                setDisplay(bed, 'none');
                setDisplay(living, 'none');
                setDisplay(kitch, 'block');
                setDisplay(bath, 'none');

                // Change background image
                const backgroundImageUrl = 'https://castlekitchens.ca/wp-content/uploads/2021/03/custom-kitchen-renovation-project.jpg';
                room.style.backgroundImage = `url(${backgroundImageUrl})`;

                // Save the state
                saveRoomState('Kitchen', backgroundImageUrl);

            } else if (this.classList.contains('Livingroom')) {
                setDisplay(bed, 'none');
                setDisplay(living, 'block');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'none');

                // Change background image
                const backgroundImageUrl = 'https://media.architecturaldigest.com/photos/62f3c04c5489dd66d1d538b9/master/pass/_Hall_St_0256_v2.jpeg';
                room.style.backgroundImage = `url(${backgroundImageUrl})`;

                // Save the state
                saveRoomState('Livingroom', backgroundImageUrl);

            } else if (this.classList.contains('Bathroom')) {
                setDisplay(bed, 'none');
                setDisplay(living, 'none');
                setDisplay(kitch, 'none');
                setDisplay(bath, 'block');

                // Change background image
                const backgroundImageUrl = 'https://activa.ca/wp-content/uploads/1_Easy-Resize.com_-2.jpg';
                room.style.backgroundImage = `url(${backgroundImageUrl})`;

                // Save the state
                saveRoomState('Bathroom', backgroundImageUrl);
            }
        });
    });

    // Load the room state and slider state on page load
    loadRoomState();

    //slider for devices
    const slides = document.querySelectorAll('.slides'); // All sliders for different rooms
    const leftArrow = document.querySelector('.leftarrow'); // All left arrows
    const rightArrow = document.querySelector('.rightarrow'); // All right arrows
    let currentSlide = 0; // Track the current slide index
    const totalSlides = document.querySelectorAll('.slide').length; // Total number of slides

    const slideImages = {
        'living': [
            'Images/Led Bulb On.G03.watermarked.2k.png',  // Image for first slide (Smart Lamp)
            'Images/Air Purifier.G03.watermarked.2k.png'  // Image for second slide (Air Purifier)
        ],
        // You can add other room sliders with their corresponding images here
    };

    // Function to update the image based on the current slide
    function updateImage(sliderClass, currentSlide) {
        const imageElement = document.querySelector(`.${sliderClass}-image img`);
        if (imageElement && slideImages[sliderClass][currentSlide]) {
            imageElement.src = slideImages[sliderClass][currentSlide]; // Change the image source
        }
    }

    // Function to update the slider position and image based on the current slide index
    function updateSlide(slider, currentSlide, totalSlides, sliderClass) {
        slider.style.marginLeft = `-${currentSlide * 100}%`; // Update the slider position
        updateImage(sliderClass, currentSlide); // Update the image based on the current slide
    }

    // Function to handle the navigation of slides
    function addSliderNavigation(slider, leftArrow, rightArrow, totalSlides, sliderClass) {
        let currentSlide = 0;

        // Left arrow navigation
        leftArrow.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--; // Go to previous slide
            } else {
                currentSlide = totalSlides - 1; // Loop to the last slide if at the start
            }
            updateSlide(slider, currentSlide, totalSlides, sliderClass);
        });

        // Right arrow navigation
        rightArrow.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++; // Go to the next slide
            } else {
                currentSlide = 0; // Loop to the first slide if at the end
            }
            updateSlide(slider, currentSlide, totalSlides, sliderClass);
        });

        // Manual navigation via radio buttons
        const manualBtns = slider.parentNode.querySelectorAll('.manual-btn');
        manualBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentSlide = index;
                updateSlide(slider, currentSlide, totalSlides, sliderClass);
            });
        });
    }


    // Add slider functionality to each room's slider
    const livingSlider = document.querySelector('.living-slides');
    const livingLeftArrow = document.querySelector('.living-left');
    const livingRightArrow = document.querySelector('.living-right');
    const totalLivingSlides = livingSlider.querySelectorAll('.slide').length;
    addSliderNavigation(livingSlider, leftArrow, rightArrow, totalLivingSlides, 'living');

    const bedSlider = document.querySelector('.slides-bed');
    const bedLeftArrow = document.querySelector('.leftarrow');
    const bedRightArrow = document.querySelector('.rightarrow');
    const totalBedSlides = bedSlider.querySelectorAll('.slide-bed').length;
    addSliderNavigation(bedSlider, leftArrow, rightArrow, totalBedSlides, 'bed');

    const kitchSlider = document.querySelector('.slides-kitch');
    const kitchLeftArrow = document.querySelector('.leftarrow');
    const kitchRightArrow = document.querySelector('.rightarrow');
    const totalKitchSlides = kitchSlider.querySelectorAll('.slide-kitch').length;
    addSliderNavigation(kitchSlider, leftArrow, rightArrow, totalKitchSlides, 'kitch');

    const bathSlider = document.querySelector('.slides-bath');
    const bathLeftArrow = document.querySelector('.leftarrow');
    const batRightArrow = document.querySelector('.rightarrow');
    const totalBathSlides = bathSlider.querySelectorAll('.slide-bath').length;
    addSliderNavigation(bathSlider, leftArrow, rightArrow, totalBathSlides, 'bath');

    // Grab references to the images and the slide navigation elements
const smartLampImage = document.querySelector('.smartlamp-image img');
const airPurifierImage = document.querySelector('.airpurifier-image img');



});

/*
 */






let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let controlspeakers = document.getElementsByClassName('.control-speakers')

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;//index of track we are playing
let isPlaying = false;
let isRandom = false;
let updateTimer;

//list of songs going to be played 
const playlist = [
    {
        img : 'Images/Drake.jpeg',
        name : 'Taylor Made Freestyle',
        artist: 'Drake',
        music: 'Music/Drake - Taylor Made Freestyle (Kendrick Lamar Diss) (New Official Audio).mp3'

    },
    {
        img : 'Images/J.COle.jpeg',
        name : 'Adonis interlude',
        artist: 'J. Cole',
        music: 'Music/Dreamville, J. Cole - Adonis Interlude (The Montage) [Official Audio]_XrpPOtPHY_Y.mp3'

    },
    {
        img : 'Images/Kid Cudi.jpeg',
        name : 'BLUE SKY',
        artist: 'Kid Cudi',
        music: 'Music/Kid Cudi - BLUE SKY (Visualizer).mp3'

    },
    {
        img : 'Images/MF DOOM.jpeg',
        name : 'All Caps',
        artist: 'Madvillain',
        music: 'Music/Madvillain - All Caps.mp3'

    },
    {
        img : 'Images/Bruno_Mars.jpeg',
        name : 'Uptown Funk',
        artist: 'Mark Ronson feat. Bruno mars',
        music: 'Music/Mark Ronson - Uptown Funk (feat. Bruno Mars) - Lyrics.mp3'

    },
    {
        img : 'Images/Fireboy.jpeg',
        name : 'Yawa',
        artist: 'Fireboy DML',
        music: 'Music/YAWA.mp3'

    }
];

loadTrack(track_index);
//write out track details based on index
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = playlist[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + playlist[track_index].img + ")";
    track_name.textContent = playlist[track_index].name;
    track_artist.textContent = playlist[track_index].artist;
    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

   // let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    //document.controlspeakers.style.background = gradient;
}

function reset(){
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
//add pause sign when you are playing and rotate
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(track_index < playlist.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < playlist.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * playlist.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = playlist.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}