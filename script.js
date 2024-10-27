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
    trigger: ".studio-motive-wrap",
    start: "top 70%",
    end: "bottom center",
    scrub: true,
    markers: false,
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
    start: "top center",
    end: "bottom center",
    scrub: true,
    //markers: true,
  },
});

tlStudio.to(".studio-img-wrap", {
  width: "100%",
  height: "100vh",
});

tlStudio.to(
  ".studio-img.is--one",
  {
    zIndex: 1,
  },
  "<0.3"
);

tlStudio.to(".studio-img.is--three", {
  zIndex: 3,
});

/* Industries Expanding */

gsap.to(".industry-item", {
  scrollTrigger: {
    trigger: ".industry-list-wrapper",
    start: "top 60%",
    end: "bottom top",
    scrub: true,
    //markers: true,
  },
  scale: 4,
  stagger: 0.2,
});