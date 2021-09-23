<h1 align="center">Acesso automático a parque estacionamento automóvel</h1>

<p  align="justify">Este projeto consiste na automatização do controlo de acesso a um parque de estacionamento automóvel, através da leitura e deteção automática de matrículas de veículos. Dois modos de acesso são implementados: 1) modo aberto - qualquer veículo pode aceder ao parque; 2) modo fechado - somente veículos pré-registados têm acesso. Os acessos são registados em base de dados PostgreSQL. A captura de imagens e execução de algoritmo de deteção de matrículas são efetuadas por um minicomputador Raspberry Pi. Por escalabilidade, a tarefa de deteção de matrículas pode ser transferida para computador com maior capacidade de processamento. O protocolo AMQP permite o envio fiável das matrículas para servidor que confirma/nega acesso ao parque. Toda a gestão do parque é feita através de website acessível ao administrador.
Neste repositório encontra-se todo o desenvolvimento da aplicação.</p>

### Arquitetura

<img src="https://github.com/jdro10/ESTG-PF-AcessoAutomaticoParqueAutomovel/blob/master/docs/software_architecture.png" width="600" height="600" />

### Estrutura do projeto

```
├── docs                         # Arquitetura de software
├── plate_detection              # Pasta que contém o programa de deteção de matrículas
│   ├── detection_algorithm
│   │   ├── alpr_exception.py    # OpenALPR exceção
│   │   ├── menu.py              # Menu do programa
│   │   ├── park_access.py       # Semáforo visual
│   │   ├── plate_detection.py   # Algoritmo deteção de matrículas
│   │   └── socket_stream.py     # Stream de imagens
│   └── openalpr_tests
│       └── openalpr_tests       # Teste biblioteca OpenALPR
├── server                       # Servidor
│   ├── bin
│   ├── config                   # Configuração da base de dados e autenticação
│   ├── controllers              # Controladores do projeto (utilizadores, base de dados, AMQP)
│   ├── routes                   # Endpoints da REST API
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
├── webapp                       # Webapp desenvolvida em Angular
    └── src
        └── app                  # Contém componentes, serviços e modelos do projeto
```

### Tecnologia

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white)
![OpenALPR](https://img.shields.io/badge/-OpenALPR-blue?style=for-the-badge)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/rabbitmq-%23FF6600.svg?&style=for-the-badge&logo=rabbitmq&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Pygame](https://img.shields.io/badge/-Pygame-lightgrey?style=for-the-badge&logo=python)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![RaspberryPi](https://img.shields.io/badge/RASPBERRY%20PI-C51A4A.svg?&style=for-the-badge&logo=raspberry%20pi&logoColor=white)

### Instalação (Linux)

Instalação do openalpr na máquina:

```sh
# Install prerequisites
sudo apt-get install libopencv-dev libtesseract-dev git cmake build-essential libleptonica-dev
sudo apt-get install liblog4cplus-dev libcurl3-dev

# If using the daemon, install beanstalkd
sudo apt-get install beanstalkd

# Clone the latest code from GitHub
git clone https://github.com/openalpr/openalpr.git

# Setup the build directory
cd openalpr/src
mkdir build
cd build

# setup the compile environment
cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc ..

# compile the library
make

# Install the binaries/libraries to your local system (prefix is /usr)
sudo make install

# Test the library
wget http://plates.openalpr.com/h786poj.jpg -O lp.jpg
alpr lp.jpg
```

Source: [OpenALPR](http://doc.openalpr.com/opensource.html#compiling-openalpr)

Instalar/reinstalar o [Tesseract](https://github.com/tesseract-ocr/tesseract):

```sh
sudo add-apt-repository ppa:alex-p/tesseract-ocr -y
sudo apt-get update -y

#Reinstall tesseract
sudo apt-get purge libtesseract-dev
sudo apt-get install libtesseract-dev
```

Integrar o OpenALPR:

```sh
# Aceder a pasta do openalpr
cd openalpr/src/bindings/python

# Executar
python setup.py install --user
```
Source: [Python binding](https://github.com/openalpr/openalpr/wiki/Integrating-OpenALPR)

Dependências Python:

```sh
# Instalação do OpenCV
pip install opencv-python

#Instalação do módulo pika para utilização do software RabbitMQ
pip install pika

#Instalação do Pygame
pip install Pygame

#Instalação do numpy em complemento ao OpenCV
pip install numpy
```

Dependências NodeJS:
```
npm install
```

### Desenvolvedor

* Jorge Oliveira - 8160579

### License
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/jdro10/ESTG-PF-AcessoAutomaticoParqueAutomovel/blob/master/LICENSE)
