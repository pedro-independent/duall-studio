gsap.registerPlugin(ScrollTrigger);

/* Phones Flying */
let phoneTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".phone-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

phoneTl.to(".phone-wrap.left", {
  y: "-50vh",
  x: "-15vw",
  rotationZ: -15,
});

phoneTl.to(
  ".phone-wrap.middle",
  {
    y: "-50vh",
  },
  0
);

phoneTl.to(
  ".phone-wrap.right",
  {
    y: "-50vh",
    x: "15vw",
    rotationZ: 24,
  },
  0
);

/* Motive Expanding */

let motiveTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".studio-animation-wrapper",
    start: "top center",
    end: "center center",
    scrub: true,
  },
});

motiveTl.to(".studio-motive.left", {
  x: "-5vw",
});
motiveTl.to(
  ".studio-motive.right",
  {
    x: "5vw",
  },
  0
);

/* Team Image Expanding */

let tlStudio = gsap.timeline({
  scrollTrigger: {
    trigger: ".studio-animation-wrapper",
    start: "top 40%",
    end: "bottom center",
    scrub: true,
  },
});

tlStudio.to(".studio-img-wrap", {
  width: "100%",
  height: "100vh",
  onComplete: () => ScrollTrigger.refresh()
});

tlStudio.to(
  ".studio-img.is--one",
  {
    visibility: "hidden",
  }, "<0.1"
);

tlStudio.to(
  ".studio-img.is--two",
  {
    visibility: "hidden",
  }
);


/* Values and Industry color change */

// Splits text into lines
const valuesText = new SplitType('.values-heading h2', { types: 'words' });
const industryText = new SplitType('.industry-heading h2', { types: 'words' });

gsap.fromTo(
  ".values-heading h2 .word",
  { opacity: 0.4 },
  { 
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".values-heading",
      start: "top center",
      end: "bottom 40%",
      scrub: true,
    }
  }
);

gsap.fromTo(
  ".industry-heading h2 .word",
  { opacity: 0.4 },
  { 
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".industry-heading",
      start: "top center",
      end: "bottom 40%",
      scrub: true,
    }
  }
);


/* Industries Expanding */

const industryTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".industry-list-wrapper",
    start: "top center",
    end: "bottom top",
    scrub: true,
  }
});
industryTl.to(".industry-item", { scale: 6, y: "-20vh", stagger: 0.1, });


/* Awards Hover Effects */

const awardsItems = document.querySelectorAll(".awards-item");

gsap.set(".awards-h3", { visibility: "hidden" });
gsap.set(".award-img", { display: "none", scale: 0 });

awardsItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Animate the current item
    gsap.to(item.querySelector(".awards-fill"), { height: "100%", duration: 0.3 });
    gsap.to(item.querySelector("h3"), { x: "1.875em", color: "#ffffff", duration: 0.3 });
    gsap.to(item.querySelector(".awards-h3"), { x: "-1.875em", visibility: "visible", duration: 0.3 });
    gsap.to(item.querySelector(".award-img"), { display: "block", scale: 1, duration: 0.3 });
    gsap.to(item, { borderWidth: "0px", duration: 0.3 });

    // Animate the previous sibling (if it exists)
    const previousItem = item.previousElementSibling;
    if (previousItem) {
      gsap.to(previousItem, { borderWidth: "0px", duration: 0.3 });
    }

    // Check if the item is the first or last child, and remove the border on the parent (.awards-list)
    const parent = item.closest(".awards-list");
    if (item === parent.firstElementChild || item === parent.lastElementChild) {
      gsap.to(parent, { borderWidth: "0px", duration: 0.3 });
    }
  });

  item.addEventListener("mouseleave", () => {
    // Revert animations on the current item
    gsap.to(item.querySelector(".awards-fill"), { height: "0%", duration: 0.3 });
    gsap.to(item.querySelector("h3"), { x: 0, color: "#060606", duration: 0.3 });
    gsap.to(item.querySelector(".awards-h3"), { x: 0, visibility: "hidden", duration: 0.3 });
    gsap.to(item.querySelector(".award-img"), { display: "none", scale: 0, duration: 0.3 });
    gsap.to(item, { borderWidth: "1px", duration: 0.3 });

    // Revert the border of the previous sibling if it exists
    const previousItem = item.previousElementSibling;
    if (previousItem) {
      gsap.to(previousItem, { borderWidth: "1px", duration: 0.3 });
    }

    // Revert the border of the parent (.awards-list) if the item is the first or last child
    const parent = item.closest(".awards-list");
    if (item === parent.firstElementChild || item === parent.lastElementChild) {
      gsap.to(parent, { borderWidth: "1px", duration: 0.3 });
    }
  });
});

/* Projects Parallax */

// Function to get y translation based on image height
const getY = (element) => {
  const height = element.clientHeight;
  const maxScrollSpeed = -700; // Negative maximum scroll speed for smallest images
  const minScrollSpeed = -10; // Negative minimum scroll speed for largest images
  const referenceHeight = 500; // Reference height for scaling

  // Adjust speed factor based on the height relative to the reference height
  const speedFactor =
    maxScrollSpeed +
    (height / referenceHeight) * (minScrollSpeed - maxScrollSpeed);
  console.log({ height, speedFactor });
  return speedFactor;
};

document.querySelectorAll(".work-item").forEach((project) => {
  gsap.to(project, {
    y: getY(project),
    ease: "none",
    scrollTrigger: {
      trigger: project,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
  });
});


/* Contact Section GIF cursor trail */
/* Contact Section GIF cursor trail */

// Variables for tracking cursor position and trail logic
let lastCursorX = 0; // Initial X position
let lastCursorY = 0; // Initial Y position
let lastTrailTime = 0; // Timestamp of the last trail
const trailDelay = 100; // Minimum delay (in ms) between trails
const minDistance = 10; // Minimum cursor movement distance for trail to appear
const maxTrailElements = 10; // Maximum number of trail elements allowed

// Get the contact section element
const contactSection = document.querySelector(".section_contact"); // Update to the correct class name if needed

// Check if the contact section exists
if (contactSection) {
  // Add the event listener only if the element exists
  contactSection.addEventListener("mousemove", (event) => {
    const now = Date.now();
    const dx = event.clientX - lastCursorX;
    const dy = event.clientY - lastCursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (now - lastTrailTime > trailDelay && distance > minDistance) {
      lastTrailTime = now;
      lastCursorX = event.clientX;
      lastCursorY = event.clientY;

      // Get the bounding rectangle of the container
      const rect = contactSection.getBoundingClientRect();

      const trailElements = document.querySelectorAll(".trail");
      if (trailElements.length >= maxTrailElements) {
        gsap.to(trailElements[0], {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => trailElements[0].remove(),
        });
      }

      const trail = document.createElement("img");
      trail.src = "https://cdn.prod.website-files.com/66fc152695f7656df535cb41/672268768242b00e997ccf63_cta-img.gif";
      trail.classList.add("trail");

      // Position the trail element relative to the container
      trail.style.left = `${event.clientX - rect.left}px`;
      trail.style.top = `${event.clientY - rect.top}px`;

      contactSection.appendChild(trail);

      gsap.fromTo(
        trail,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );

      gsap.to(trail, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.75,
        onComplete: () => trail.remove(),
      });
    }
  });
} else {
  console.log("contactSection not found on this page.");
}




/* Open Form */

$('#form-btn').on('click', function() {
  $('.form-modal-wrapper').toggleClass('active');
});

$('.form-close-icon').on('click', function() {
  $('.form-modal-wrapper').toggleClass('active');
});


// Open modal and disable body scroll
$('#form-btn').on('click', function (event) {
  event.preventDefault();
  $('.form-modal-wrapper').addClass('active');
  $('body').addClass('no-scroll'); // Prevent background scroll
});

// Close modal and enable body scroll
$('.form-close-icon').on('click', function () {
  $('.form-modal-wrapper').removeClass('active');
  $('body').removeClass('no-scroll'); // Re-enable background scroll
});

/* Navbar scroll */
let tlNav = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_hero",
    start: "top top",
    end: "top top",
    scrub: 1,
    onEnter: () => {
      document.querySelectorAll(".nav-link").forEach((el) => el.classList.add("active"));
    },
    onLeaveBack: () => {
      document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));
    },
  },
});

tlNav.to(".duall-logo", {
  width: "4.5em",
})


/* Awards Party */
document.addEventListener("DOMContentLoaded", () => {
  const jsConfetti = new JSConfetti();

  gsap.to({}, {
    scrollTrigger: {
      trigger: ".section_awards",
      start: "15% center",
      once: true,
      onEnter: () => {
        jsConfetti.addConfetti({
          emojis: ['🎉', '✨', '💥', '🎉'],
          confettiRadius: 6,
          confettiNumber: 100,
        });
      }
    }
  });
}); 

/* Footer Local Time */
setInterval(() => {
  let e = new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  $(".local-time").text(e);
}, 1000);


/* 404 Compass */

// document.addEventListener("DOMContentLoaded", function() {
//   const compassWrapper = document.querySelector(".compass-wrapper");
//   const outerCompass = document.querySelector(".outer-compass");
//   const compassArrow = document.querySelector(".compass-arrow");

//   if (!compassWrapper || !outerCompass || !compassArrow) {
//     console.error("Compass elements are missing.");
//     return;
//   }

//   // Apply CSS-based transform-origin to position the arrow further from the circle center
//   compassArrow.style.transformOrigin = "50% calc(100% + 10px)"; // Fine-tune the origin to maintain distance
  
//   // Calculate position and dimensions for the orbit based on compass-wrapper
//   const compassRect = compassWrapper.getBoundingClientRect();
//   const outerRect = outerCompass.getBoundingClientRect();
  
//   // Calculate exact center relative to compassWrapper
//   const compassCenterX = outerRect.left + outerRect.width / 2 - compassRect.left;
//   const compassCenterY = outerRect.top + outerRect.height / 2 - compassRect.top;

//   // Set orbit radius to be a bit beyond outer-compass by adding 10px
//   const orbitRadius = (outerRect.width / 2) + 10; 

//   document.addEventListener("mousemove", (event) => {
//     const angle = Math.atan2(
//       event.clientY - (compassRect.top + compassCenterY),
//       event.clientX - (compassRect.left + compassCenterX)
//     );

//     // Calculate x and y position for the arrow based on updated orbitRadius and angle
//     const arrowX = compassCenterX + orbitRadius * Math.cos(angle);
//     const arrowY = compassCenterY + orbitRadius * Math.sin(angle);

//     // Move and rotate the arrow smoothly around the circle with the offset
//     compassArrow.style.left = `${arrowX}px`;
//     compassArrow.style.top = `${arrowY}px`;
//     compassArrow.style.transform = `rotate(${angle * (180 / Math.PI) + 90}deg)`;
//   });
// });
////////////////
// document.addEventListener("DOMContentLoaded", function() {
//   const compassWrapper = document.querySelector(".compass-wrapper");
//   const compassArrow = document.querySelector(".compass-arrow");
//   const outerCompass = document.querySelector(".outer-compass");

//   if (!compassWrapper || !compassArrow || !outerCompass) {
//     console.error("Compass elements are missing.");
//     return;
//   }

//   // Calculate the center of the .outer-compass element
//   const compassRect = outerCompass.getBoundingClientRect();
//   const compassCenterX = compassRect.left + compassRect.width / 2;
//   const compassCenterY = compassRect.top + compassRect.height / 2;

//   // Event listener for mouse movement
//   document.addEventListener("mousemove", (event) => {
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     // Calculate the angle between the mouse position and compass center
//     const angle = Math.atan2(mouseY - compassCenterY, mouseX - compassCenterX);
//     const degree = angle * (180 / Math.PI) + 90; // Adjust to make arrow point correctly

//     // Rotate the .compass-arrow element
//     compassArrow.style.transform = `rotate(${degree}deg)`;
//   });
// });











