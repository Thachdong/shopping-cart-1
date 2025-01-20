import { Button } from "@/components/atoms/button";
import { HeaderWithButton } from ".";

export default {
  component: HeaderWithButton,
  title: "Molecules/Header With Button",
  args: {
    children: "Header",
    level: 1,
    // @ts-ignore
    button: <Button type="primary">Button</Button>,
  },
};

export const Default = {};
