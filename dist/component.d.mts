import {ElementType} from 'react'
import {default as React_2} from 'react'

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

export declare const Link: React_2.ForwardRefExoticComponent<
  {
    link?: LinkValue
    as?: ElementType
    hrefResolver?: (link: InternalLink) => string
  } & Omit<React_2.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'> &
    React_2.RefAttributes<HTMLAnchorElement>
>

export declare type LinkProps = {
  link?: LinkValue
  as?: ElementType
  hrefResolver?: (link: InternalLink) => string
} & Omit<React_2.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>

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
