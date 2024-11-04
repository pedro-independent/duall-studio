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
    start: "top 70%",
    end: "bottom top",
    scrub: true,
  }
});

industryTl.to(".industry-item.is--one", { scale: 6, y: "-50vh" })
  .to(".industry-item.is--two", { scale: 6, y: "-50vh" },"<0.1") 
  .to(".industry-item.is--three", { scale: 6, y: "-50vh" },"<0.1")
  .to(".industry-item.is--four",  { scale: 6, y: "-50vh" },"<0.1");


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

let lastTrailTime = 0;
let lastCursorX = 0;
let lastCursorY = 0;
const trailDelay = 75;
const maxTrailElements = 3;
const minDistance = 150;

const contactSection = document.querySelector(".section_contact");

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

