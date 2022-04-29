import Shepherd from "shepherd.js";
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: { classes: "shadow-md bg-purple-dark", scrollTo: true },
});
tour.addStep({
  id: "example-step",
  text: "This step is attached to the bottom of the <code>.example-css-selector</code> element.",
  attachTo: { element: ".example-css-selector", on: "bottom" },
  classes: "example-step-extra-class",
  buttons: [{ text: "Next", action: tour.next }],
});
