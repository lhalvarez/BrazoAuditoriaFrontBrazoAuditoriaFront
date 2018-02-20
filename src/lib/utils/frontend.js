import { isDefined } from './is';


export function isFirstRender(items) {
  return items && items.length === 0 || !isDefined(items);
}
