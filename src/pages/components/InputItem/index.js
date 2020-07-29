import { Flex } from 'antd-mobile';

import styles from './index.less';

export default props => {
  console.log(props);
  return (
    <Flex className={styles.numberInput}>
      <div>&nbsp;</div>
    </Flex>
  );
};
