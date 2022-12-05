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
    path: '/request/others',
    icon: icon('ic_user'),
  },
  {
    title: 'my request',
    path: '/request/my-request',
    icon: icon('ic_cart'),
  },
  {
    title: 'settings',
    path: '/settings',
    icon: icon('ic_blog'),
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
