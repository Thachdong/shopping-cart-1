import { Button } from "@/components/atoms/button";
import { HeroBanner } from ".";
import { LinkAsButton } from "../link-as-button";

export default {
  component: HeroBanner,
  title: "Molecules/Hero Banner",
  args: {
    url: "/mock-images/home-banner.jpg",
    header: "Home Page",
    height: 375,
    description: "Home page description",
    buttons: [
      // @ts-ignore
      <LinkAsButton buttonProps={{ type: "primary" }} href={""}>
        Collections
      </LinkAsButton>,
      // @ts-ignore
      <LinkAsButton buttonProps={{ type: "secondary" }} href={""}>
        About Us
      </LinkAsButton>,
    ],
  },
};

export const Default = {};
