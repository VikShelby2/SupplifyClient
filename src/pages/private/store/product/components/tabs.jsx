import React, { useMemo } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import { ProductsTabMenu } from '../../../../../components/admin/menus';
import { ChevronsUpDown } from 'lucide-react';

const TabsCo = ({ tabsConfig, activeTab, toggleTab, toggleEdit }) => {
  

  return (
    <Tabs variant='light'  color='secondary' size='md' selectedKey={activeTab} onSelectionChange={(key) =>{ toggleTab(key , key, true);
      console.log('Selected key:', key);
    }}>
      {tabsConfig.map((tab) => {
        const isOptionalActive = activeTab === tab.name && tab?.optional;
         console.log(activeTab)
        if (isOptionalActive) {
          return (
            <Tab className='p-0 ' key={tab.value} title={
              <ProductsTabMenu
                key={tab.value}
                tab={tab}
                toggleEdit={toggleEdit}
                trigger={<div className='p-2 h-[40px] flex justify-center items-center'><span>{tab.name}</span></div>}
              />
            } /> 
           
          );
        }

        return (
          <Tab key={tab.value} title={tab.name} onClick={() => toggleTab(tab.name, tab.value, true)} />
        );
      })}
      
    </Tabs>
  );
};

export default TabsCo;