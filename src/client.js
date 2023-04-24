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

// Создание gRPC клиента
const calculatorProto = grpc.loadPackageDefinition(packageDefinition)
const client = new calculatorProto.Calc('localhost:50051', grpc.credentials.createInsecure());

// Операнды и операция
const operand1 = 10;
const operand2 = 3;
const operation = 'DIVISION';

// Создание запроса
const request = { operand1, operand2, operation };

// Вызов метода Calculate
client.Calculate(request, (error, response) => {
    if (error) {
        console.error(error);
    } else if (response.error) {
        console.error(response.error);
    } else {
        console.log(response.result);
    }
});