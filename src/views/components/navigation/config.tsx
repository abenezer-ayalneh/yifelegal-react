// component
import SvgColor from '../svg-color/svg-color';
import {NavSectionPropTypes} from "../nav-section/nav-section.component";
import {IconHome, IconHome2, IconSettings, IconUser, IconUsers} from "@tabler/icons";

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig:NavSectionPropTypes[] = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon:<IconHome/>,
  },
  {
    title: 'request for others',
    path: '/dashboard/user',
    icon: <IconUsers/>,
  },
  {
    title: 'my request',
    path: '/dashboard/products',
    icon: <IconUser/>,
  },
  {
    title: 'settings',
    path: '/dashboard/blog',
    icon: <IconSettings/>,
  },
];

export default navConfig;
