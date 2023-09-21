import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import BookmarkIcon from '@heroicons/react/24/solid/BookmarkIcon';
import ChartPieIcon from '@heroicons/react/24/solid/ChartPieIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Scraper',
    path: '/products',
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Saved Items',
    path: '/saved-product',
    icon: (
      <SvgIcon fontSize="small">
        <BookmarkIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Customer Segmentation',
    path: '/customer-segmentation',
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
];
