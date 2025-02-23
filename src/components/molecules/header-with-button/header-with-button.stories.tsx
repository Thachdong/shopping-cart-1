import { Button } from "@/components/atoms/button";
import { HeaderWithButton } from ".";

export default {
  component: HeaderWithButton,
  title: "Molecules/Header With Button",
  args: {
    children: "Header",
    level: 1,
    // @ts-expect-error: ignore ts check in storiesbook
    button: <Button variant="primary">Button</Button>,
  },
};

export const Default = {};
