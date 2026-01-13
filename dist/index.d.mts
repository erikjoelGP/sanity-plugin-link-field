import type {BaseSchemaDefinition} from 'sanity'
import {ComponentType} from 'react'
import type {CurrentUser} from 'sanity'
import type {CustomValidatorResult} from 'sanity'
import type {ObjectInputProps} from 'sanity'
import type {ObjectSchemaType} from 'sanity'
import type {Path} from 'sanity'
import {Plugin as Plugin_2} from 'sanity'
import type {PreviewConfig} from 'sanity'
import type {ReferenceFilterOptions} from 'sanity'
import type {SanityDocument} from 'sanity'

export declare interface CustomizableLink {
  parameters?: string
  anchor?: string
  blank?: boolean
}

export declare interface CustomLink extends CustomizableLink {
  type: string
  value?: string
}

export declare interface CustomLinkType extends LinkType {
  options:
    | CustomLinkTypeOptions[]
    | ((
        document: SanityDocument,
        fieldPath: Path,
        user: CurrentUser | null,
      ) => Promise<CustomLinkTypeOptions[]>)
  description?: string
}

export declare interface CustomLinkTypeOptions {
  title: string
  value: string
}

export declare interface EmailLink {
  type: 'email'
  email?: string
}

export declare interface ExternalLink extends CustomizableLink {
  type: 'external'
  url?: string
}

export declare interface InternalLink extends CustomizableLink {
  type: 'internal'
  internalLink?: {
    _type: string
    [key: string]: any
  }
}

export declare const isCustomLink: (link: LinkValue) => link is CustomLink

export declare const isEmailLink: (link: LinkValue) => link is EmailLink

export declare const isExternalLink: (link: LinkValue) => link is ExternalLink

export declare const isInternalLink: (link: LinkValue) => link is InternalLink

export declare const isPhoneLink: (link: LinkValue) => link is PhoneLink

/**
 * A plugin that adds a custom Link field for creating internal and external links,
 * as well as `mailto` and `tel`-links, all using the same intuitive UI.
 *
 * @param options - Options for the plugin. See {@link LinkFieldPluginOptions}
 *
 * @example Minimal example
 * ```ts
 * // sanity.config.ts
 * import { defineConfig } from 'sanity'
 * import { linkField } from 'sanity-plugin-link-field'
 *
 * export default defineConfig((
 *  // ...
 *  plugins: [
 *    linkField()
 *  ]
 * })
 *
 * // mySchema.ts
 * import { defineField, defineType } from 'sanity';
 *
 * export const mySchema = defineType({
 *  // ...
 *  fields: [
 *    // ...
 *    defineField({
 *      name: 'link',
 *      title: 'Link',
 *      type: 'link'
 *    }),
 *  ]
 *});
 * ```
 */
export declare const linkField: Plugin_2<void | LinkFieldPluginOptions>

/**
 * Options for an individual link field
 */
export declare interface LinkFieldOptions {
  /**
   * Whether the link should include an optional field for setting the link text/label.
   * @defaultValue false
   */
  enableText?: boolean
  /**
   * The label for the text input field, if enabled using the `enableText` option.
   * @defaultValue Text
   */
  textLabel?: string
}

/**
 * Global options for the link field plugin
 *
 * @todo: Should be overridable on the field level
 */
export declare interface LinkFieldPluginOptions {
  /**
   * An array of schema types that should be allowed in internal links.
   * @defaultValue ['page']
   */
  linkableSchemaTypes: string[]
  /**
   * Custom filter options passed to the reference input component for internal links.
   * Use it to filter the documents that should be available for linking, eg. by locale.
   *
   * @see https://www.sanity.io/docs/reference-type#1ecd78ab1655
   * @defaultValue undefined
   */
  referenceFilterOptions?: ReferenceFilterOptions
  /**
   * Make internal links use weak references
   * @see https://www.sanity.io/docs/reference-type#f45f659e7b28
   * @defaultValue false
   */
  weakReferences?: boolean
  /** Override the descriptions of the different subfields. */
  descriptions?: {
    internal?: string
    external?: string
    email?: string
    phone?: string
    text?: string
    blank?: string
    advanced?: string
    parameters?: string
    anchor?: string
  }
  /**
   * Whether the user should be able to set custom URL parameters for internal and external links.
   * @defaultValue true
   */
  enableLinkParameters?: boolean
  /**
   * Whether the user should be able to set custom anchors (URL fragments) for internal and external links.
   * @defaultValue true
   */
  enableAnchorLinks?: boolean
  /**
   * Any custom link types that should be available in the dropdown.
   *
   * This can be used to allow users to link to pre-defined routes that don't exist within Sanity,
   * such as hardcoded routes in the frontend application, or dynamic content that is pulled in
   * from an external system.
   *
   * The options can be either an array of objects, or a function that, given the current document
   * and link field, returns an array of options. This can be used to dynamically fetch options.
   *
   * @defaultValue []
   *
   * @example
   * ```ts
   * customLinkTypes: [
   *  {
   *    title: 'Archive Page',
   *    value: 'archive',
   *    icon: OlistIcon,
   *    options: [
   *      {
   *        title: 'Blog',
   *        value: '/blog'
   *      },
   *      {
   *        title: 'News',
   *        value: '/news'
   *      }
   *    ]
   *  }
   * ]
   * ```
   */
  customLinkTypes?: CustomLinkType[]
  icon?: BaseSchemaDefinition['icon']
  preview?: PreviewConfig
}

export declare type LinkInputProps = Omit<
  ObjectInputProps<LinkValue, LinkSchemaType>,
  'compareValue'
> & {
  customLinkTypes: CustomLinkType[]
  compareValue?: LinkValue | Record<string, unknown>
}

export declare type LinkSchemaType = Omit<ObjectSchemaType, 'options'> & {
  options?: LinkFieldOptions
}

export declare interface LinkType {
  title: string
  value: string
  icon: ComponentType
}

export declare type LinkValue = {
  _key?: string
  _type?: 'link'
  text?: string
} & (InternalLink | ExternalLink | EmailLink | PhoneLink | CustomLink)

export declare interface PhoneLink {
  type: 'phone'
  phone?: string
}

/**
 * Helper to create a required link field.
 */
export declare const requiredLinkField: (field: unknown) => CustomValidatorResult

export {}
