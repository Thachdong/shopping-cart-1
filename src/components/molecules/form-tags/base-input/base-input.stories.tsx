import { BaseInput } from ".";

export default {
  component: BaseInput,
  title: "Molecules/FormTags/BaseInput",
  args: {
    label: "Label",
    id: "input",
    placeholder: "Placeholder",
  },
};

export const InputText = {
  args: {
    type: "text",
    placeholder: "Enter text",
  },
};

export const InputNumber = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const InputWithError = {
  args: {
    error: "Error message",
  },
};
