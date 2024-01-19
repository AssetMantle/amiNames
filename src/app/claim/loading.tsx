"use client";
import {
  homePageHeadingFree,
  homePageHeadingGradientText,
  homePageHeadingText,
} from "@/constant";

export default function ClaimLoading() {
  return (
    <main className="md:flex md:h-[calc(100vh-90px)] md:flex-col md:items-center md:justify-center font-inter block pt-16">
      <div className="text-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary pt-8 pb-3">
          {homePageHeadingText}
          <span className="hero-heading-gradient-text">
            {" "}
            {homePageHeadingGradientText}{" "}
          </span>
          {homePageHeadingFree}
        </h1>
        <p className="md:text-[24px] text-[18px] font-regular text-primary pb-6 mb-3">
          Introducing {`Cosmos's`} first Self sovereign Identity.
        </p>
        <br />
        <p>Loading... </p>
      </div>
    </main>
  );
}
