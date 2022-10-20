import React from 'react';
import { FieldType } from '@brushes/components';
import { ColumnsType } from 'antd/es/table';

export const defaultFormConfig: Array<FieldType> = [
    {
        label: '货号',
        name: 'fileRemark',
        type: 'text',
        extraProps: {
            placeholder: '请输入货号'
        }
    },
];


export const defaultColumns: ColumnsType<any> = [
    {
        title: '序号',
        dataIndex: 'orderNumber',
        width: 80,
        render: (text: any, data: object, ind: number) => ind + 1
    },
    {
        title: '商品名称',
        width: 200,
        dataIndex: 'goodsName',
        key: 'goodsName'
    },
    {
        title: '商品编号',
        width: 150,
        dataIndex: 'goodsShowno',
        key: 'goodsShowno'
    },
    {
        width: 120,
        title: '价格',
        dataIndex: 'pricesetNprice',
        key: 'pricesetNprice'
    },
    {
        title: '库存',
        width: 80,
        dataIndex: 'goodsNum',
        key: 'goodsNum'
    },
    {
        title: '分类',
        width: 150,
        dataIndex: 'classtreeName',
        key: 'classtreeName'
    },
    {
        title: '品牌',
        width: 150,
        dataIndex: 'brandName',
        key: 'brandName'
    },
];
