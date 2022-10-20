import * as config from '../config';
import useImmutableCallback from '@brushes/components/dist/components/form/hooks/useImmutableCallback';
import {useEffect} from 'react';
import { useLowCodeGraph, NodeGraph } from 'qj-shared-library';
import { _ } from '@brushes/tools';
import {FormInstance} from 'antd';

const { get, omit } = _;

export function useMaterialsOperate(defaultValue: NodeGraph, form: FormInstance) {
  const monitorInstance = useLowCodeGraph(1);
  const initialValues = defaultValue.props;
  const { formConfig, title, info } = get(config, defaultValue.type, {});
  const callbackImpl = useImmutableCallback((changedValues: any, allValues: any) => {
    monitorInstance.updateNode(allValues)
  });

  useEffect(() => {
    const props = omit(initialValues, 'defaultValue');
    form.setFieldsValue(props);
  }, [initialValues]);

  return {
    formConfig, title, info, callbackImpl, initialValues
  }
}
