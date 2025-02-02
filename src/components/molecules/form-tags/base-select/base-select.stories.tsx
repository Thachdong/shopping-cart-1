import { BaseSelect } from ".";

export default {
  component: BaseSelect,
  title: "Molecules/FormTags/BaseSelect",
  args: {
    id: "base-single-select",
    label: "Base Single Select",
    error: "This is an error",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
};

export const Default = {};

export const MultipleSelect = {
  args: {
    isMulti: true,
  },
};
