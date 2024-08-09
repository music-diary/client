import {
  type IDiary,
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
  status: 'EDIT' | 'DONE';
}

const buildFinalTemplate = (
  template: ITemplate,
  templateContents: Record<string, string>,
) => ({
  name: template.name,
  description: template.description,
  type: template.type,
  order: template.order,
  templateContents: template.templateContents.map((content) => ({
    order: content.order,
    name: content.name,
    label: content.label,
    content: templateContents[content.name] || '', // Use the provided content or an empty string
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
  status,
}: DiaryDataParams): IDiary => {
  const finalTemplate =
    type && template ? buildFinalTemplate(template, templateContents) : null;

  return {
    title,
    status,
    topics: topicList.map((topic) => ({ id: topic.id })),
    emotions: getFinalEmotions(emotions),
    ...(finalTemplate
      ? { templates: finalTemplate }
      : { content: diaryContent }),
  };
};
