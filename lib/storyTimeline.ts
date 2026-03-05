import gsap from "gsap";

export const storyTimeline = gsap.timeline({

    scrollTrigger: {

        trigger: "#container",
        start: "top top",
        end: "bottom bottom",
        scrub: true

    }

});