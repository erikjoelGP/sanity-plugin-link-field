"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var helpers = require("./helpers.js"), jsxRuntime = require("react/jsx-runtime"), sanity = require("sanity"), ui = require("@sanity/ui"), react = require("react"), styled = require("styled-components"), icons = require("@sanity/icons"), lucideReact = require("lucide-react");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var styled__default = /* @__PURE__ */ _interopDefaultCompat(styled);
const requiredLinkField = (field) => {
  const link = field;
  return !link || !link.type ? "Link is required" : helpers.isInternalLink(link) && !link.internalLink ? {
    message: "Link is required",
    path: "internalLink"
  } : helpers.isExternalLink(link) && !link.url ? {
    message: "URL is required",
    path: "url"
  } : helpers.isEmailLink(link) && !link.email ? {
    message: "E-mail is required",
    path: "email"
  } : helpers.isPhoneLink(link) && !link.phone ? {
    message: "Phone is required",
    path: "phone"
  } : helpers.isCustomLink(link) && !link.value ? {
    message: "Value is required",
    path: "value"
  } : !0;
}, OptionsSpinner = styled__default.default(ui.Spinner)`
  margin-left: 0.5rem;
`, CustomLinkInput = react.memo(function(props) {
  const workspace = sanity.useWorkspace(), document = sanity.useFormValue([]), linkValue = sanity.useFormValue(props.path.slice(0, -1)), [options, setOptions] = react.useState(null), customLinkType = props.customLinkTypes.find((type) => type.value === linkValue.type);
  return react.useEffect(() => {
    customLinkType && (Array.isArray(customLinkType?.options) ? (console.log("[link-field-plugin] custom options (static)", {
      type: customLinkType.value,
      count: customLinkType.options.length
    }), setOptions(customLinkType.options)) : customLinkType.options(document, props.path, workspace.currentUser).then((options2) => {
      console.log("[link-field-plugin] custom options (async)", {
        type: customLinkType.value,
        count: options2.length
      }), setOptions(options2);
    }));
  }, [customLinkType, props.path, workspace.currentUser]), options ? /* @__PURE__ */ jsxRuntime.jsx(
    ui.Select,
    {
      value: props.value ?? "",
      onChange: (e) => {
        console.log("[link-field-plugin] custom value change", {
          type: customLinkType?.value ?? null,
          value: e.currentTarget.value || ""
        }), props.onChange(sanity.set(e.currentTarget.value || ""));
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", disabled: !0, children: "Select value" }),
        options.map((option) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: option.value, children: option.title }, option.value))
      ] })
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(OptionsSpinner, {});
}), ValidationErrorWrapper = styled__default.default(ui.Box)`
  contain: size;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: 12px;
`, FullWidthStack = styled__default.default(ui.Stack)`
  width: 100%;
`, LinkInput = react.memo(function(props) {
  const [textField, typeField, linkField2, ...otherFields] = props.members, { options } = props.schemaType, {
    field: {
      validation: linkFieldValidation,
      schemaType: { description: linkFieldDescription }
    }
  } = linkField2, description = (
    // If a custom link type is used, use its description if it has one.
    props.value && helpers.isCustomLink(props.value) ? props.customLinkTypes.find((type) => type.value === props.value?.type)?.description : (
      // Fallback to the description of the current link type field.
      linkFieldDescription
    )
  ), renderProps = {
    renderAnnotation: props.renderAnnotation,
    renderBlock: props.renderBlock,
    renderField: props.renderField,
    renderInlineBlock: props.renderInlineBlock,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 4, children: [
    options?.enableText && /* @__PURE__ */ jsxRuntime.jsx(
      sanity.ObjectInputMember,
      {
        member: {
          ...textField,
          field: {
            ...textField.field,
            schemaType: {
              ...textField.field.schemaType,
              title: options?.textLabel || textField.field.schemaType.title
            }
          }
        },
        ...renderProps
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 3, children: [
      options?.enableText && /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { as: "label", weight: "medium", size: 1, children: "Link" }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Flex, { gap: 2, align: "flex-start", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          sanity.ObjectInputMember,
          {
            member: {
              ...typeField,
              field: {
                ...typeField.field,
                schemaType: {
                  ...typeField.field.schemaType,
                  title: void 0
                }
              }
            },
            ...renderProps
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(FullWidthStack, { space: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            sanity.ObjectInputMember,
            {
              member: {
                ...linkField2,
                field: {
                  ...linkField2.field,
                  schemaType: {
                    ...linkField2.field.schemaType,
                    title: void 0
                  }
                }
              },
              ...renderProps
            }
          ),
          linkFieldValidation.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(ValidationErrorWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
            sanity.FormFieldValidationStatus,
            {
              fontSize: 1,
              placement: "top",
              validation: linkFieldValidation
            }
          ) })
        ] })
      ] }),
      description && /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { muted: !0, size: 1, children: description })
    ] }),
    otherFields.map((field) => /* @__PURE__ */ jsxRuntime.jsx(sanity.ObjectInputMember, { member: field, ...renderProps }, field.key))
  ] });
}), defaultLinkTypes = [
  { title: "Internal", value: "internal", icon: lucideReact.LinkIcon },
  { title: "URL", value: "external", icon: lucideReact.GlobeIcon },
  { title: "Email", value: "email", icon: lucideReact.AtSignIcon },
  { title: "Phone", value: "phone", icon: lucideReact.PhoneIcon }
], LinkTypeButton = styled__default.default(ui.Button)`
  height: 35px;

  svg.lucide {
    width: 1rem;
    height: 1rem;
  }
`, LinkTypeMenuItem = styled__default.default(ui.MenuItem)`
  svg.lucide {
    width: 1rem;
    height: 1rem;
  }
`, LinkTypeInput = react.memo(function({
  value,
  onChange,
  customLinkTypes = [],
  linkableSchemaTypes
}) {
  const linkTypes = [
    // Disable internal links if not enabled for any schema types
    ...defaultLinkTypes.filter(
      ({ value: value2 }) => value2 !== "internal" || linkableSchemaTypes?.length > 0
    ),
    ...customLinkTypes
  ], selectedType = linkTypes.find((type) => type.value === value) || linkTypes[0];
  return /* @__PURE__ */ jsxRuntime.jsx(
    ui.MenuButton,
    {
      button: /* @__PURE__ */ jsxRuntime.jsx(
        LinkTypeButton,
        {
          type: "button",
          mode: "ghost",
          icon: selectedType.icon,
          iconRight: icons.ChevronDownIcon,
          title: "Select link type",
          "aria-label": `Select link type (currently: ${selectedType.title})`
        }
      ),
      id: "link-type",
      menu: /* @__PURE__ */ jsxRuntime.jsx(ui.Menu, { children: linkTypes.map((type) => /* @__PURE__ */ jsxRuntime.jsx(
        LinkTypeMenuItem,
        {
          text: type.title,
          icon: type.icon,
          onClick: () => {
            console.log("[link-field-plugin] type change", {
              from: value ?? null,
              to: type.value
            }), onChange(sanity.set(type.value));
          }
        },
        type.value
      )) })
    }
  );
}), linkField = sanity.definePlugin((opts) => {
  console.log("[link-field-plugin] loaded");
  const {
    linkableSchemaTypes = ["page"],
    weakReferences = !1,
    referenceFilterOptions,
    descriptions = {
      internal: "Link to another page or document on the website.",
      external: "Link to an absolute URL to a page on another website.",
      email: "Link to send an e-mail to the given address.",
      phone: "Link to call the given phone number.",
      advanced: "Optional. Add anchor links and custom parameters.",
      parameters: "Optional. Add custom parameters to the URL, such as UTM tags.",
      anchor: "Optional. Add an anchor to link to a specific section on the page."
    },
    enableLinkParameters = !0,
    enableAnchorLinks = !0,
    customLinkTypes = [],
    icon,
    preview
  } = opts || {};
  return {
    name: "link-field",
    schema: {
      types: [sanity.defineType({
        name: "link",
        title: "Link",
        type: "object",
        icon,
        preview,
        fieldsets: [
          {
            name: "advanced",
            title: "Advanced",
            description: descriptions.advanced,
            options: {
              collapsible: !0,
              collapsed: !0
            }
          }
        ],
        fields: [
          sanity.defineField({
            name: "text",
            type: "string",
            description: descriptions.text
          }),
          sanity.defineField({
            name: "type",
            type: "string",
            initialValue: "internal",
            validation: (Rule) => Rule.required(),
            components: {
              input: (props) => /* @__PURE__ */ jsxRuntime.jsx(
                LinkTypeInput,
                {
                  customLinkTypes,
                  linkableSchemaTypes,
                  ...props
                }
              )
            }
          }),
          // Internal
          sanity.defineField({
            name: "internalLink",
            type: "reference",
            to: linkableSchemaTypes.map((type) => ({
              type
            })),
            weak: weakReferences,
            options: {
              disableNew: !0,
              ...referenceFilterOptions
            },
            description: descriptions?.internal,
            hidden: ({ parent }) => !!parent?.type && parent?.type !== "internal"
          }),
          // External
          sanity.defineField({
            name: "url",
            type: "url",
            description: descriptions?.external,
            validation: (rule) => rule.uri({
              allowRelative: !0,
              scheme: ["https", "http"]
            }),
            hidden: ({ parent }) => parent?.type !== "external"
          }),
          // E-mail
          sanity.defineField({
            name: "email",
            type: "email",
            description: descriptions?.email,
            hidden: ({ parent }) => parent?.type !== "email"
          }),
          // Phone
          sanity.defineField({
            name: "phone",
            type: "string",
            description: descriptions?.phone,
            validation: (rule) => rule.custom((value, context) => !value || context.parent?.type !== "phone" ? !0 : new RegExp(/^\+?[0-9\s-]*$/).test(value) && !value.startsWith("-") && !value.endsWith("-") || "Must be a valid phone number"),
            hidden: ({ parent }) => parent?.type !== "phone"
          }),
          // Custom
          sanity.defineField({
            name: "value",
            type: "string",
            description: descriptions?.external,
            hidden: ({ parent }) => !parent || !helpers.isCustomLink(parent),
            components: {
              input: (props) => /* @__PURE__ */ jsxRuntime.jsx(CustomLinkInput, { customLinkTypes, ...props })
            }
          }),
          // New tab
          sanity.defineField({
            title: "Open in new window",
            name: "blank",
            type: "boolean",
            initialValue: !1,
            description: descriptions.blank,
            hidden: ({ parent }) => parent?.type === "email" || parent?.type === "phone"
          }),
          // Parameters
          ...enableLinkParameters || enableAnchorLinks ? [
            ...enableLinkParameters ? [
              sanity.defineField({
                title: "Parameters",
                name: "parameters",
                type: "string",
                description: descriptions.parameters,
                validation: (rule) => rule.custom((value, context) => !value || // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context.parent?.type === "email" || // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context.parent?.type === "phone" ? !0 : value.indexOf("?") !== 0 ? "Must start with ?; eg. ?utm_source=example.com&utm_medium=referral" : value.length === 1 ? "Must contain at least one parameter" : !0),
                hidden: ({ parent }) => parent?.type === "email" || parent?.type === "phone",
                fieldset: "advanced"
              })
            ] : [],
            // Anchor
            ...enableAnchorLinks ? [
              sanity.defineField({
                title: "Anchor",
                name: "anchor",
                type: "string",
                description: descriptions.anchor,
                validation: (rule) => rule.custom((value, context) => !value || // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context.parent?.type === "email" || // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context.parent?.type === "phone" ? !0 : value.indexOf("#") !== 0 ? "Must start with #; eg. #page-section-1" : value.length === 1 ? "Must contain at least one character" : new RegExp(/^([-?/:@._~!$&'()*+,;=a-zA-Z0-9]|%[0-9a-fA-F]{2})*$/).test(
                  value.replace(/^#/, "")
                ) || "Invalid URL fragment"),
                hidden: ({ parent }) => parent?.type === "email" || parent?.type === "phone",
                fieldset: "advanced"
              })
            ] : []
          ] : []
        ],
        components: {
          input: (props) => /* @__PURE__ */ jsxRuntime.jsx(LinkInput, { customLinkTypes, ...props, value: props.value })
        }
      })]
    }
  };
});
exports.isCustomLink = helpers.isCustomLink;
exports.isEmailLink = helpers.isEmailLink;
exports.isExternalLink = helpers.isExternalLink;
exports.isInternalLink = helpers.isInternalLink;
exports.isPhoneLink = helpers.isPhoneLink;
exports.linkField = linkField;
exports.requiredLinkField = requiredLinkField;
//# sourceMappingURL=index.js.map
