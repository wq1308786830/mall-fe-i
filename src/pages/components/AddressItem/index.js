import React from 'react';
import classnames from 'classnames';

import Icon from '@/pages/components/IconFont';
import styles from './index.less';

const Index = props => {
  const { className, key, onSelect = () => {}, onEdit = () => {}, type } = props;

  // 地址字段兼容处理
  let detail = props.detail || {};
  detail = {
    addressDetail: detail.address,
    // cityRegionId: detail.cityId,
    cityRegionName: detail.cityName,
    // areaRegionId: detail.districtId,
    areaRegionName: detail.districtName,
    recipientPhone: detail.phone,
    // provinceRegionId: detail.provinceId,
    provinceRegionName: detail.provinceName,
    recipientName: detail.receiverName,
    ...detail,
  };

  const handleType = () => {
    if (type === 'edit') {
      return (
        <div
          className={styles.edit}
          onClick={e => {
            //
            e.stopPropagation();
            //
            onEdit(detail);
          }}
        >
          编辑
        </div>
      );
    }
    //
    if (type === 'icon') {
      return (
        <div>
          <Icon type="arrayRight" wrapped width={48} height={48} />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={classnames(styles.addressItem, className)}
      key={key || detail.id}
      onClick={() => {
        onSelect(detail);
      }}
    >
      <div className={classnames(styles.itemLeft)}>
        <div>
          <span>{detail.recipientName}</span>
          <span className={styles.phone}>{detail.recipientPhone}</span>
        </div>
        <div className={styles.detail}>
          <span>
            {`${detail.provinceRegionName || ''}${detail.cityRegionName ||
              ''}${detail.areaRegionName || ''}${detail.addressDetail || ''}`}
          </span>
        </div>
      </div>
      {handleType()}
    </div>
  );
};

export default Index;
