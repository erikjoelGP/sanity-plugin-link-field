declare interface CustomizableLink {
  parameters?: string
  anchor?: string
  blank?: boolean
}

declare interface CustomLink extends CustomizableLink {
  type: string
  value?: string
}

declare interface EmailLink {
  type: 'email'
  email?: string
}

declare interface ExternalLink extends CustomizableLink {
  type: 'external'
  url?: string
}

declare interface InternalLink extends CustomizableLink {
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

declare type LinkValue = {
  _key?: string
  _type?: 'link'
  text?: string
} & (InternalLink | ExternalLink | EmailLink | PhoneLink | CustomLink)

declare interface PhoneLink {
  type: 'phone'
  phone?: string
}

export {}
