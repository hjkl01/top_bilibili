import { useEffect, useState } from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { List } from 'antd';

const Popup = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const now = String(Math.floor(Date.now() / 1000)).substring(0, 10);
      const url =
        'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all&web_location=333.934&w_rid=28a2a5437141d70f61702c370c3e7fa8&wts=' +
        now;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <img src={item.first_frame} width="200px" height="120px" />
            <List.Item.Meta
              title={<a href={`https://www.bilibili.com/video/${item.bvid}`}>{item.title.slice(0, 20)}</a>}
              description={item.desc.slice(0, 20)}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
