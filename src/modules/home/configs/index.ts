import { Course } from "../types";

export const homeSlides = [
  {
    src: "/images/home/carousel-1.jpeg",
    alt: "carousel-1",
    key: "carousel-1",
  },
  {
    src: "/images/home/carousel-2.jpeg",
    alt: "carousel-2",
    key: "carousel-2",
  },
  {
    src: "/images/home/carousel-3.jpeg",
    alt: "carousel-3",
    key: "carousel-3",
  },
];

export const homeCourses: Array<Course> = [
  {
    title: "React",
    description:
      "React is a JavaScript library for building user interfaces. Learn what React is all about on our homepage or in the tutorial.",
    src: "/images/home/react.png",
    alt: "react",
    downLoadTimes: 100,
  },
  {
    title: "Angular",
    description:
      "Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces with Angular.",
    src: "/images/home/angular.png",
    alt: "angular",
    downLoadTimes: 200,
  },
  {
    title: "Vue",
    description:
      "Vue.js - The Progressive JavaScript Framework. Versatile. An incrementally adoptable ecosystem that scales between a library and a full-featured framework.",
    src: "/images/home/vue.png",
    alt: "vue",
    downLoadTimes: 300,
  },
  {
    title: "Node",
    description:
      "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    src: "/images/home/node.png",
    alt: "node",
    downLoadTimes: 400,
  },
];
