import { AddableBox } from ".";

const MOCK_INPUTS = [
  <input key="1" placeholder="username" />,
  <input key="2" placeholder="email" />,
];

export default {
  component: AddableBox,
  title: "Molecules/Addable Box",
  args: {
    contentList: MOCK_INPUTS,
    onAdd: () => {},
    onRemove: () => {},
  },
};

export const Default = {};
