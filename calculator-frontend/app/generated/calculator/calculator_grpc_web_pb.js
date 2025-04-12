/**
 * @fileoverview gRPC-Web generated client stub for calculator
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v6.30.2
// source: calculator/calculator.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.calculator = require('./calculator_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.calculator.CalculatorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.calculator.CalculatorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.calculator.CalculateRequest,
 *   !proto.calculator.CalculateResponse>}
 */
const methodDescriptor_Calculator_Calculate = new grpc.web.MethodDescriptor(
  '/calculator.Calculator/Calculate',
  grpc.web.MethodType.UNARY,
  proto.calculator.CalculateRequest,
  proto.calculator.CalculateResponse,
  /**
   * @param {!proto.calculator.CalculateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.CalculateResponse.deserializeBinary
);


/**
 * @param {!proto.calculator.CalculateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.calculator.CalculateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.calculator.CalculateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.calculator.CalculatorClient.prototype.calculate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/calculator.Calculator/Calculate',
      request,
      metadata || {},
      methodDescriptor_Calculator_Calculate,
      callback);
};


/**
 * @param {!proto.calculator.CalculateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.calculator.CalculateResponse>}
 *     Promise that resolves to the response
 */
proto.calculator.CalculatorPromiseClient.prototype.calculate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/calculator.Calculator/Calculate',
      request,
      metadata || {},
      methodDescriptor_Calculator_Calculate);
};


module.exports = proto.calculator;

