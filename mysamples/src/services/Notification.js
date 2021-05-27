import { notification, Icon } from 'antd';
import React from 'react';

class Notification {
  success(title, text) {
    notification.success({
        message: title,
        description: text,
        duration: 3,
        style: {
          borderRadius: 11,
        }
      });
  };

  error(title, text) {
    notification.error({
      message: title,
      description: text,
      duration: 5,
      style: {
        borderRadius: 11,
      }
    });
  };

  warning(title, text) {
    notification.warning({
      message: title,
      description: text,
      duration: 5,
      style: {
        borderRadius: 11,
      }
      });
  };
}


export default new Notification();
