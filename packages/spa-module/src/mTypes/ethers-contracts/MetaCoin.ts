/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface MetaCoinInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "INITIAL_SUPPLY"
      | "NAME"
      | "SYMBOL"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "decreaseAllowance"
      | "increaseAllowance"
      | "name"
      | "owner"
      | "renounceOwnership"
      | "symbol"
      | "tokenPrice"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "transferOwnership"
      | "decimals"
      | "buyTokens"
      | "sellTokens"
      | "setTokenPrice"
      | "depositETH"
      | "withdrawETH"
      | "withdrawTokens"
      | "withdrawAllTokens"
      | "getContractETHBalance"
      | "calculateETHForTokens"
      | "calculateTokensForETH"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "OwnershipTransferred"
      | "TokensPurchased"
      | "TokensSold"
      | "TokensWithdrawn"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "INITIAL_SUPPLY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
  encodeFunctionData(functionFragment: "SYMBOL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "buyTokens", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sellTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositETH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawETH",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAllTokens",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractETHBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculateETHForTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateTokensForETH",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "INITIAL_SUPPLY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SYMBOL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sellTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "depositETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAllTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractETHBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateETHForTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateTokensForETH",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensPurchasedEvent {
  export type InputTuple = [
    buyer: AddressLike,
    ethAmount: BigNumberish,
    tokenAmount: BigNumberish
  ];
  export type OutputTuple = [
    buyer: string,
    ethAmount: bigint,
    tokenAmount: bigint
  ];
  export interface OutputObject {
    buyer: string;
    ethAmount: bigint;
    tokenAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensSoldEvent {
  export type InputTuple = [
    seller: AddressLike,
    tokenAmount: BigNumberish,
    ethAmount: BigNumberish
  ];
  export type OutputTuple = [
    seller: string,
    tokenAmount: bigint,
    ethAmount: bigint
  ];
  export interface OutputObject {
    seller: string;
    tokenAmount: bigint;
    ethAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensWithdrawnEvent {
  export type InputTuple = [to: AddressLike, amount: BigNumberish];
  export type OutputTuple = [to: string, amount: bigint];
  export interface OutputObject {
    to: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MetaCoin extends BaseContract {
  connect(runner?: ContractRunner | null): MetaCoin;
  waitForDeployment(): Promise<this>;

  interface: MetaCoinInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  INITIAL_SUPPLY: TypedContractMethod<[], [bigint], "view">;

  NAME: TypedContractMethod<[], [string], "view">;

  SYMBOL: TypedContractMethod<[], [string], "view">;

  /**
   * See {IERC20-allowance}.
   */
  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  /**
   * See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
   */
  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  /**
   * See {IERC20-balanceOf}.
   */
  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  /**
   * Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.
   */
  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  /**
   * Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.
   */
  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  /**
   * Returns the name of the token.
   */
  name: TypedContractMethod<[], [string], "view">;

  /**
   * Returns the address of the current owner.
   */
  owner: TypedContractMethod<[], [string], "view">;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
   */
  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  /**
   * Returns the symbol of the token, usually a shorter version of the name.
   */
  symbol: TypedContractMethod<[], [string], "view">;

  tokenPrice: TypedContractMethod<[], [bigint], "view">;

  /**
   * See {IERC20-totalSupply}.
   */
  totalSupply: TypedContractMethod<[], [bigint], "view">;

  /**
   * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`.
   */
  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  /**
   * See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`.
   */
  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  /**
   * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
   */
  decimals: TypedContractMethod<[], [bigint], "view">;

  buyTokens: TypedContractMethod<[], [void], "payable">;

  sellTokens: TypedContractMethod<
    [tokenAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  setTokenPrice: TypedContractMethod<
    [_tokenPrice: BigNumberish],
    [void],
    "nonpayable"
  >;

  depositETH: TypedContractMethod<[], [void], "payable">;

  withdrawETH: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawTokens: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawAllTokens: TypedContractMethod<
    [to: AddressLike],
    [void],
    "nonpayable"
  >;

  getContractETHBalance: TypedContractMethod<[], [bigint], "view">;

  calculateETHForTokens: TypedContractMethod<
    [tokenAmount: BigNumberish],
    [bigint],
    "view"
  >;

  calculateTokensForETH: TypedContractMethod<
    [ethAmount: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "INITIAL_SUPPLY"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "NAME"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "SYMBOL"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyTokens"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "sellTokens"
  ): TypedContractMethod<[tokenAmount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTokenPrice"
  ): TypedContractMethod<[_tokenPrice: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "depositETH"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "withdrawETH"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawAllTokens"
  ): TypedContractMethod<[to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getContractETHBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "calculateETHForTokens"
  ): TypedContractMethod<[tokenAmount: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "calculateTokensForETH"
  ): TypedContractMethod<[ethAmount: BigNumberish], [bigint], "view">;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TokensPurchased"
  ): TypedContractEvent<
    TokensPurchasedEvent.InputTuple,
    TokensPurchasedEvent.OutputTuple,
    TokensPurchasedEvent.OutputObject
  >;
  getEvent(
    key: "TokensSold"
  ): TypedContractEvent<
    TokensSoldEvent.InputTuple,
    TokensSoldEvent.OutputTuple,
    TokensSoldEvent.OutputObject
  >;
  getEvent(
    key: "TokensWithdrawn"
  ): TypedContractEvent<
    TokensWithdrawnEvent.InputTuple,
    TokensWithdrawnEvent.OutputTuple,
    TokensWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TokensPurchased(address,uint256,uint256)": TypedContractEvent<
      TokensPurchasedEvent.InputTuple,
      TokensPurchasedEvent.OutputTuple,
      TokensPurchasedEvent.OutputObject
    >;
    TokensPurchased: TypedContractEvent<
      TokensPurchasedEvent.InputTuple,
      TokensPurchasedEvent.OutputTuple,
      TokensPurchasedEvent.OutputObject
    >;

    "TokensSold(address,uint256,uint256)": TypedContractEvent<
      TokensSoldEvent.InputTuple,
      TokensSoldEvent.OutputTuple,
      TokensSoldEvent.OutputObject
    >;
    TokensSold: TypedContractEvent<
      TokensSoldEvent.InputTuple,
      TokensSoldEvent.OutputTuple,
      TokensSoldEvent.OutputObject
    >;

    "TokensWithdrawn(address,uint256)": TypedContractEvent<
      TokensWithdrawnEvent.InputTuple,
      TokensWithdrawnEvent.OutputTuple,
      TokensWithdrawnEvent.OutputObject
    >;
    TokensWithdrawn: TypedContractEvent<
      TokensWithdrawnEvent.InputTuple,
      TokensWithdrawnEvent.OutputTuple,
      TokensWithdrawnEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
