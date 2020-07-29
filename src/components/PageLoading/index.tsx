/**
 * 页面加载异常处理
 *
 *    <PageLoading >
 *      ...
 *    </PageLoading>
 *
 *
 */
import React from 'react';
import { NETWORK_ERROR_TIPS } from '@/utils/data';

import LoadingImageSrc from '@/assets/images/loading.gif';
import LoadingFailSrc from '@/assets/images/error-net.png';
import LoadingErrorSrc from '@/assets/images/error-others.png';

import styles from './index.less';

// 加载状态
export const LoadStatus = {
  Loading: 'loading',
  Success: 'success',
  Fail: 'fail',
  Error: 'error',
};

interface ResponseProps {
  data?: any;
  status?: number;
  resultCode?: number;
  errorMsg?: string;
}

interface OptionsProps {}

export function LoadHandle(res: ResponseProps, options: OptionsProps) {
  // 进入授权
  if (res.status && [1001, 1005].includes(res.status)) {
    //
    return {
      status: LoadStatus.Loading,
      loadingText: '微信授权后可进入访问，请求授权中···',
      ...options,
    };
  }
  if (res.resultCode === 200) {
    //
    return {
      status: LoadStatus.Success,
      ...options,
    };
  }
  if (res.resultCode) {
    //
    return {
      status: LoadStatus.Error,
      loadErrorText: res.errorMsg || '哦哦，出错了！',
      ...options,
    };
  }
  //
  return {
    status: LoadStatus.Fail,
    ...options,
  };
}

interface SuccessProps {}

export function LoadSuccess(data: SuccessProps) {
  return {
    data,
    res: {
      resultCode: 200,
    },
  };
}

interface ContentComponentProps {
  loadText: string;
  loadImage: string;
  textCls: string;
  imageCls: string;
}

interface LoadOptions {
  status?: number | string;
  loadingImage?: string;
  loadingText?: string;
  loadFailImage?: string;
  loadFailText?: string;
  loadErrorImage?: string;
  loadErrorText?: string;
  loadContent?: React.FunctionComponent<ContentComponentProps> | string;
}

interface PageProps {
  children?: React.ReactChildren;
  loadOptions: LoadOptions;
  doRequest?: Function;
  query?: {};
}

function Index(props: PageProps) {
  const { children, loadOptions, doRequest, query } = props;
  const {
    status,
    loadingImage,
    loadingText,
    loadFailImage,
    loadFailText = '',
    loadErrorImage,
    loadErrorText = '',
    loadContent: Content = '',
  } = loadOptions;
  let imageSrc = loadingImage || LoadingImageSrc;
  let loadText = loadingText || '叫叫正在赶来...';

  const onRequest = () => {
    //
    if (status !== LoadStatus.Fail) {
      //
      return;
    }
    //
    if (doRequest) {
      //
      doRequest(query, 'reload');
    }
  };
  //
  if (status === LoadStatus.Fail) {
    //
    imageSrc = loadFailImage || LoadingFailSrc;
    loadText = loadFailText || NETWORK_ERROR_TIPS;
  }
  if (status === LoadStatus.Error) {
    imageSrc = loadErrorImage || LoadingErrorSrc;
    loadText = loadErrorText || '';
  }
  //
  if (status !== LoadStatus.Success) {
    return (
      <div className={styles.loading} onClick={onRequest}>
        <div className={styles.loadingWp}>
          {Content ? (
            <Content
              loadText={loadText}
              loadImage={imageSrc}
              textCls={styles.loadingText}
              imageCls={styles.loadingImage}
            />
          ) : (
            <>
              <img className={styles.loadingImage} src={imageSrc} alt="" />
              <p className={styles.loadingText}>{loadText}</p>
            </>
          )}
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default Index;
