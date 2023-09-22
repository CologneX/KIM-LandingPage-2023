"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
function ThumbnailPlugin(mainRef: any) {
  return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove("border-2");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("border-2");
    }

    function addClickEvents() {
      slider.slides.forEach((slide: any, idx: any) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ImageCarousel({ images }: { images: string[] }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  return (
    <div className="space-y-4">
      <div ref={sliderRef} className="keen-slider rounded-xl">
        {images.map((image) => {
          return (
            <Image
              key={image}
              alt={image}
              src={image}
              width={1000}
              className="keen-slider__slide object-cover"
              height={1000}
              style={{ aspectRatio: "1/1" }}
              as={NextImage}
            />
          );
        })}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail rounded-xl">
        {images.map((image) => {
          return (
            <Image
              key={image}
              alt={image}
              src={image}
              width={500}
              className={`keen-slider__slide  border-primary-500 `}
              height={500}
              style={{ objectFit: "cover", aspectRatio: "1/1" }}
              as={NextImage}
            />
          );
        })}
      </div>
    </div>
  );
}
