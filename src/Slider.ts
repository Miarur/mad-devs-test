import { SliderOptions, SlideProps } from "./types/slider";

export default class Slider {
  private _options = {} as SliderOptions;
  private sliderContainer: null | ReturnType<typeof Object>;
  private slidesTemplates: Array<string> = [];
  public currentSlide = 0;
  private autoplay: number | ReturnType<typeof setInterval> | undefined;
  private optionsVerify = false;

  constructor(options: SliderOptions) {
    this._options = options;
    this.checkOptions(this._options);
    this.initSlider();
  }
  get options(): SliderOptions {
    return this._options;
  }

  set options(value: SliderOptions) {
    this.checkOptions(value)
    this.stopAutoplay()
    if(this.optionsVerify) {
      document.body.innerHTML = '';
      this._options = value;
      this.updateOptions();
    }
  }
  
  private updateOptions(): void {
    document.body.innerHTML = '';
    this.initSlider()
  }

  private initTemplateSides() {
    this._options.slides.forEach((item: SlideProps) => {
      const template = `
      <div class="slider__item">
        <p class="item__text">${item.text}</p>
        <div 
          class="item__image"
          style="background-color:${item.color}; width:${this._options.width}px;"
        ></div>
      </div>
      `;
      this.slidesTemplates.push(template);
    });
  }
  
  private initTemplateSlider() {
    const slidesList = this.slidesTemplates.join(' ');
    const template = `
    <div class="slider" id="${this._options.root}" style="width: ${this._options.width}px;">
      <div class="slider__container" style="height: ${this._options.height}px;">
       ${ slidesList }
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  }

  private initSliderSelectors() {
    const sliderContainerSelector: string = '.slider__container';
    this.sliderContainer = document.querySelector(sliderContainerSelector);
  }

  private moveSlides(): void {
    this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this._options.width}px)`;
  }

  public nextSlide(): void {
    this.currentSlide = this.currentSlide >= this._options.slides.length - 1 ? 0 : this.currentSlide += 1;
    this.moveSlides();
    this.currentSlide >= this._options.slides.length - 1 ? this.stopAutoplay() : this.moveSlides();
  }
  
  public setAutoplay(): void {
    this.autoplay = setInterval(() => this.nextSlide(), this._options.delay);
  }

  public stopAutoplay(): void {
    clearInterval(this.autoplay);
  }

  private initSlider() {
    this.initTemplateSides();
    this.initTemplateSlider();
    this.initSliderSelectors();
    this.setAutoplay();
  }

  public checkOptions(options: SliderOptions) {
    const { slides, width, height, root, delay } = options;
  
    if (!slides || !Array.isArray(slides)) {
      throw new Error("Slides parameter is required and must be an array.");
    }
    if (slides.some((slide: SlideProps) => typeof slide !== "object" || !slide.text || !slide.color)) {
      throw new Error("missing value in slides");
    }
    if (!width || width < 0 || width === 0) {
      throw new Error("width must be required and > 0");
    }
    if (!height || height < 0) {
      throw new Error("height must be required and > 0");
    }
    if (!root || root.charAt(0) !== '#') {
      throw new Error("slider must have an id selector like as #slider");
    }
    if (!delay || delay < 0 || delay === 0) {
      throw new Error("slider must have an delay > 0");
    }
    this.optionsVerify = true;
  }
}
