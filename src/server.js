const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../proto/calc.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const calculatorProto = grpc.loadPackageDefinition(packageDefinition);

function Calculate(call, callback) {
    const { operand1, operand2, operation } = call.request;

    let result;
    let error;

    switch (operation) {
        case "ADDITION":
            result = operand1 + operand2;
            break;
        case "SUBTRACTION":
            result = operand1 - operand2;
            break;
        case "MULTIPLICATION":
            result = operand1 * operand2;
            break;
        case "DIVISION":
            if (operand2 === 0) {
                error = 'Cannot divide by zero';
                break;
            }
            result = operand1 / operand2;
            break;
        default:
            error = 'Invalid operation';
            break;
    }

    if (error) {
        callback(null, { error });
    } else {
        callback(null, { result });
    }
}

function main() {
    const server = new grpc.Server();
    server.addService(calculatorProto.Calc.service, {
        Calculate: Calculate
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();
