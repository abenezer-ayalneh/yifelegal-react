// component
import SvgColor from '../svg-color/svg-color';
import {NavSectionPropTypes} from "../nav-section/nav-section.component";

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig:NavSectionPropTypes[] = [
  {
    title: 'home',
    path: '/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'request for others',
    path: '/request-for-others',
    icon: icon('user-group'),
  },
  {
    title: 'my request',
    path: '/my-requests',
    icon: icon('ic_cart'),
  },
  {
    title: 'requests',
    path: '/requests',
    icon: icon('requests'),
  },
  {
    title: 'settings',
    path: '/settings',
    icon: icon('settings'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
