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
