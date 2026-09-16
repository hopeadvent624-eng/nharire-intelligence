import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

export const SeoHead: React.FC<SeoProps> = ({ title, description, path }) => {
  const { canonicalUrl } = useRouter();

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', `https://nharire.com${path === '/' ? '' : path}`);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://nharire.com${path === '/' ? '' : path}`);

    // 5. Update Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    // 6. Google Analytics initialization check (graceful, non-crashing)
    const gaId = (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID;
    if (gaId && typeof window !== 'undefined' && !(window as any).__GA_INITIALIZED__) {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineScript);
        (window as any).__GA_INITIALIZED__ = true;
      } catch (e) {
        // Analytics failure should never break the application
      }
    }
  }, [title, description, path]);

  return null;
};
