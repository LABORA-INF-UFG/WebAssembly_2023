# English:
## About the Project and How It Works
This project is a study on the utilization of WebAssembly and offloading[^1] tasks from the device to a server at the edge of the network. This repository consists of an experiment using WebAssembly and offloading to render a video with augmented reality features.

Currently, there are different apps within this repository. Inside the offloading folder, there are two applications: **slamServer** and **staticServer`**.

The **staticServer** can run in two ways: fully local or by offloading to the slamServer (which solely processes SLAM).

[^1]: Requesting a server to perform resource-intensive processing tasks (e.g., performing heavy mathematical calculations).

## How to Set Up

[Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager)

Run `npm i` in both **offloading/slamServer** and **offloading/staticServer** folders.

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

## Como Configurar

[Instale o node e o npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (node package manager)

- Execute npm i em ambas as pastas offloading/slamServer e offloading/staticServer

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
