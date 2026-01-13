import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { isCustomLink, isPhoneLink, isEmailLink, isExternalLink, isInternalLink } from "./helpers.mjs";
const generateHref = {
  internal: (link, hrefResolver) => {
    const internalLink = link, resolvedHref = internalLink.internalLink && hrefResolver ? hrefResolver(internalLink) : void 0;
    if (typeof resolvedHref == "object" && "pathname" in resolvedHref) {
      if (resolvedHref.hash = internalLink.anchor?.replace(/^#/, ""), internalLink.parameters) {
        const params = new URLSearchParams(internalLink.parameters), resolvedParams = new URLSearchParams(resolvedHref.query?.toString());
        for (const [key, value] of params.entries())
          resolvedParams.set(key, value);
        resolvedHref.query = resolvedParams.toString();
      }
      return resolvedHref;
    }
    let href = resolvedHref || (internalLink.internalLink?.slug?.current ? `/${internalLink.internalLink.slug.current.replace(/^\//, "")}` : void 0);
    return href && typeof href == "string" && (href += (internalLink.parameters?.trim() || "") + (internalLink.anchor?.trim() || "")), href || "#";
  },
  external: (link) => isExternalLink(link) && link.url ? link.url.trim() + (link.parameters?.trim() || "") + (link.anchor?.trim() || "") : "#",
  email: (link) => isEmailLink(link) && link.email ? `mailto:${link.email.trim()}` : "#",
  phone: (link) => isPhoneLink(link) && link.phone ? (
    // Tel links cannot contain spaces
    `tel:${link.phone?.replace(/\s+/g, "").trim()}`
  ) : "#",
  custom: (link) => isCustomLink(link) && link.value ? link.value.trim() + (link.parameters?.trim() || "") + (link.anchor?.trim() || "") : "#"
}, getLinkText = (link) => link.text || (isInternalLink(link) ? (
  // Naively try to get the title or slug of the internal link
  link.internalLink?.title || link.internalLink?.slug?.current
) : isExternalLink(link) ? link.url : isPhoneLink(link) ? link.phone : isEmailLink(link) ? link.email : isCustomLink(link) ? link.value : void 0) || "#", Link = forwardRef(
  ({ link, as: Component = "a", hrefResolver, children, ...props }, ref) => link ? (children || (children = getLinkText(link)), /* @__PURE__ */ jsx(
    Component,
    {
      href: link.type === "internal" ? generateHref[link.type]?.(link, hrefResolver) : generateHref[isCustomLink(link) ? "custom" : link.type]?.(link),
      target: !isPhoneLink(link) && !isEmailLink(link) && link.blank ? "_blank" : void 0,
      ref,
      ...props,
      children
    }
  )) : null
);
Link.displayName = "Link";
export {
  Link
};
//# sourceMappingURL=component.mjs.map
