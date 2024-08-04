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
  selected: IEmotion[] = [],
): IEmotion[] => {
  nodes.forEach((node) => {
    if (node.children.length > 0) {
      findSelectedItems(node.children, selected);
    } else {
      selected.push(node); // 전체 IEmotion 객체 추가
    }
  });
  return selected;
};

// emotions 배열을 구성하는 함수
export const getFinalEmotions = (allEmotions: IEmotion[]): IEmotion[] => {
  if (!allEmotions.length) return [];
  const tree = buildTree(allEmotions);
  const selectedItems = findSelectedItems(tree);
  return selectedItems;
};

/**
 * 주어진 감정 데이터에서 첫 번째 감정의 최상위 감정의 이름을 찾는 함수
 * @param emotionsData - 감정 데이터 배열
 * @returns 첫 번째 감정의 최상위 감정의 이름
 */
export const getMoodFromEmotions = (
  emotionsData: Array<{ emotions: IEmotion }>,
): string => {
  if (emotionsData.length === 0) return 'happy'; // 기본값
  let currentEmotion = emotionsData[0].emotions;
  // 최상위 노드로 이동
  while (currentEmotion.parent) {
    currentEmotion = currentEmotion.parent;
  }
  return currentEmotion.name;
};
