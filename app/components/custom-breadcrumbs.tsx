import { Fragment, type HTMLAttributes, type JSX } from 'react';
import { type UIMatch, useMatches } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

type BreadcrumbMatch = UIMatch<
  Record<string, unknown>,
  { breadcrumb: (data?: unknown) => JSX.Element }
>;

export const Breadcrumbs = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const matches = (useMatches() as unknown as BreadcrumbMatch[]).filter(
    ({ handle }) => handle?.breadcrumb
  );

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList itemScope itemType="https://schema.org/BreadcrumbList">
        {matches.map(({ handle, data, id }, i) => (
          <Fragment key={id}>
            <BreadcrumbItem
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {handle.breadcrumb(data)}
              <meta content={`${i + 1}`} itemProp="position" />
            </BreadcrumbItem>
            {i < matches.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
