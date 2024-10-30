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
  x: "-12vw",
});
motiveTl.to(
  ".studio-motive.right",
  {
    x: "12vw",
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
  const maxScrollSpeed = -300; // Negative maximum scroll speed for smallest images
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
      scrub: 1,
    },
  });
});


/* Contact Section GIF cursor trail */

document.querySelector(".section_contact").addEventListener("mousemove", (event) => {
  // Create a new trail element each time the mouse moves
  const trail = document.createElement("img");
  trail.src = "https://cdn.prod.website-files.com/66fc152695f7656df535cb41/672268768242b00e997ccf63_cta-img.gif"; // Replace with the path to your GIF
  trail.classList.add("trail");

  // Position the trail element at the cursor position
  trail.style.left = `${event.clientX}px`;
  trail.style.top = `${event.clientY}px`;

  // Add the trail element to the section_contact
  document.querySelector(".section_contact").appendChild(trail);

  // Apply a slight random offset to the position for a dynamic effect
  const offsetX = (Math.random() - 0.5) * 10;
  const offsetY = (Math.random() - 0.5) * 10;
  trail.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.8)`; 

  // After a delay, fade out and remove the trail element
  setTimeout(() => {
    trail.style.opacity = "0"; // Trigger fade-out
    setTimeout(() => trail.remove(), 800); // Remove the element after fade-out
  }, 100);
});
