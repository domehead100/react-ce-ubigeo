import React, { FunctionComponent, ReactChild } from 'react'

const listeners = Symbol('jsx-web-comp/event-listeners')
const eventPattern = /^onEvent/

const toKebabCase = (str: string) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

export default function jsx (type: string | FunctionComponent, props: Record<string, any>, ...children: ReactChild[]) {
  const isCustomElement = customElements.get(type as string)
  const newProps = { ...props }

  if (typeof type === 'string' && isCustomElement) {
    newProps.ref = (element: any) => {
      if (element) {
        if (props) {
          /** Map custom events as objects (must have onEvent prefix) */
          const events = Object.entries(props).filter(([k, v]) => k.match(eventPattern)).map(([k, v]) => ({ [k]: v }))
          /** Get only the complex props (objects and arrays) */
          const complexProps = Object.entries(props).filter(([k, v]) => typeof v === 'object').map(([k, v]) => ({ [k]: v }))

          for (const event of events) {
            const [key, impl] = Object.entries(event)[0]
            const eventName = toKebabCase(
              key.replace('onEvent', '')
            ).replace('-', '')

            /** Add the listeners Map if not present */
            if (!element[listeners]) {
              element[listeners] = new Map()
            }
            /** If the listener hasn't be attached, attach it */
            if (!element[listeners].has(eventName)) {
              element.addEventListener(eventName, impl)
              /** Save a reference to avoid listening to the same value twice */
              element[listeners].set(eventName, impl)
              delete newProps[key]
            }
          }

          for (const prop of complexProps) {
            const [key, value] = Object.entries(prop)[0]
            delete newProps[key] // remove the complex prop from props
            element[key] = value
          }
        }
      }
    }
  }
  return React.createElement.apply(null, [type, newProps, ...children])
}
