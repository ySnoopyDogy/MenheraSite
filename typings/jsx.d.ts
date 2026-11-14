// React 19 removed the global `JSX` namespace in favour of `React.JSX`.
// This shim restores the global `JSX` namespace (aliased to `React.JSX`) so
// existing `JSX.Element` return-type annotations keep working.
import type React from 'react';

declare global {
  namespace JSX {
    type ElementType = React.JSX.ElementType;
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
    type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}
