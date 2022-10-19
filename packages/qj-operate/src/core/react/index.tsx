import React, {useEffect, useState} from 'react';
import { dynamicFormFields } from '@brushes/components';
import Form from 'antd/es/form';
import Collapse  from 'antd/es/collapse';
import {useForm} from 'antd/es/form/Form';
import {NodeGraph, useLowCodeGraph} from 'qj-shared-library';
import { Pages } from '../../config'
import IndexReact from './index-react';
import { _ } from '@brushes/tools';
const { isEmpty } = _;
const { Panel } = Collapse;
import useImmutableCallback from '@brushes/components/dist/components/form/hooks/useImmutableCallback';

const PageIndex = ({defaultValue}: { defaultValue: NodeGraph }) => {
  const [form] = useForm();
  const [activedKey, setActivedKey] = useState('2');
  const monitorInstance = useLowCodeGraph(1);

  useEffect(() => {
    const key = !isEmpty(defaultValue) ? '2' : '1';
    setActivedKey(key)
  }, [defaultValue]);

  const onChange = useImmutableCallback(() => {
    setActivedKey(prevState => prevState === '2' ? '1' : '2')
  })

  const callbackImpl = useImmutableCallback((changedValues: any, allValues: any) => {
    // const pageConfig = monitorInstance.lowCodeGraph.pageConfig;
    monitorInstance.lowCodeGraph.pageConfig = allValues
  });

  return (
    <>
      <Collapse
        onChange={onChange}
        style={{background: '#fff'}}
        activeKey={[activedKey]}
        bordered={false}
        expandIconPosition={'end'}
      >
        <Panel
          header={
            <div className={'pageTitle'}>
              {Pages.title}
            </div>
          }
          key="1">
          <div>
            <Form
              form={form}
              onValuesChange={callbackImpl}
              // initialValues={initialValues}
            >
                <p style={{color: '#777'}}>{Pages.info}</p>
                {
                  dynamicFormFields(Pages.formConfig, form)
                }
            </Form>
          </div>
        </Panel>
      </Collapse>
      {
        !isEmpty(defaultValue) ? <IndexReact defaultValue={defaultValue}/> : null
      }
    </>
  )
}

export default PageIndex;
