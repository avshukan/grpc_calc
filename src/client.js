var PROTO_PATH = __dirname + '/../proto/calc.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc;

/**
 * Starts an RPC server that receives requests for the Greeter service at the sample server port
 */
function main() {
    var client = new grpc.Client();
    client.
        server.addService(calc_proto.Calc.service, {
            GetDiv: GetDiv,
            GetSum: GetSum
        });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();
