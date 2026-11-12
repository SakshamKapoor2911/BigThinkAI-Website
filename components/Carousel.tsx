'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(autoPlay);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = React.Children.toArray(children);
  const slideCount = slides.length;

  // Normalize index to 0...slideCount-1
  const normalize = (index: number) => {
    return ((index % slideCount) + slideCount) % slideCount;
  };

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    const normalized = normalize(index);
    setCurrentIndex(normalized);
    onSlideChange?.(normalized);
    // Reset auto-play timer
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    setIsAutoPlayActive(autoPlay);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlayActive || !autoPlay || slideCount <= 1) return;

    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => normalize(prev + 1));
      onSlideChange?.(normalize(currentIndex + 1));
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentIndex, isAutoPlayActive, autoPlay, autoPlayInterval, slideCount, onSlideChange]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slideCount]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlayActive(false);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsAutoPlayActive(true);
  };

  return (
    <div
      ref={carouselRef}
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Featured initiatives carousel"
      aria-live="polite"
    >
      {/* Slide Container */}
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="carousel-slide"
              role="group"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="carousel-button carousel-button-prev"
            aria-label="Previous slide"
            title="Previous slide (or press ←)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="carousel-button carousel-button-next"
            aria-label="Next slide"
            title="Next slide (or press →)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {showIndicators && slideCount > 1 && (
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-indicator ${
                index === currentIndex ? 'carousel-indicator-active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
