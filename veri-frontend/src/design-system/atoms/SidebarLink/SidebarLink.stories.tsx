import { Story, Meta } from "@storybook/react/types-6-0";
import { MdViewList } from "react-icons/md";
import { SidebarLink, SidebarLinkProps } from "./SidebarLink";

export default {
  title: "Atoms/SidebarLink",
  component: SidebarLink,
} as Meta;

const Template: Story<SidebarLinkProps> = (args) => <SidebarLink {...args} />;

const SamleLink: SidebarLinkProps = {
  name: "All Veris",
  path: "veries",
  icon: <MdViewList />,
};

export const Default = Template.bind({});
Default.args = {
  ...SamleLink,
};
export const ActiveLink = Template.bind({});
ActiveLink.args = {
  ...SamleLink,
  isActive: true,
};
