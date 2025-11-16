"use client";

import { Icon } from "@/components/atoms";
import { Box, IconButton } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { PropsWithChildren, useCallback } from "react";

type CarouselProps = PropsWithChildren<{
  height?: number | string;
}>;

const Carousel = ({ children, height = 300 }: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="relative">
      {/* Viewport */}
      <Box
        ref={emblaRef}
        sx={{
          overflow: "hidden",
        }}
      >
        {/* Slides container */}
        <Box
          sx={{
            display: "flex",
            height,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Prev button */}
      <IconButton
        onClick={scrollPrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        <Icon icon="arrow_back" />
      </IconButton>

      {/* Next button */}
      <IconButton
        onClick={scrollNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        <Icon icon="arrow_right_alt" />
      </IconButton>
    </div>
  );
};

export default Carousel;
