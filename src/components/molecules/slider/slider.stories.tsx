import { Slider } from ".";

const CLASS_NAME = "flex justify-center items-center h-32 bg-gray-400";
export default {
  title: "Molecules/Slider",
  component: Slider,
  args: {
    items: [
      <div className={CLASS_NAME} key={1}>
        Item 1
      </div>,
      <div className={CLASS_NAME} key={2}>
        Item 2
      </div>,
      <div className={CLASS_NAME} key={3}>
        Item 3
      </div>,
      <div className={CLASS_NAME} key={4}>
        Item 4
      </div>,
      <div className={CLASS_NAME} key={5}>
        Item 5
      </div>,
      <div className={CLASS_NAME} key={6}>
        Item 6
      </div>,
    ],
  },
};

export const Default = {};
