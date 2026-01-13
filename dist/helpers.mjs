const isInternalLink = (link) => link.type === "internal", isExternalLink = (link) => link.type === "external", isEmailLink = (link) => link.type === "email", isPhoneLink = (link) => link.type === "phone", isCustomLink = (link) => !["internal", "external", "email", "phone"].includes(link.type);
export {
  isCustomLink,
  isEmailLink,
  isExternalLink,
  isInternalLink,
  isPhoneLink
};
//# sourceMappingURL=helpers.mjs.map
