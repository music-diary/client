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

/**
 * 특정 감정 데이터에서 레벨 1 or 레벨 2의 감정들을 추출하는 함수
 * @param allEmotions - 전체 감정 배열
 * @returns level 1과 level 2의 감정들만 포함된 배열
 */
export const getLevel1or2Emotions = (allEmotions: IEmotion[]): IEmotion[] => {
  return allEmotions.filter(
    (emotion) => emotion.level === 1 || emotion.level === 2,
  );
};

/**
 * 특정 감정 데이터에서 레벨 1 또는 레벨 2의 감정들을 추출하는 함수
 * 레벨 2 감정이 있을 경우 해당 감정의 부모 감정도 중복되지 않으면 포함.
 * @param allEmotions - 전체 감정 배열
 * @returns level 1과 level 2의 감정들만 포함된 배열
 */

export const getLevel1And2Emotions = (allEmotions: IEmotion[]): IEmotion[] => {
  const result: IEmotion[] = [];
  const seenParents = new Set<string>(); // 부모 ID를 추적하여 중복 방지

  // 먼저 level 2 감정과 그 부모 감정을 처리
  allEmotions.forEach((emotion) => {
    if (emotion.level === 2) {
      result.push(emotion); // level 2 감정 추가

      // 부모 감정을 찾아 추가하되, level 0은 제외
      let parentEmotion = emotion.parent;
      while (parentEmotion && parentEmotion.level > 0) {
        // level 0은 제외
        if (!seenParents.has(parentEmotion.id)) {
          result.push(parentEmotion); // 부모 감정 추가
          seenParents.add(parentEmotion.id); // 중복 방지
        }
        parentEmotion = parentEmotion.parent; // 상위 부모로 이동
      }
    }
  });

  // 이제 level 1 감정을 처리하되, 이미 부모로 추가된 감정은 제외
  allEmotions.forEach((emotion) => {
    if (emotion.level === 1 && !seenParents.has(emotion.id)) {
      result.push(emotion); // 중복되지 않은 level 1 감정 추가
      seenParents.add(emotion.id); // 해당 level 1 감정의 ID를 중복 방지 목록에 추가
    }
  });

  return result;
};
