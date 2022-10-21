import React, {useState} from 'react';
import {Button, FormInstance, Image} from 'antd';
import Modal from 'antd/es/modal/Modal';
import {QjIcon, Wrapper} from '@brushes/components';
import TabsPic from './component';


export function SelectPicture({form, name}: { name: string; form: FormInstance }) {
  const value = form.getFieldValue(name)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={'choose-container'} onClick={showModal}>
        {
          value ?
            <Image
              preview={{
                mask: '重选',
                visible: false
              }}
              width={86}
              height={86}
              src={value}
            />
            :
            <div className={'choose'}>
              <QjIcon style={{ fontSize: '24px', color: '#888', display: 'block' }} name={'icon-shurukuang-shangchuantupian'}></QjIcon>
              <p>上传</p>
            </div>
        }
      </div>

      <Modal
        destroyOnClose={true}
        width={860}
        title="选择图片"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}>
        <Wrapper>
          <TabsPic name={name} handleCancel={handleCancel} form={form}/>
        </Wrapper>
      </Modal>
    </>
  )
}
