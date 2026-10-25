
const welcomeCard = document.querySelector(".welcome-card");
const surpriseCard = document.getElementById("surpriseCard");
const letterCard = document.getElementById("letterCard");
const galleryCard = document.getElementById("galleryCard");

function showSection(section) {
    [
        welcomeCard,
        surpriseCard,
        letterCard,
        galleryCard
    ].forEach(function (item) {
        item.style.display = "none";
        item.classList.remove("show");
    });

    section.style.display = "block";
    section.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.getElementById("openButton").addEventListener(
    "click",
    async function () {
        showSection(surpriseCard);

        // Mulai animasi hati bersamaan dengan musik
        startHeartAnimation();

        try {
            await birthdayMusic.play();

            musicLabel.textContent = "Playing our song ♡";
            musicButton.classList.add("playing");
            musicButton.setAttribute("aria-label", "Jeda musik");
        } catch (error) {
            musicLabel.textContent = "Tap to play our song ♡";
            console.log("Tekan tombol musik untuk memutar lagu.");
        }
    }
);


document.getElementById("letterButton").addEventListener(
    "click",
    function () {
        showSection(letterCard);
    }
);

document.getElementById("backButton").addEventListener(
    "click",
    function () {
        showSection(surpriseCard);
    }
);

// Buka galeri setelah surat cinta
const galleryButton = document.createElement("button");
galleryButton.className = "love-button";
galleryButton.textContent = "Lihat Kenangan Kita 📸";
galleryButton.style.marginTop = "15px";

letterCard.appendChild(galleryButton);

galleryButton.addEventListener("click", function () {
    showSection(galleryCard);
});

document.getElementById("backToLetterButton").addEventListener(
    "click",
    function () {
        showSection(letterCard);
    }
);


/* ===== KONTROL MUSIK ===== */
const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

musicButton.addEventListener("click", async function () {
    if (birthdayMusic.paused) {
        try {
            await birthdayMusic.play();

            musicLabel.textContent = "Playing our song ♡";
            musicButton.classList.add("playing");
            musicButton.setAttribute("aria-label", "Jeda musik");
        } catch (error) {
            musicLabel.textContent = "Musik gagal diputar";
            console.error("Musik tidak dapat diputar:", error);
        }
    } else {
        birthdayMusic.pause();

        musicLabel.textContent = "Play our song";
        musicButton.classList.remove("playing");
        musicButton.setAttribute("aria-label", "Putar musik");
    }
});

birthdayMusic.addEventListener("ended", function () {
    musicLabel.textContent = "Play our song";
    musicButton.classList.remove("playing");
});


/* ===== KONTROL ANIMASI HATI ===== */
const heartContainer = document.getElementById("heartContainer");

let heartInterval = null;

function createFloatingHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";

    const symbols = ["♡", "♥", "💕", "💗"];
    heart.textContent = symbols[
        Math.floor(Math.random() * symbols.length)
    ];

    heart.style.left = Math.random() * 95 + "%";
    heart.style.fontSize = (14 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    heartContainer.appendChild(heart);

    heart.addEventListener("animationend", function () {
        heart.remove();
    });
}

function startHeartAnimation() {
    if (heartInterval !== null) return;

    heartContainer.classList.add("active");

    // Munculkan beberapa hati pertama
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 180);
    }

    // Lanjutkan animasi selama kejutan berlangsung
    heartInterval = setInterval(createFloatingHeart, 450);
}
