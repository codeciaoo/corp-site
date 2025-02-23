import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import ProjectList from '@/components/projects/ProjectList';
import type { ProjectProps } from '@/components/projects/ProjectProps';

const meta = {
  title: 'Components/ProjectList',
  component: ProjectList,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProjects: ProjectProps[] = [
  {
    href: '/projects/project1',
    title: 'プロジェクト1',
    summary: 'これはプロジェクト1の説明文です。',
    publishedDate: new Date('2024-02-16'),
    tags: ['React', 'TypeScript'],
  },
  {
    href: '/projects/project2',
    title: 'プロジェクト2',
    summary: 'これはプロジェクト2の説明文です。',
    publishedDate: new Date('2024-02-15'),
    tags: ['Next.js', 'Tailwind'],
  },
  {
    href: '/projects/project3',
    title: 'プロジェクト3',
    summary: 'これはプロジェクト3の説明文です。',
    publishedDate: new Date('2024-02-14'),
    tags: ['AWS', 'Infrastructure'],
  },
];

export const Default: Story = {
  args: {
    projects: sampleProjects,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // セクションタイトルが表示されていることを確認
    const title = canvas.getByText('開発実績');
    await expect(title).toBeInTheDocument();
    
    // すべてのプロジェクトカードが表示されていることを確認
    sampleProjects.forEach(async (project) => {
      const projectTitle = canvas.getByText(project.title);
      await expect(projectTitle).toBeInTheDocument();
      
      const summary = canvas.getByText(project.summary);
      await expect(summary).toBeInTheDocument();
    });
    
    // グリッドレイアウトの確認
    const grid = canvas.getByRole('list');
    await expect(grid).toHaveClass('grid');
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // セクションタイトルは表示されていることを確認
    const title = canvas.getByText('開発実績');
    await expect(title).toBeInTheDocument();
    
    // プロジェクトカードが表示されていないことを確認
    const grid = canvas.getByRole('list');
    await expect(grid.children).toHaveLength(0);
  },
};

export const WithManyProjects: Story = {
  args: {
    projects: Array(9).fill(null).map((_, index) => ({
      href: `/projects/project${index + 1}`,
      title: `プロジェクト${index + 1}`,
      summary: `これはプロジェクト${index + 1}の説明文です。`,
      publishedDate: new Date(`2024-02-${16 - index}`),
      tags: ['React', 'TypeScript'],
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 多数のプロジェクトが正しくグリッドレイアウトで表示されていることを確認
    const grid = canvas.getByRole('list');
    await expect(grid).toHaveClass('grid', 'sm:grid-cols-2', 'lg:grid-cols-3');
    
    // すべてのプロジェクトカードが表示されていることを確認
    const cards = canvas.getAllByRole('article');
    await expect(cards).toHaveLength(9);
  },
};
