import { type IEmotion } from '@/models/interfaces';
import { type EmotionNode } from '@/models/schemas';

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

export const getMoodFromEmotions = (emotionsData: EmotionNode[]): string => {
  if (emotionsData.length === 0) return 'happy'; // 기본값

  let currentEmotion = emotionsData[0].emotions; // 첫 번째 감정 노드를 가져옴

  // 최상위 노드로 이동
  while (currentEmotion.parent) {
    currentEmotion = currentEmotion.parent;
  }

  return currentEmotion.name;
};

/**
 * 특정 감정 데이터에서 레벨 1 또는 레벨 2의 감정들을 추출하는 함수
 * 레벨 2 감정이 있을 경우 해당 감정의 부모 감정도 중복되지 않으면 포함.
 * @param allEmotions - 전체 감정 배열
 * @returns level 1과 level 2의 감정들만 포함된 배열
 */

export const getLevel1And2Emotions = (allEmotions: IEmotion[]): IEmotion[] => {
  const result: IEmotion[] = [];
  const seenParents = new Set<string>();

  allEmotions.forEach((emotion) => {
    if (emotion.level === 2) {
      result.push(emotion);

      let parentEmotion = emotion.parent;
      while (parentEmotion && parentEmotion.level > 0) {
        // level 0은 제외
        if (!seenParents.has(parentEmotion.id)) {
          result.push(parentEmotion);
          seenParents.add(parentEmotion.id);
        }
        parentEmotion = parentEmotion.parent;
      }
    }
  });

  allEmotions.forEach((emotion) => {
    if (emotion.level === 1 && !seenParents.has(emotion.id)) {
      result.push(emotion);
      seenParents.add(emotion.id);
    }
  });

  return result;
};

/**
 * 레벨 1 감정만을 추출하는 함수
 * 레벨 2 감정이 있을 경우 해당 감정의 부모 감정 (레벨 1)을 포함하며, 중복 없이 한 번만 포함.
 * @param allEmotions - 전체 감정 배열
 * @returns 중복 없는 레벨 1 감정 배열
 */
export const getLevel1Emotions = (allEmotions: IEmotion[]): IEmotion[] => {
  const seenEmotionIds = new Set<string>();
  const result: IEmotion[] = [];

  allEmotions.forEach((emotion) => {
    if (emotion.level === 2 && emotion.parent && emotion.parent.level === 1) {
      if (!seenEmotionIds.has(emotion.parent.id)) {
        seenEmotionIds.add(emotion.parent.id);
        result.push(emotion.parent);
      }
    }
  });

  allEmotions.forEach((emotion) => {
    if (emotion.level === 1 && !seenEmotionIds.has(emotion.id)) {
      seenEmotionIds.add(emotion.id);
      result.push(emotion);
    }
  });

  return result;
};
export const getAllEmotionsFromTree = (data: EmotionNode[]): IEmotion[] => {
  const extractedEmotions: IEmotion[] = [];
  const emotionSet = new Set<string>(); // 중복을 방지하기 위한 Set

  const traverse = (node: IEmotion | undefined): void => {
    if (!node) return;

    // 현재 노드가 level 1 또는 2 인지 확인하고 중복이 아닐 때만 추가
    if ((node.level === 1 || node.level === 2) && !emotionSet.has(node.id)) {
      extractedEmotions.push(node);
      emotionSet.add(node.id); // Set에 추가하여 중복 방지
    }

    // 다음 노드로 이동 (트리 탐색)
    if (node.parent) {
      traverse(node.parent);
    }
  };

  // 루트 노드부터 탐색 시작
  data.forEach((item: EmotionNode) => {
    traverse(item.emotions);
  });

  // 감정을 level 순서대로 정렬 (level1 -> level2)
  extractedEmotions.sort((a, b) => a.level - b.level);

  return extractedEmotions;
};
