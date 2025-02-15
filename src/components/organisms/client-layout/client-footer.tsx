import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import React from "react";
import { ContactForm } from "./contact-form";

const CLASS_NAMES = {
  container: "grid grid-cols-3 gap-4 border-t border-gray-300 py-4",
  socials: "flex flex-col gap-4",
};

const MOCK_DATA = {
  address: "245 Thong Nhat, Go Vap, HCM city",
  email: "moni-shop@gmail.com",
  hotline: "0395598485",
  socialLinks: [
    { id: "facebook", name: "facebook", icon: "facebook", url: "" },
    { id: "instagram", name: "instagram", icon: "instagram", url: "" },
    { id: "tiktok", name: "tiktok", icon: "tiktok", url: "" },
    { id: "youtube", name: "youtube", icon: "youtube", url: "" },
    { id: "shopee", name: "shopee", icon: "shopee", url: "" },
  ],
};

export const ClientFooter: React.FC = () => {
  return (
    <div className={CLASS_NAMES.container}>
      {/* address, email, hotline */}
      <div className="flex flex-col gap-y-4">
        <p>{MOCK_DATA.address}</p>
        <p>
          Email: <a href={`mailto:${MOCK_DATA.email}`}>{MOCK_DATA.email}</a>
        </p>
        <p>
          Hotline: <a href={`tel:${MOCK_DATA.hotline}`}>{MOCK_DATA.hotline}</a>
        </p>
      </div>

      {/* socials */}
      <div className={CLASS_NAMES.socials}>
        {MOCK_DATA.socialLinks.map(({ id, name, icon, url }) => (
          <a
            className="flex gap-2 max-w-fit"
            key={id}
            href={url}
            target="_blank"
          >
            <Icon name={icon as EIconName} />
            {name}
          </a>
        ))}
      </div>

      {/* contact us form */}
      <ContactForm />
    </div>
  );
};
