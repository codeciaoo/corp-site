import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import ProjectCard from '@/components/projects/ProjectCard';
import type { ProjectProps } from '@/components/projects/ProjectProps';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
    chromatic: { viewports: [375, 768, 1024, 1440] },
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    withoutSummary: {
      control: 'boolean',
      description: 'サマリーを表示するかどうか',
    },
    index: {
      control: 'number',
      description: 'プロジェクトのインデックス',
    },
    project: {
      control: 'object',
      description: 'プロジェクトデータ',
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProject: ProjectProps = {
  href: '/projects/example',
  title: 'サンプルプロジェクト',
  summary: 'これはサンプルプロジェクトの説明文です。プロジェクトの概要や特徴を簡潔に説明します。',
  publishedDate: new Date('2024-02-16'),
  tags: ['React', 'TypeScript'],
};

export const Default: Story = {
  args: {
    project: baseProject,
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // タイトルが表示されていることを確認
    const title = canvas.getByText(baseProject.title);
    await expect(title).toBeInTheDocument();
    
    // サマリーが表示されていることを確認
    const summary = canvas.getByText(baseProject.summary);
    await expect(summary).toBeInTheDocument();
    
    // タグが表示されていることを確認
    if (baseProject.tags) {
      baseProject.tags.forEach(async (tag) => {
        const tagElement = canvas.getByText(tag);
        await expect(tagElement).toBeInTheDocument();
      });
    }

    // カードがクリック可能であることを確認
    const card = canvas.getByRole('link');
    await userEvent.hover(card);
    // ホバー時のスタイル変更を確認するためのスクリーンショット
    await expect(card).toHaveClass('hover:scale-[1.02]');
  },
};

export const WithoutSummary: Story = {
  args: {
    project: baseProject,
    index: 0,
    withoutSummary: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // サマリーが表示されていないことを確認
    const summary = canvas.queryByText(baseProject.summary);
    await expect(summary).not.toBeInTheDocument();
  },
};

export const WithManyTags: Story = {
  args: {
    project: {
      ...baseProject,
      tags: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Next.js',
        'GraphQL',
        'Node.js',
        'PostgreSQL',
        'Docker',
      ],
    },
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // すべてのタグが表示されていることを確認
    const tagList = canvas.getByRole('list', { name: /タグリスト/i });
    await expect(tagList).toBeInTheDocument();
    
    // タグの数を確認
    const tagItems = canvas.getAllByRole('listitem');
    await expect(tagItems).toHaveLength(8);
  },
};

export const WithLongTitle: Story = {
  args: {
    project: {
      ...baseProject,
      title: 'これは非常に長いプロジェクトタイトルで、複数行になる可能性があります',
      summary: '長いタイトルでもレイアウトが崩れないことを確認するためのストーリーです。',
    },
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 長いタイトルが正しく表示されていることを確認
    const title = canvas.getByText('これは非常に長いプロジェクトタイトルで、複数行になる可能性があります');
    await expect(title).toBeInTheDocument();
    
    // タイトルが複数行になっても他の要素が正しく配置されていることを確認
    const summary = canvas.getByText('長いタイトルでもレイアウトが崩れないことを確認するためのストーリーです。');
    await expect(summary).toBeInTheDocument();
  },
};

export const WithLongSummary: Story = {
  args: {
    project: {
      ...baseProject,
      summary: 'これは非常に長いプロジェクトの説明文です。複数行にわたる長い説明文でも、カードのレイアウトが適切に保たれることを確認します。このように長い説明文の場合でも、カードのデザインは崩れることなく、美しく表示されます。',
    },
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 長い説明文が正しく表示されていることを確認
    const summary = canvas.getByText(/これは非常に長いプロジェクトの説明文です/);
    await expect(summary).toBeInTheDocument();
    
    // カードのコンテナが適切に配置されていることを確認
    const card = canvas.getByRole('link');
    await expect(card).toHaveClass('group block no-underline');
  },
};

export const WithCoverImage: Story = {
  args: {
    project: {
      ...baseProject,
      cover: '/path/to/cover-image.jpg',
      coverAlt: 'プロジェクトのカバー画像',
    },
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // カバー画像のコンテナが存在することを確認
    const imageContainer = canvas.getByTestId('project-cover');
    await expect(imageContainer).toBeInTheDocument();
    
    // カバー画像のスタイルを確認
    await expect(imageContainer).toHaveClass('relative');
  },
};
