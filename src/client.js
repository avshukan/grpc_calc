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

const getRnd = (N) => Math.floor(N * Math.random());

for (let i = 0; i < 10; i += 1) {

    // Операнды и операция
    const operand1 = getRnd(3);
    const operand2 = getRnd(3);
    const operation = getRnd(4);

    // Создание запроса
    const request = { operand1, operand2, operation }

    // Вызов метода Calculate
    client.Calculate(request, (error, response) => {
        console.log(`Sending ${JSON.stringify(request)}`)

        if (error) {
            console.error(error);
        } else if (response.error) {
            console.error(response.error);
        } else {
            console.log(response.result);
        }
    })
}
