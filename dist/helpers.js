"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const isInternalLink = (link) => link.type === "internal", isExternalLink = (link) => link.type === "external", isEmailLink = (link) => link.type === "email", isPhoneLink = (link) => link.type === "phone", isCustomLink = (link) => !["internal", "external", "email", "phone"].includes(link.type);
exports.isCustomLink = isCustomLink;
exports.isEmailLink = isEmailLink;
exports.isExternalLink = isExternalLink;
exports.isInternalLink = isInternalLink;
exports.isPhoneLink = isPhoneLink;
//# sourceMappingURL=helpers.js.map
