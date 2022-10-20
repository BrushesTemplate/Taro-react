import {Button, Form, FormInstance, Space, Table} from 'antd';
import {
  usePicture,
} from '@brushes/store';
import {NamePath, SpacingJsx} from '@brushes/components';
import {SearchMaterials} from '@brushes/materials';
import {defaultFormConfig, defaultColumns} from './config';
import React, {useEffect, useRef} from 'react';
import {TableRowSelection} from 'antd/es/table/interface';
// @ts-ignore
import {useLowCodeGraph} from 'qj-shared-library';

export const PictureJsx = ({form, name = '', handleCancel}: { form: FormInstance; name: NamePath | undefined; handleCancel: Function }) => {
  const monitorInstance = useLowCodeGraph(1);
  const {data = {}, pagination, isLoading, queryImpl, onChange} = usePicture(name + '');
  const ref = useRef<Array<string | number>>([]);
  const goods = Form.useWatch(name, form);
  useEffect(() => {
    if(!goods) return
    const values = form.getFieldsValue();
    monitorInstance.updateNode({ ...values, goods })
  }, [goods])

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys) => {
      ref.current = selectedRowKeys
    },
    defaultSelectedRowKeys: form.getFieldValue(name)
  };

  const saveImpl = () => {
    form.setFieldValue(name, ref.current)
    handleCancel()
  }

  return (
    <>
      <SearchMaterials
        defaultColumns={defaultColumns}
        defaultFormConfig={defaultFormConfig}
        queryImpl={queryImpl}
        drawerTitle={'图片模块选择'}
        render={(height: number, columns: Array<any>) =>
          <SpacingJsx>
            <Table
              loading={isLoading}
              scroll={{
                scrollToFirstRowOnChange: true,
                y: height - 45,
              }}
              sticky
              rowSelection={{...rowSelection}}
              onChange={onChange}
              rowKey={'goodsCode'}
              columns={columns}
              dataSource={data.list}
              pagination={pagination}
            />
          </SpacingJsx>
        }
      />
      <div style={{textAlign: 'right', marginTop: -20, paddingBottom: 20}}>
        <Space align={'end'}>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button type="primary" onClick={saveImpl}>保存</Button>
        </Space>
      </div>
    </>
  )
}