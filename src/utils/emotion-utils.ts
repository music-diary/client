import { type IEmotion } from '@/models/interfaces';

interface IEmotionWithChildren extends IEmotion {
  children: IEmotionWithChildren[];
}

// 트리 구조를 구성하는 함수
export const buildTree = (data: IEmotion[]): IEmotionWithChildren[] => {
  const map: Record<string, IEmotionWithChildren> = {};
  const roots: IEmotionWithChildren[] = [];

  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      const parent = map[item.parentId];
      if (parent) {
        parent.children.push(map[item.id]);
      }
    } else {
      roots.push(map[item.id]);
    }
  });

  return roots;
};

// 최종 선택 항목을 찾는 함수
export const findSelectedItems = (
  nodes: IEmotionWithChildren[],
  selected: Array<{ id: string }> = [],
): Array<{ id: string }> => {
  nodes.forEach((node) => {
    if (node.children.length > 0) {
      findSelectedItems(node.children, selected);
    } else {
      selected.push({ id: node.id });
    }
  });
  return selected;
};

// emotions 배열을 구성하는 함수
export const getFinalEmotions = (
  allEmotions: IEmotion[],
): Array<{ id: string }> => {
  if (!allEmotions.length) return [];
  const tree = buildTree(allEmotions);
  const selectedItems = findSelectedItems(tree);
  return selectedItems;
};
