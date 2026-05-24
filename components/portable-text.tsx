"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import React, { useState } from "react";
import ImageLightbox from "./image-lightbox";

interface PortableTextImageProps {
  value: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
    caption?: string;
  };
}

function PortableTextImage({ value }: PortableTextImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!value?.asset?._ref) return null;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "q9dxbo03";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const assetRef = value.asset._ref;
  const fileName = assetRef
    .replace("image-", "")
    .replace("-jpg", ".jpg")
    .replace("-png", ".png")
    .replace("-webp", ".webp")
    .replace("-avif", ".avif");

  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${fileName}`;
  const altText = value.alt || "Imagen de blog";

  return (
    <>
      <div className="my-8 sm:my-10">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full rounded-modern shadow-soft-lg border border-green/20 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsOpen(true)}
        />
        {value.caption && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center">{value.caption}</p>
        )}
      </div>
      {isOpen && (
        <ImageLightbox
          imageUrl={imageUrl}
          title={altText}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-10 first:mt-0 leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 mt-8 sm:mt-10 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-8">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-6">{children}</h4>,
    normal: ({ children }) => <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base text-muted-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={target}
          className="text-green-600 hover:underline transition-colors decoration-green/30"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => <PortableTextImage value={value} />,
  },
};

export function SanityPortableText({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />;
}
