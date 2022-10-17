import React from 'react';
import './index.scss';
import {NodeGraph} from 'qj-shared-library';
import IndexReact from './index-react';

const Index = ({defaultValue}: { defaultValue: NodeGraph }) => {

  return (
    <IndexReact defaultValue={defaultValue}/>
  )
}

export default Index;
