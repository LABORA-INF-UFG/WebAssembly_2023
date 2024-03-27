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

Install cmake with `sudo apt install cmake`<br>
Install make with `sudo apt install make`<br>
Install python with `sudo apt install python`

Go to `cd ./libraries/AlvaAR/src/libs`<br>
Create folder `build_threads` in `./libraries/AlvaAR/src/libs` 

Update `EMSCRIPTEN_DIR` variable inside `build.sh` with your emscripten directory

Execute `./build.sh` to build all dependencies

When done compiling, a string replace is called on all files in `ceres-solver/install/include`.
Therefore, replace all ocurrencies of `"glog/logging.h"` with `"ceres/internal/miniglog/glog/logging.h"`

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
npm start
```
In the Chrome browser[^2], go to http://localhost:8080/local.html.

[^2]: Currently only works in Chrome as the AlvaAR library utilizes the browser's V8 engine.

### With Offloading

Run:
```
cd offloading/slamServer
npm start
```

Open a new terminal and run:
```
cd offloading/staticServer
npm start
```
In Chrome browser, go to http://localhost:8080/offloading.html.


# Portuguese:
## Sobre o Projeto e Como Funciona
Este projeto é um estudo sobre a utilização de WebAssembly e offloading[^3] de tarefas do dispositivo para um servidor na borda da rede. Este repositório consiste em um experimento de uso de WebAssembly e offloading para renderizar um vídeo com recursos de realidade aumentada.

No momento, temos diferentes apps dentro deste repositório. Dentro da pasta offloading, há duas aplicações `slamServer` e `staticServer`. 

O `staticServer` pode rodar de duas maneiras: totalmente local ou realizando offloading para o slamServer (cujo processo é somente realizar processamento de SLAM).

[^3]: Requisitar a um servidor para realizar processamento que demandam muitos recursos (e.g., realizar cálculos matemáticos pesados).

## Como Configurar
### Instalar Dependências

[Instalar o Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Gerenciador de Pacotes do Node)

Execute `npm i` nas pastas **offloading/slamServer** e **offloading/staticServer**.

### Configurar e Compilar Bibliotecas do Servidor de Offloading

**IMPORTANTE:** Se você estiver no Windows, será necessário executar essas configurações no WSL, pois os passos descritos aqui devem ser executados no Linux.

[Instalar e configurar](https://emscripten.org/docs/getting_started/downloads.html) emscripten

Instale cmake com `sudo apt install cmake`<br>
Instale make com `sudo apt install make`<br>
Instale python com `sudo apt install python`

Vá para `cd ./libraries/AlvaAR/src/libs`

Crie a pasta `build_threads` em `./libraries/AlvaAR/src/libs`

Atualize a variável `EMSCRIPTEN_DIR` dentro de `build.sh` com o diretório do seu emscripten

Execute `./build.sh` para compilar todas as dependências

Quando terminar a compilação, será feita uma substituição de string em todos os arquivos em `ceres-solver/install/include`. Portanto, substitua todas as ocorrências de `"glog/logging.h"` por `"ceres/internal/miniglog/glog/logging.h"`

Para compilar a biblioteca alvaar, vá para `cd ./libraries/AlvaAR/src/slam`
Execute:
```
mkdir build
cd build
emcmake cmake ..
emmake make
```
Agora você tem `alva_ar.js` e `alva_ar.worker.mjs` dentro da pasta de compilação.

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
