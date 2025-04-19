import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';
export default function AppSidebar() {
  const items = [
    {
      title: 'Home',
      url: '#',
    },
    {
      title: 'Inbox',
      url: '#',
    },
    {
      title: 'Settings',
      url: '#',
    },
  ];
  return (
    <Sidebar className="bg-primary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>{' '}
      <SidebarFooter>test</SidebarFooter>
    </Sidebar>
  );
}
