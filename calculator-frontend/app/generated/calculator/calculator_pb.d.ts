import * as jspb from 'google-protobuf'



export class CalculateRequest extends jspb.Message {
  getOperand1(): number;
  setOperand1(value: number): CalculateRequest;

  getOperand2(): number;
  setOperand2(value: number): CalculateRequest;

  getOperator(): string;
  setOperator(value: string): CalculateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateRequest): CalculateRequest.AsObject;
  static serializeBinaryToWriter(message: CalculateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateRequest;
  static deserializeBinaryFromReader(message: CalculateRequest, reader: jspb.BinaryReader): CalculateRequest;
}

export namespace CalculateRequest {
  export type AsObject = {
    operand1: number,
    operand2: number,
    operator: string,
  }
}

export class CalculateResponse extends jspb.Message {
  getResult(): number;
  setResult(value: number): CalculateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateResponse): CalculateResponse.AsObject;
  static serializeBinaryToWriter(message: CalculateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateResponse;
  static deserializeBinaryFromReader(message: CalculateResponse, reader: jspb.BinaryReader): CalculateResponse;
}

export namespace CalculateResponse {
  export type AsObject = {
    result: number,
  }
}

