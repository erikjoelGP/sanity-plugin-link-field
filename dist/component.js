"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var jsxRuntime = require("react/jsx-runtime"), react = require("react"), helpers = require("./helpers.js");
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
  external: (link) => helpers.isExternalLink(link) && link.url ? link.url.trim() + (link.parameters?.trim() || "") + (link.anchor?.trim() || "") : "#",
  email: (link) => helpers.isEmailLink(link) && link.email ? `mailto:${link.email.trim()}` : "#",
  phone: (link) => helpers.isPhoneLink(link) && link.phone ? (
    // Tel links cannot contain spaces
    `tel:${link.phone?.replace(/\s+/g, "").trim()}`
  ) : "#",
  custom: (link) => helpers.isCustomLink(link) && link.value ? link.value.trim() + (link.parameters?.trim() || "") + (link.anchor?.trim() || "") : "#"
}, getLinkText = (link) => link.text || (helpers.isInternalLink(link) ? (
  // Naively try to get the title or slug of the internal link
  link.internalLink?.title || link.internalLink?.slug?.current
) : helpers.isExternalLink(link) ? link.url : helpers.isPhoneLink(link) ? link.phone : helpers.isEmailLink(link) ? link.email : helpers.isCustomLink(link) ? link.value : void 0) || "#", Link = react.forwardRef(
  ({ link, as: Component = "a", hrefResolver, children, ...props }, ref) => link ? (children || (children = getLinkText(link)), /* @__PURE__ */ jsxRuntime.jsx(
    Component,
    {
      href: link.type === "internal" ? generateHref[link.type]?.(link, hrefResolver) : generateHref[helpers.isCustomLink(link) ? "custom" : link.type]?.(link),
      target: !helpers.isPhoneLink(link) && !helpers.isEmailLink(link) && link.blank ? "_blank" : void 0,
      ref,
      ...props,
      children
    }
  )) : null
);
Link.displayName = "Link";
exports.Link = Link;
//# sourceMappingURL=component.js.map
