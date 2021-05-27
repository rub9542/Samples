import React from 'react';
import {Modal}  from 'antd';
import '../design/layout.css';
import {SyncOutlined} from '@ant-design/icons';

const LoadingDataModal = ({
  visible,
  title
}) => (
  <Modal
    visible={visible}
    footer={null}
    centered
    closable={false}
  >
    <div className="r-c-c-c">
      <SyncOutlined spin style={{ fontSize: 30, color: '#FF4365'}} />
      <div className="text-xmd m-t-10">Loading {title ? title : null}</div>
    </div>
  </Modal>
)

export default LoadingDataModal;
