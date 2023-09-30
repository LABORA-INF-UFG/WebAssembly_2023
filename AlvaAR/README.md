
<h1>AlvaAR</h1>

<p>AlvaAR é uma biblioteca de localização e mapeamento simultâneo (SLAM) baseada em realidade aumentada (AR) que usa visão computacional e aprendizado de máquina.

<h2>Como compilar AlvaAR para WebAssembly (WASM)</h2>

<p>WebAssembly (WASM) é um formato binário que pode ser executado em navegadores web. Para compilar a biblioteca AlvaAR para WASM, você precisa ter o Emscripten instalado no seu computador.

<p>Depois de instalar o Emscripten, siga os passos abaixo:</p>

<ol start=“1”> <li>Clone o repositório do AlvaAR acima (editado para fins de compilação) </li> </ol>

<ol start=“2”> <li>Abra o arquivo <code>build.sh</code> dentro da pasta <code>src/libs</code> e edite as variáveis <code>LIB_ROOT</code> e <code>EMSCRIPTEN_DIR</code> com os caminhos específicos do seu PC. Por exemplo:</li> </ol>

<pre><code>LIB_ROOT=/home/user/AlvaAR/src/libs </code></pre>
<pre><code>EMSCRIPTEN_DIR=/home/user/emsdk/upstream/emscripten </code></pre>
<ol start=“3”> <li>Execute o script <code>build.sh</code> na pasta <code>src/libs</code>. Isso vai compilar as dependências da biblioteca AlvaAR, como Ceres Solver, Eigen e OpenCV.</li> </ol>

<pre><code>cd src/libs</code></pre>
<pre><code>./build.sh </code></pre>
<ol start=“4”> <li>Após a compilação, será gerada uma pasta chamada <code>build_threads</code> em <code>src/libs</code>. Dentro dessa pasta, mude todas as ocorrências de <code>#include “glog/logging.h”</code> para <code>#include “ceres/internal/miniglog/glog/logging.h”</code>. OBS: Para fazer essa mudança mais rápida, abra a pasta <code>src/libs/build_threads</code> com o VSCode, digite Ctrl+Alt+F e mude todas as ocorrências.</li> <li>Agora abra o arquivo <code>CMakeLists.txt</code> em <code>src/slam</code> e edite a variável <code>CMAKE_TOOLCHAIN_FILE</code> com o caminho do Emscripten no seu PC. Por exemplo:</li> </ol>

<pre><code>set(CMAKE_TOOLCHAIN_FILE “/home/user/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake”) </code></pre>

<ol start=“6”> <li>Dentro da pasta <code>src/slam</code>, crie uma pasta chamada <code>build</code> e execute os seguintes comandos:</li> </ol>

<pre><code>cd build</code></pre>
<pre><code></code>emcmake cmake ..</pre>
<pre><code> emmake make install </code></pre>
<ol start=“7”> <li>O produto da compilação da biblioteca estará na pasta <code>AlvaAR/dist</code>.</li> </ol>

<h2>Como usar a biblioteca AlvaAR</h2>

<p>Para usar a biblioteca AlvaAR em seu projeto web, você precisa incluir os arquivos <code>.js</code> e <code>.wasm</code> gerados na pasta <code>AlvaAR/dist</code>. Você também precisa habilitar o suporte a threads e SIMD no seu navegador. Você pode ver um exemplo de como usar a biblioteca AlvaAR em um projeto web <a href=“https://github.com/alanross/AlvaAR”>aqui</a>.</p>

<h2>Referências</h2>
<p>AlvaAR - https://github.com/alanross/AlvaAR</p>
