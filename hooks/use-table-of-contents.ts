'use client';
import { useEffect, useState } from 'react';

const defaultSearchId = 'posting-contents';
const defaultTargetNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

export interface TocNode {
  nodeName: string;
  contents: string;
  link: string;
  childNodes?: TocNode[];
}

export interface UseTableOfContentsOptions {
  /**
   * toc contents를 찾을 element의 id
   */
  searchId?: string;
  /**
   * 제공된 Array의 index를 통해 toc node의 depth를 상정하므로,
   * parent에 해당하는 노드가 작은 인덱스에 위치해야 함. */
  targetNodeNames?: string[];
}

export const useTableOfContents = (options?: UseTableOfContentsOptions): TocNode[] => {
  const { searchId = defaultSearchId, targetNodeNames = defaultTargetNodeNames } = options || {};

  const [items, setItems] = useState<TocNode[]>([]);
  useEffect(() => {
    const contents = document.getElementById(searchId);
    const data: TocNode[] = [];
    contents?.childNodes.forEach((v) => {
      if (targetNodeNames.includes(v.nodeName)) {
        if (v instanceof HTMLElement && v.id && v.textContent) {
          const current: TocNode = { contents: v.textContent, link: `#${v.id}`, nodeName: v.nodeName };
          const currentItemLevel = targetNodeNames.findIndex((_v) => _v === current.nodeName);
          const lastItem = data[data.length - 1];
          const lastItemLevel = targetNodeNames.findIndex((_v) => _v === lastItem?.nodeName);
          if (!lastItem) return data.push(current);
          if (lastItemLevel < currentItemLevel) {
            if (lastItem.childNodes) lastItem.childNodes.push(current);
            else lastItem.childNodes = [current];
          } else {
            data.push(current);
          }
        }
      }
    });
    setItems(data);
  }, [searchId, targetNodeNames]);

  return items;
};
