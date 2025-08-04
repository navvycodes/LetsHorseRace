// components/AdBanner.tsx
import { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: 90 }}
      data-ad-client="ca-pub-5148571828321220"
      data-ad-slot="YOUR_AD_SLOT_HERE"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
