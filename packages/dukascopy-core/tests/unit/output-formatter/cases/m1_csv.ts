const input = {
  processedData: [
    [1000000000000, 1.00001, 1.00002, 1.00003, 1.00004, 1111],
    [2000000000000, 2.00001, 2.00002, 2.00003, 2.00004, 2222],
    [3000000000000, 3.00001, 3.00002, 3.00003, 3.00004, 3333]
  ],
  timeframe: 'm1',
  output: 'csv'
};

const expectedOutput = `timestamp,open,high,low,close,volume
1000000000000,1.00001,1.00002,1.00003,1.00004,1111
2000000000000,2.00001,2.00002,2.00003,2.00004,2222
3000000000000,3.00001,3.00002,3.00003,3.00004,3333`;

export { input, expectedOutput };
