# English:
## About the Project and How It Works
This project is a study on the utilization of WebAssembly and offloading[^1] tasks from the device to a server at the edge of the network. This repository consists of an experiment using WebAssembly and offloading to render a video with augmented reality features.

Currently, there are different apps within this repository. Inside the offloading folder, there are two applications: **slamServer** and **staticServer`**.

The **staticServer** can run in two ways: fully local or by offloading to the slamServer (which solely processes SLAM).

[^1]: Requesting a server to perform resource-intensive processing tasks (e.g., performing heavy mathematical calculations).

## How to Set Up
### Install dependencies

[Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager)

Run `npm i` in both **offloading/slamServer** and **offloading/staticServer** folders.

### Setup and Build Offloading Server Libraries

IMPORTANT: if you're on Windows, you will need to run these configurations in WSL, because the steps described here are meant to be run on Linux

[Install and setup](https://emscripten.org/docs/getting_started/downloads.html) emscripten

Install cmake with `sudo apt install cmake`
Install make with `sudo apt install make`
Install python with `sudo apt install python`

Go to `cd ./libraries/AlvaAR/src/libs`
Create folder `build_threads` in `./libraries\AlvaAR\src\libs\` 

Update `EMSCRIPTEN_DIR` variable inside `build.sh` with your emscripten directory

Execute `./build.sh` to build all dependencies

When done compiling a string replace is called on all files in `ceres-solver/install/include`
to replace `"glog/logging.h"` with `"ceres/internal/miniglog/glog/logging.h"`

To build alvaar library go to `cd ./libraries/AlvaAR/src/slam`
Run:
```
mkdir build
cd build
emcmake cmake ..
emmake make
```

Now you have `alva_ar.js` and `alva_ar.worker.mjs` inside build folder

## How to Run
### Without Offloading:

Run:
```
cd offloading/staticServer
npm run start
```
In the Chrome browser[^2], go to http://localhost:8080/local.html.

[^2]: Currently only works in Chrome as the AlvaAR library utilizes the browser's V8 engine.

### With Offloading

Run:
```
cd offloading/slamServer
npm run start
```

Open a new terminal and run:
```
cd offloading/staticServer
npm run start
```
In Chrome browser, go to http://localhost:8080/offloading.html.


# Portuguese:
## Sobre o Projeto e Como Funciona
Este projeto é um estudo sobre a utilização de WebAssembly e offloading[^3] de tarefas do dispositivo para um servidor na borda da rede. Este repositório consiste em um experimento de uso de WebAssembly e offloading para renderizar um vídeo com recursos de realidade aumentada.

No momento, temos diferentes apps dentro deste repositório. Dentro da pasta offloading, há duas aplicações `slamServer` e `staticServer`. 

O `staticServer` pode rodar de duas maneiras: totalmente local ou realizando offloading para o slamServer (cujo processo é somente realizar processamento de SLAM).

[^3]: Requisitar a um servidor para realizar processamento que demandam muitos recursos (e.g., realizar cálculos matemáticos pesados).

### Configuração e Compilação de Bibliotecas do Servidor de Deslocamento

**IMPORTANTE:** Se estiver utilizando o Windows, você precisará executar estas configurações no WSL, pois os passos descritos aqui são destinados a serem executados no Linux.

[Instale e configure](https://emscripten.org/docs/getting_started/downloads.html) o emscripten.

Instale o cmake com `sudo apt install cmake`.

Atualize a variável `EMSCRIPTEN_DIR` com a pasta de scripts do emscripten em sua máquina `<SEU_CAMINHO_DE_MÁQUINA>/emsdk/upstream/emscripten` usando o Nano.

Crie a pasta `build_threads` em `libraries\AlvaAR\src\libs\`.

Execute `./build.sh` para compilar as bibliotecas do AlvaAR.

## Como Executar

### Sem offloading:

Execute:
```
cd offloading/staticServer
npm run start
```
No navegador Chrome[^4] acesse http://localhost:8080/local.html

[^4]: Por hora, funciona somente no Chrome pois a biblioteca AlvaAR utiliza a engine V8 do navegador.

### Com offloading
 
Execute:
```
cd offloading/slamServer
npm run start
```
Abra um novo terminal e execute:
```
cd offloading/staticServer
npm run start
```
No navegador Chrome acesse http://localhost:8080/offloading.html
