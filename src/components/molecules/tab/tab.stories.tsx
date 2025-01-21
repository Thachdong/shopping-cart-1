import { Tab } from ".";

const MOCK_ITEMS = [
  { id: "tab1", label: "Tab 1", content: "Content 1" },
  { id: "tab2", label: "Tab 2", content: "Content 2" },
  { id: "tab3", label: "Tab 3", content: "Content 3" },
];

export default {
  component: Tab,
  title: "Molecules/Tab",
  args: {
    items: MOCK_ITEMS,
    initTabId: "tab1",
  },
};

export const Default = {};
