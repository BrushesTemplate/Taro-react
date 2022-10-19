import React from 'react';
import { dynamicFormFields } from '@brushes/components';
import Form from 'antd/es/form';
import {useForm} from 'antd/es/form/Form';
import {NodeGraph} from 'qj-shared-library';
import {useMaterialsOperate} from '../../hooks';

const IndexReact = ({defaultValue}: { defaultValue: NodeGraph }) => {
  const [form] = useForm();
  const { formConfig, title, info, callbackImpl, initialValues } = useMaterialsOperate(defaultValue, form)

  return (
    <Form
      form={form}
      onValuesChange={callbackImpl}
      initialValues={initialValues}
    >
      <div className={'inner-operate'}>
        <div className={'title'}>{title}</div>
        <p className={'info'}>{info}</p>
        {
          dynamicFormFields(formConfig, form)
        }
      </div>
    </Form>
  )
}

export default IndexReact;
