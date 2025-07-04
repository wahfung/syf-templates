import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { parseEther, formatEther, Address } from "viem";
import { CONTRACT_CONFIG, isLocalChain, getChainName } from "../wagmi";

interface Pack {
  owner: Address;
  totalAmount: bigint;
  count: bigint;
  isEqual: boolean;
  packId: bigint;
}

const RedEnvelopeApp: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance, refetch: refetchBalance } = useBalance({ address });
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // 状态管理
  const [amount, setAmount] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [isEqual, setIsEqual] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // 读取红包列表
  const { data: packList, refetch: refetchPackList } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: "getPackList",
  }) as { data: [Pack] | undefined; refetch: () => void };

  console.log(packList);

  // 当交易确认后刷新数据
  useEffect(() => {
    if (isConfirmed) {
      refetchPackList();
      refetchBalance();
      setRefreshKey((prev) => prev + 1);
      // 清空表单
      setAmount("");
      setCount("");
    }
  }, [isConfirmed, refetchPackList, refetchBalance]);

  // 发红包
  const handleCreateRedEnvelope = async (): Promise<void> => {
    if (!amount || !count) {
      alert("请输入金额和数量");
      return;
    }

    if (parseFloat(amount) <= 0 || parseInt(count) <= 0) {
      alert("金额和数量必须大于0");
      return;
    }

    // 检查余额是否足够
    if (balance && parseEther(amount) > balance.value) {
      alert("余额不足");
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: "deposit",
        args: [BigInt(count), isEqual],
        value: parseEther(amount),
      });
    } catch (err) {
      console.error("创建红包失败:", err);
      alert("创建红包失败，请检查控制台错误信息");
    }
  };

  // 抢红包
  const handleGrabRedEnvelope = async (owner: Address): Promise<void> => {
    if (!owner) {
      alert("请选择要抢的红包");
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: "grabbedRedPack",
        args: [owner],
      });
    } catch (err) {
      console.error("抢红包失败:", err);
      alert("抢红包失败，请检查控制台错误信息");
    }
  };

  // 格式化地址显示
  const formatAddress = (addr: Address | undefined): string => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 格式化ETH数量显示
  const formatETH = (value: bigint): string => {
    return parseFloat(formatEther(value)).toFixed(4);
  };

  // 输入验证
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCount(value);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-6">🧧 红包DApp</h1>
          <p className="text-gray-600 mb-6">连接钱包开始使用红包功能</p>
          <p className="text-sm text-gray-500 mb-4">
            支持本地测试网络和以太坊网络
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-red-600">🧧 红包DApp</h1>
              <p className="text-gray-600 mt-2">
                发红包，抢红包，享受区块链的乐趣！
              </p>
            </div>
            <ConnectButton />
          </div>

          {/* 钱包信息 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">钱包地址</p>
                <p className="font-mono text-lg">{formatAddress(address)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">余额</p>
                <p className="text-lg font-semibold text-green-600">
                  {balance ? `${formatETH(balance.value)} ETH` : "0 ETH"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">当前网络</p>
                <p className="text-lg font-medium">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      isLocalChain(chainId) ? "bg-green-500" : "bg-blue-500"
                    }`}
                  ></span>
                  {getChainName(chainId)}
                </p>
              </div>
            </div>
          </div>

          {/* 网络提示 */}
          {!isLocalChain(chainId) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ 您当前连接的不是本地测试网络，请确保合约已部署到当前网络
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 发红包区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-6">💰 发红包</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  红包金额 (ETH)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="输入红包总金额"
                />
                {balance && amount && parseEther(amount) > balance.value && (
                  <p className="text-red-500 text-xs mt-1">余额不足</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  红包个数
                </label>
                <input
                  type="text"
                  value={count}
                  onChange={handleCountChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="输入红包个数"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  红包类型
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={isEqual}
                      onChange={() => setIsEqual(true)}
                      className="mr-2 text-red-600"
                    />
                    <span>等额红包</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!isEqual}
                      onChange={() => setIsEqual(false)}
                      className="mr-2 text-red-600"
                    />
                    <span>拼手气红包</span>
                  </label>
                </div>
              </div>

              {amount && count && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    预览:{" "}
                    {isEqual
                      ? `每个红包 ${(
                          parseFloat(amount) / parseInt(count)
                        ).toFixed(4)} ETH`
                      : "随机金额红包"}
                  </p>
                </div>
              )}

              <button
                onClick={handleCreateRedEnvelope}
                disabled={
                  isPending ||
                  isConfirming ||
                  !amount ||
                  !count ||
                  (balance && parseEther(amount) > balance.value)
                }
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending
                  ? "确认中..."
                  : isConfirming
                  ? "处理中..."
                  : "发红包 🎉"}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    错误: {error.shortMessage || error.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 抢红包区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              🎁 抢红包
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  总共有 {packList && packList.length ? packList.length : "0"}
                  个红包
                </p>
                <button
                  onClick={() => refetchPackList()}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  🔄 刷新
                </button>
              </div>

              {packList && packList.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {packList.map((item: Pack, index: number) => {
                    const isOwnPack =
                      item.owner.toLowerCase() === address?.toLowerCase();
                    const remainingCount = Number(item.count);
                    const isEmpty = remainingCount === 0;

                    return (
                      <div
                        key={`${item.owner}-${index}`}
                        className={`p-4 border rounded-lg transition-colors ${
                          isEmpty
                            ? "border-gray-200 bg-gray-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-500">发红包者</p>
                            <p className="font-mono text-sm">
                              {formatAddress(item.owner)}
                            </p>
                            {isOwnPack && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                我的红包
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">金额</p>
                            <p className="font-semibold text-green-600">
                              {formatETH(item.totalAmount)} ETH
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                          <span
                            className={`text-sm ${
                              isEmpty ? "text-gray-400" : "text-gray-700"
                            }`}
                          >
                            剩余: {remainingCount} 个
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.isEqual
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.isEqual ? "等额" : "拼手气"}
                          </span>
                        </div>

                        <button
                          onClick={() => handleGrabRedEnvelope(item.owner)}
                          disabled={
                            isPending || isConfirming || isOwnPack || isEmpty
                          }
                          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isEmpty
                            ? "红包已抢完 🎉"
                            : isOwnPack
                            ? "不能抢自己的红包"
                            : isPending || isConfirming
                            ? "处理中..."
                            : "抢红包 💰"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-6xl mb-4">🎁</div>
                  <p>暂无可抢的红包</p>
                  <p className="text-sm mt-2">快去发个红包吧！</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 交易状态 */}
        {hash && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">交易状态</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">交易哈希: </span>
                <span className="font-mono text-xs break-all">{hash}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500">状态: </span>
                <span
                  className={`font-medium ${
                    isConfirmed
                      ? "text-green-600"
                      : isConfirming
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {isConfirmed
                    ? "✅ 已确认"
                    : isConfirming
                    ? "⏳ 确认中..."
                    : "📝 已提交"}
                </span>
              </p>
              {isLocalChain(chainId) && (
                <p className="text-xs text-gray-400">
                  在本地网络中，交易通常会立即确认
                </p>
              )}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">使用说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">🎯 发红包</h4>
              <ul className="space-y-1">
                <li>• 输入总金额和红包个数</li>
                <li>• 选择等额或拼手气红包</li>
                <li>• 点击发红包按钮并确认交易</li>
                <li>• 同一地址发新红包会退还旧红包余额</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">🎁 抢红包</h4>
              <ul className="space-y-1">
                <li>• 从列表中选择要抢的红包</li>
                <li>• 每个地址只能抢一次</li>
                <li>• 不能抢自己发的红包</li>
                <li>• 拼手气红包金额随机分配</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 合约信息 */}
        <div className="mt-6 bg-gray-100 rounded-2xl p-4">
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              🔧 合约信息
            </summary>
            <div className="mt-2 space-y-1 text-gray-600">
              <p>
                合约地址:{" "}
                <span className="font-mono text-xs">
                  {CONTRACT_CONFIG.address}
                </span>
              </p>
              <p>
                当前网络: {getChainName(chainId)} (ID: {chainId})
              </p>
              <p>
                网络类型: {isLocalChain(chainId) ? "本地测试网络" : "公共网络"}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default RedEnvelopeApp;
