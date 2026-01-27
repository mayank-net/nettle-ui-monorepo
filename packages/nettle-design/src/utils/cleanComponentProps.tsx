import React from "react";
import styled from "styled-components";

// A generic interface for props of the components
// passed to the function
export interface ComponentProps {
  [key: string]: unknown;
}

type ForwardRef<T, RefElementType> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<RefElementType>
>;

/**
 * Prevent styling props from appearing on the DOM
 *
 * T = Props of the component that will be returned by cleanComponentProps
 * RefElementType = Underlying HTMLElement of this component
 *
 * @param Component HTML Attribute or a React class/functional component
 * @param blacklist List of props to be cleared
 * @returns
 */
function cleanComponentProps<
  T = React.HTMLAttributes<HTMLOrSVGElement>,
  TRef extends Element = HTMLElement
>(
  Component: React.ComponentType<T> | keyof JSX.IntrinsicElements,
  blacklist: string[] = []
): any {
  const removeBlackListProps = React.forwardRef(
    (props: T, ref: React.Ref<TRef>) => {
      const cleanedProps = blacklist.reduce((cProps: T, item: string) => {
        // @ts-expect-error No way to assert keys of generic type in reduce function
        delete cProps[item];
        return cProps;
      }, Object.assign({}, props));

      // @ts-expect-error Typescript confusion when Component in an html string like div, span
      return <Component ref={ref} {...cleanedProps} />;
    }
  );

  return styled<ForwardRef<T, TRef>>(removeBlackListProps);
}

export default cleanComponentProps;
