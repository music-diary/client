import {
  type IEmotion,
  type ITemplate,
  type ITopic,
} from '@/models/interfaces';
import { getFinalEmotions } from '@/utils/emotion-utils';

interface DiaryDataParams {
  title: string;
  diaryContent: string;
  type?: string;
  template?: ITemplate;
  templateContents: Record<string, string>;
  topicList: ITopic[];
  emotions: IEmotion[];
}

const buildFinalTemplate = (
  template: ITemplate,
  templateContents: Record<string, string>,
) => ({
  ...template,
  templateContents: template.templateContents.map((content) => ({
    ...content,
    content: templateContents[content.name] || '',
  })),
});

export const createDiaryData = ({
  title,
  diaryContent,
  type,
  template,
  templateContents,
  topicList,
  emotions,
}: DiaryDataParams) => {
  const finalTemplate =
    type && template ? buildFinalTemplate(template, templateContents) : null;

  return {
    title,
    status: 'EDIT',
    topics: topicList.map((topic) => ({ id: topic.id })),
    emotions: getFinalEmotions(emotions),
    ...(finalTemplate
      ? { templates: finalTemplate, content: null }
      : { content: diaryContent }),
  };
};
