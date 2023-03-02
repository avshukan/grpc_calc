echo-proto:
	mkdir gen \
	&& grpc_tools_node_protoc \
	--js_out=import_style=commonjs,binary:proto \
	--grpc-web_out=gen \
	--plugin=protoc-gen-grpc-web=`which grpc_tools_node_protoc_plugin` \
	./proto/echo_service.proto

calc-proto:
	mkdir gen \
	&& grpc_tools_node_protoc \
	--js_out=import_style=commonjs,binary:proto \
	--grpc-web_out=gen \
	--plugin=protoc-gen-grpc-web=`which grpc_tools_node_protoc_plugin` \
	./proto/calc.proto

server:
	node ./src/server.js
