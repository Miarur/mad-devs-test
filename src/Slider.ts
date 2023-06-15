import { SliderOptions, SlideProps } from "./types/slider";

export class Slider {
  public options: SliderOptions;
  private sliderContainer: null | ReturnType<typeof Object>;
  private slideSize: number;
  private slidesNodes: Array<string>;
  private currentSlide: number;
  private autoplay: number | ReturnType<typeof setInterval> | undefined;

  constructor(options: SliderOptions) {
    this.options = options;
    this.sliderContainer = null;
    this.slidesNodes = [];
    this.slideSize = 0;
    this.currentSlide = 0;
    this.autoplay = undefined;
    this.initSlider();
  }  

  private createSlides(): void {
    this.options.slides.forEach((item: SlideProps) => {
      const template = `
      <div class="slider__item">
        <p class="item__text">${item.text}</p>
        <div 
          class="item__image"
          style="background-color:${item.color};
          width: ${this.options.width}px;"
        ></div>
      </div>
      `;
      this.slidesNodes.push(template)
    });
  }
  
  private initTemplateSlider() {
    const slidesList = this.slidesNodes.join(' ');
    const template = `
    <div class="slider" id="slider" style="width: ${this.options.width}px;">
      <div class="slider__container" style="height: ${this.options.height}px;">
       ${ slidesList }
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  }

  private initSliderSelectors(): void {
    const sliderContainerSelector: string = '.slider__container';
    const slider = document.querySelector(`${this.options.root}`) as HTMLDivElement;
    this.sliderContainer = document.querySelector(sliderContainerSelector);
    this.slideSize = slider.offsetWidth;
  }

  private moveSlides(): void {
    this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
  }

  private nextSlide(): void {
    if(this.currentSlide >= this.options.slides.length - 1) {
      this.stopAutoplay();
    }
    this.currentSlide = this.currentSlide >= this.options.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.moveSlides();
  }
  
  private setAutoplay(): void {
    this.autoplay = setInterval(() => this.nextSlide(), this.options.delay);
  }

  private stopAutoplay(): void {
    clearInterval(this.autoplay);
  }

  private initSlider(): void {
    this.createSlides();
    this.initTemplateSlider();
    this.initSliderSelectors();
    this.setAutoplay();
  }
}