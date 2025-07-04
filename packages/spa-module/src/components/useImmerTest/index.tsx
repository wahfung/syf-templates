import { useImmer } from '@hooks/useImmer';

const TestImmer = () => {
  const [data, setData] = useImmer({ info: '哈哈哈' });

  return (
    <>
      <h1
        className="text-4xl text-orange-500 cursor-pointer"
        onClick={() => {
          console.log('123');
          setData({ info: '哈哈哈' });
        }}
      >
        {data.info}
      </h1>
    </>
  );
};

export default TestImmer;
