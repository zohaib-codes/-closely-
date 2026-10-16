import type { SiteContext } from "./operation-context.js";
import { normalizeSiteHostname } from "./site-hostname.js";

export type SiteRegistration = {
  readonly hostname: string;
  readonly site: SiteContext;
};

export type SiteResolution =
  | {
      readonly kind: "resolved";
      readonly site: SiteContext;
    }
  | {
      readonly kind: "unknown_site";
    };

export type SiteRegistry = {
  readonly resolveHostname: (hostname: unknown) => SiteResolution;
};

export function createSiteRegistry(
  registrations: readonly SiteRegistration[],
): SiteRegistry {
  const siteNamesByHostname = new Map<string, string>();

  for (const registration of registrations) {
    const hostname = normalizeSiteHostname(registration.hostname);

    if (siteNamesByHostname.has(hostname)) {
      throw new Error("DUPLICATE_SITE_HOSTNAME");
    }

    siteNamesByHostname.set(hostname, registration.site.siteName);
  }

  return {
    resolveHostname(hostname): SiteResolution {
      const normalizedHostname = normalizeSiteHostname(hostname);
      const siteName = siteNamesByHostname.get(normalizedHostname);

      if (siteName === undefined) {
        return { kind: "unknown_site" };
      }

      return {
        kind: "resolved",
        site: { siteName },
      };
    },
  };
}
