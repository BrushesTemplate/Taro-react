import {DynamicForm, DetailImage, TransformType, FieldType} from '@brushes/components';
import { uploadImpl } from '@brushes/store';
import React from 'react';
const fieldConfig: Array<FieldType>  = [
  {
    label: '上传图片',
    name: 'basicImg',
    type: 'upload',
    rules: [{required: true, message: '请选择图片'}],
    extraProps: {
      render: DetailImage,
      suffixicon: <span style={{fontSize: 12, color: '#999'}}>建议上传400X400像素的图片</span>,
      accept: "image/*",
      maxCount: 1,
      listType: "picture-card",
      text: '上传图片',
    }
  },
]

export const transformDataConfig: Array<TransformType> = [
  {
    from: 'basicImg',
    to: 'basicImge',
    format: async (files: any) => {
      return await uploadImpl(files)
    }
  }
];
const UploadForm = ({onSubmit}: {onSubmit: () => void}) => {

  return (
    <DynamicForm
      transformSubmitDataConfig={transformDataConfig}
      fields={fieldConfig}
      onSubmit={onSubmit}
      saveText={'保存'}
    />
  )
}

export default UploadForm;
