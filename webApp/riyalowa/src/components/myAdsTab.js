import React from 'react'
import { Tab } from 'semantic-ui-react'
import VehicleMyAds from '../components/myads';
import SparePartsMyAds from '../components/sparePartsMyAds';

const panes = [
  {
    menuItem: 'Vehicle Ads',
    render: () => <Tab.Pane><VehicleMyAds/></Tab.Pane>,
  },
  { menuItem: 'SpareParts Ads', 
  render: () => <Tab.Pane><SparePartsMyAds/></Tab.Pane>, 
},
  ]

const TabExampleLoading = () => <Tab panes={panes} />

export default TabExampleLoading
