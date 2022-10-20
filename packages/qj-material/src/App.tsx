import React, { useEffect } from 'react';
import './index.scss';
import {Tabs} from 'antd';
import {AppstoreOutlined, LayoutOutlined} from '@ant-design/icons';
import TemplateC from "./components/templateC";
import ModuleC from "./components/moduleC";
import * as Materials from 's-material-react';
// @ts-ignore
import {useLowCodeGraph} from 'qj-shared-library';

const App = () => {
  const expGraph = useLowCodeGraph(1);
  useEffect(() => {
    console.log(expGraph)
    expGraph.init(Materials);
  }, [])
  const items = [
    {
      label: (
        <>
          <AppstoreOutlined/>组件
        </>
      )
      , key: 'item-1', children: <ModuleC/>
    }, // 务必填写 key
    {
      label: (
        <>
          <LayoutOutlined/>模版
        </>
      ), key: 'item-2', children: <TemplateC/>
    },
  ];

  return (
      <div className={'materials-container'}>
        <Tabs items={items} className={'tabs'}/>
      </div>
  )
}

export default App;

