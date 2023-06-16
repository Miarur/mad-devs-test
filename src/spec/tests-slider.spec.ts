import Slider from '../Slider';
import { SliderOptions } from '../types/slider';

test("Creating a Slider instance should initialize the options and call the initSlider method", () => {
  const options: SliderOptions = {
    delay: 2000,
    root: "#slider",
    width: 800,
    height: 400,
    slides: [
      { color: "red", text: "Slide 1" },
      { color: "blue", text: "Slide 2" },
      { color: "green", text: "Slide 3" },
    ],
  };

  const slider = new Slider(options);

  expect(slider.options).toEqual(options);
});

test("Setting new options should update the options and call the updateOptions method", () => {
  const options: SliderOptions = {
    delay: 2000,
    root: "#slider",
    width: 800,
    height: 400,
    slides: [
      { color: "red", text: "Slide 1" },
      { color: "blue", text: "Slide 2" },
      { color: "green", text: "Slide 3" },
    ],
  };

  const newOptions: SliderOptions = {
    delay: 3000,
    root: "#slider",
    width: 1000,
    height: 500,
    slides: [
      { color: "orange", text: "Slide 1" },
      { color: "purple", text: "Slide 2" },
    ],
  };

  const slider = new Slider(options);
  slider.options = newOptions;

  expect(slider.options).toEqual(newOptions);
});


test('Slider moves to the next slide correctly', () => {
  const options = {
    delay: 2000,
    root: '#slider',
    width: 800,
    height: 400,
    slides: [
      { color: 'red', text: 'Slide 1' },
      { color: 'blue', text: 'Slide 2' },
      { color: 'green', text: 'Slide 3' },
    ],
  };

  const slider = new Slider(options);
  
  slider.nextSlide();

  expect(slider.currentSlide).toBe(1);
});

describe('Slider', () => {
  const options = {
    delay: 3000,
    root: '#slider',
    width: 800,
    height: 400,
    slides: [
      { color: 'red', text: 'Slide 1' },
      { color: 'blue', text: 'Slide 2' },
      { color: 'green', text: 'Slide 3' },
    ],
  };

  let slider: Slider;

  beforeEach(() => {
    document.body.innerHTML = '';
    slider = new Slider(options);
  });

  afterEach(() => {
    slider.stopAutoplay();
  });

  test('creates a slider with correct options', () => {
    expect(slider.options).toEqual(options);
  });


  test('throws an error if slides contain missing or invalid values', () => {
    expect(() => {
      new Slider({ ...options, slides: [{ color: 'red' }] });
    }).toThrow('missing value in slides');

    expect(() => {
      new Slider({ ...options, slides: [{ text: 'Slide 1' }] });
    }).toThrow('missing value in slides');

  });

  test('throws an error if width is missing or invalid', () => {

    expect(() => {
      new Slider({ ...options, width: 0 });
    }).toThrow('width must be required and > 0');

    expect(() => {
      new Slider({ ...options, width: -100 });
    }).toThrow('width must be required and > 0');
  });

  test('throws an error if height is missing or invalid', () => {

    expect(() => {
      new Slider({ ...options, height: -200 });
    }).toThrow('height must be required and > 0');
  });

  test('throws an error if root is missing or invalid', () => {
    expect(() => {
      new Slider({ ...options, root: 'slider' });
    }).toThrow('slider must have an id selector like as #slider');
  });

  test('throws an error if delay is missing or invalid', () => {

    expect(() => {
      new Slider({ ...options, delay: 0 });
    }).toThrow('slider must have an delay > 0');

    expect(() => {
      new Slider({ ...options, delay: -100 });
    }).toThrow('slider must have an delay > 0');
  });
});