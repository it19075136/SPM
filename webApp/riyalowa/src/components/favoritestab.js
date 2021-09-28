import React from 'react'
import { Tab } from 'semantic-ui-react'
import Favorites from '../components/favorites';
import SparePartsFavorites from '../components/sparePartsFavorites';

const panes = [
  {
    menuItem: 'Vehicle Favorites',
    render: () => <Tab.Pane><Favorites/></Tab.Pane>,
  },
  { menuItem: 'SpareParts Favorites', render: () => <Tab.Pane><SparePartsFavorites/></Tab.Pane> },
  ]

const TabExampleLoading = () => <Tab panes={panes} />

export default TabExampleLoading
