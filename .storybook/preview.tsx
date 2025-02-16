import type { Preview } from "@storybook/react";
import React from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
