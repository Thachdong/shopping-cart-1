import { TagList } from ".";

const tags: TTag[] = [
  { content: "React", className: "bg-blue-200" },
  { content: "TypeScript" },
  { content: "Storybook" },
  { content: "Tailwind" },
];

export default {
  component: TagList,
  title: "Molecules/Tag List",
  args: {
    tags,
  }
};

export const Default = {};
