import { FilterConfig, FilterResult } from "./types";

/**
 * Execute the declarative filter pipeline.
 * 
 * Algorithm (Single-Pass Aggregation):
 * 1. Identify active filters.
 * 2. Iterate through items once.
 * 3. For each item, check if it passes ALL active filters.
 * 4. If it passes, add to results.
 * 5. Calculate Facets:
 *    - For each filter field (e.g. "category"), we want to know:
 *      "If I were to Toggle this specific filter, how many items would match?"
 *    - To calculate this efficiently:
 *      - An item contributes to a specific filter's facet counts if it matches ALL OTHER active filters.
 *      - We check this "partially matching" state for every field during the loop.
 */
export function executeFilter<TItem, TFilterState extends Record<string, any>>(
  items: TItem[],
  config: FilterConfig<TItem, TFilterState>,
  state: TFilterState
): FilterResult<TItem, TFilterState> {
  const definitions = Object.entries(config) as [keyof TFilterState, any][];

  // 1. Identify active filters and Create Facet Maps
  const activeFilters: Array<{ key: keyof TFilterState; def: any; value: any }> = [];
  const facets: Record<keyof TFilterState, Map<string, number>> = {} as any;

  for (const [key, def] of definitions) {
    facets[key as keyof TFilterState] = new Map();

    if (def.isActive(state[key])) {
      activeFilters.push({
        key: key as keyof TFilterState,
        def: def,
        value: state[key]
      });
    }
  }

  const filteredItems: TItem[] = [];

  // 2. Single Pass Loop
  for (const item of items) {
    let matchesAll = true;

    // Check main match first
    for (const filter of activeFilters) {
      if (!filter.def.match(item, filter.value)) {
        matchesAll = false;
        break;
      }
    }

    if (matchesAll) {
      filteredItems.push(item);
    }

    // 3. Calculate Facets
    // An item contributes to a Facet Count for Filter X if it matches ALL filters EXCEPT X.
    for (const [targetKey, targetDef] of definitions) {
      if (!targetDef.getFacetKeys) continue;

      // Does it match everything else?
      let matchesOthers = true;
      for (const filter of activeFilters) {
        if (filter.key === targetKey) continue; // Skip self
        if (!filter.def.match(item, filter.value)) {
          matchesOthers = false;
          break;
        }
      }

      if (matchesOthers) {
        const keys = targetDef.getFacetKeys(item);
        const facetMap = facets[targetKey as keyof TFilterState];
        for (const key of keys) {
          facetMap.set(key, (facetMap.get(key) || 0) + 1);
        }
      }
    }
  }

  return { filteredItems, facets };
}
