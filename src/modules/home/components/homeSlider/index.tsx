import { Carousel } from "@mantine/carousel";
import { homeSlides } from "../../configs";
import { Image } from "@mantine/core";

const HomeSlider = () => {
  return (
    <Carousel mx="auto" height={400} loop>
      {homeSlides.map((slide) => (
        <Carousel.Slide key={slide.key}>
          <Image {...slide} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default HomeSlider;
