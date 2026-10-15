import { createDocTypeRegistry } from "@closely/metadata";
import type {
  DocTypeDefinition,
  DocTypeRegistry,
  DocTypeResolution,
} from "@closely/metadata";
import type { OperationContext, SiteContext } from "./operation-context.js";

export type SiteMetadataRegistration = {
  readonly site: SiteContext;
  readonly definitions: readonly DocTypeDefinition[];
};

export type SiteDocTypeResolution =
  DocTypeResolution | { readonly kind: "unknown_site" };

export type SiteMetadataRegistry = {
  readonly resolveDocType: (
    context: OperationContext,
    name: unknown,
  ) => SiteDocTypeResolution;
};

export function createSiteMetadataRegistry(
  registrations: readonly SiteMetadataRegistration[],
): SiteMetadataRegistry {
  const registriesBySite = new Map<string, DocTypeRegistry>();

  for (const registration of registrations) {
    const siteName = registration.site.siteName;

    if (typeof siteName !== "string" || siteName.trim().length === 0) {
      throw new Error("INVALID_METADATA_SITE");
    }

    if (registriesBySite.has(siteName)) {
      throw new Error("DUPLICATE_METADATA_SITE");
    }

    registriesBySite.set(
      siteName,
      createDocTypeRegistry(registration.definitions),
    );
  }

  return Object.freeze({
    resolveDocType(
      context: OperationContext,
      name: unknown,
    ): SiteDocTypeResolution {
      const registry = registriesBySite.get(context.site.siteName);

      if (registry === undefined) {
        return { kind: "unknown_site" };
      }

      return registry.resolveDocType(name);
    },
  });
}
