export type SliderOptions = {
  delay: number,
  root: string,
  width: number,
  height: number,
  slides: Array<SlideProps>;
};

export type SlideProps = {
  color?: string;
  text?: string;
}
