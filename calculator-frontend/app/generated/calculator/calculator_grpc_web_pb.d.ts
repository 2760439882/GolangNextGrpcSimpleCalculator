import * as grpcWeb from 'grpc-web';

import * as calculator_calculator_pb from '../calculator/calculator_pb'; // proto import: "calculator/calculator.proto"


export class CalculatorClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  calculate(
    request: calculator_calculator_pb.CalculateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: calculator_calculator_pb.CalculateResponse) => void
  ): grpcWeb.ClientReadableStream<calculator_calculator_pb.CalculateResponse>;

}

export class CalculatorPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  calculate(
    request: calculator_calculator_pb.CalculateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<calculator_calculator_pb.CalculateResponse>;

}

